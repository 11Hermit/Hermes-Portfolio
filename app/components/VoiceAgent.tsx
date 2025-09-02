"use client"

import type { JSX } from "react"
import { useState, useRef, useEffect, useCallback, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Volume2, MessageCircle, X, Send, Type, Play, Mail, MessageSquare } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface VoiceAgentProps {
  className?: string
}

type VoiceState = "idle" | "listening" | "processing" | "speaking" | "error" | "text-mode" | "continuous-listening"

interface VoiceMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  audioUrl?: string
}



export default function VoiceAgent({ className = "" }: VoiceAgentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [voiceState, setVoiceState] = useState<VoiceState>("idle")
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")
  const [audioLevel, setAudioLevel] = useState(0)
  const [isTextMode, setIsTextMode] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [isProcessingText, setIsProcessingText] = useState(false)
  const [conversation, setConversation] = useState<VoiceMessage[]>([])
  const [isContinuousMode, setIsContinuousMode] = useState(false)
  const [voiceServiceAvailable, setVoiceServiceAvailable] = useState(true)
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false)
  const [showAttentionMessage, setShowAttentionMessage] = useState(true)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const silenceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const streamRef = useRef<MediaStream | null>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  // Hide attention message after 10 seconds or when user interacts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAttentionMessage(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  // Initialize audio context for visualization
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current = null
      }
    }
  }, [])

  // Play intro message when voice agent is first opened
  useEffect(() => {
    if (isOpen && !hasPlayedIntro && voiceServiceAvailable && !isTextMode) {
      // Small delay to ensure the panel is fully rendered
      const timer = setTimeout(() => {
        playIntroMessage()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, hasPlayedIntro, voiceServiceAvailable, isTextMode])

  // Helper function to build conversation history for API
  const buildConversationHistory = useCallback(() => {
    return conversation.map((msg) => ({
      role: msg.type === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))
  }, [conversation])

  const playIntroMessage = async () => {
    try {
      console.log("Playing intro message...")
      setHasPlayedIntro(true)

      // Add intro message to conversation
      const introMessage: VoiceMessage = {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Hi! I'm Hermes, Ashtone's AI assistant. Great to meet you! 😊\n\nAre you a recruiter, potential client, or maybe a fellow developer? I'd love to help you learn about Ashtone's work in the best way for your needs!",
        timestamp: new Date(),
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/intro-rkuo3lyEHCKRhyqeCYtEAfRECIAsiH.mp3",
      }

      setConversation([introMessage])
      setResponse(introMessage.content)

      // Play intro audio automatically
      await playAudio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/intro-rkuo3lyEHCKRhyqeCYtEAfRECIAsiH.mp3")
    } catch (error) {
      console.error("Failed to play intro message:", error)
      // If audio fails, still show the message but continue in idle state
      setVoiceState("idle")
    }
  }

  const playFallbackMessage = async () => {
    try {
      console.log("Playing fallback message...")

      // Add fallback message to conversation
      const fallbackMessage: VoiceMessage = {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Hey there! Having some voice issues right now, but I'm still here to help! 🎤\n\nJust switch to text mode and we can keep chatting. What brings you to Ashtone's portfolio today?",
        timestamp: new Date(),
        audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fallback-u4OYyRSBSadhWeIluT5IHO1iI0smSj.mp3",
      }

      setConversation((prev) => [...prev, fallbackMessage])
      setResponse(fallbackMessage.content)

      // Play fallback audio automatically
      await playAudio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fallback-u4OYyRSBSadhWeIluT5IHO1iI0smSj.mp3")
    } catch (error) {
      console.error("Failed to play fallback message:", error)
      // If audio fails, continue in text mode
      setVoiceState("text-mode")
    }
  }

  const playAudio = async (audioUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        // Stop any currently playing audio
        if (currentAudioRef.current) {
          currentAudioRef.current.pause()
          currentAudioRef.current = null
        }

        setVoiceState("speaking")
        const audio = new Audio(audioUrl)
        currentAudioRef.current = audio

        audio.onended = () => {
          console.log("Audio playback completed")
          setVoiceState(isContinuousMode ? "continuous-listening" : "idle")
          currentAudioRef.current = null
          resolve()
        }

        audio.onerror = (audioError) => {
          console.error("Audio playback error:", audioError)
          setVoiceState(isContinuousMode ? "continuous-listening" : "idle")
          currentAudioRef.current = null
          reject(audioError)
        }

        audio.play().catch(reject)
      } catch (error) {
        console.error("Failed to create audio element:", error)
        setVoiceState(isContinuousMode ? "continuous-listening" : "idle")
        reject(error)
      }
    })
  }

  // Audio level visualization
  const updateAudioLevel = useCallback(() => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length
      const normalizedLevel = average / 255
      setAudioLevel(normalizedLevel)

      // Voice Activity Detection (simple threshold-based)
      if (isContinuousMode && normalizedLevel > 0.1) {
        // Reset silence timeout when speech is detected
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
        }

        // Start recording if not already recording
        if (!isRecording && voiceState === "continuous-listening") {
          startRecordingChunk()
        }
      } else if (isContinuousMode && isRecording && normalizedLevel < 0.05) {
        // Start silence timeout
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current)
        }
        silenceTimeoutRef.current = setTimeout(() => {
          if (isRecording) {
            stopRecordingChunk()
          }
        }, 2000) // 2 seconds of silence
      }
    }

    if (isRecording || isContinuousMode) {
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
    }
  }, [isRecording, isContinuousMode, voiceState])

  const startContinuousListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      streamRef.current = stream

      // Set up audio context for visualization and VAD
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      setIsContinuousMode(true)
      setVoiceState("continuous-listening")
      updateAudioLevel()
      setError("")
    } catch (err) {
      console.error("Microphone access error:", err)
      setError("Microphone access denied")
      setVoiceState("error")
    }
  }

  const stopContinuousListening = () => {
    setIsContinuousMode(false)
    if (isRecording) {
      stopRecordingChunk()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current)
    }
    setVoiceState("idle")
  }

  const startRecordingChunk = () => {
    if (!streamRef.current || isRecording) return

    try {
      mediaRecorderRef.current = new MediaRecorder(streamRef.current, {
        mimeType: "audio/webm;codecs=opus",
      })
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = async () => {
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
          await processAudio(audioBlob)
        }
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error("Recording start error:", err)
      setError("Failed to start recording")
    }
  }

  const stopRecordingChunk = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const startSingleRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Set up audio context for visualization
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        await processAudio(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setVoiceState("listening")
      updateAudioLevel()
      setError("")
    } catch (err) {
      console.error("Microphone access error:", err)
      setError("Microphone access denied")
      setVoiceState("error")
    }
  }

  const stopSingleRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setVoiceState("processing")
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }

  const processAudio = async (audioBlob: Blob) => {
    try {
      setVoiceState("processing")
      setError("")

      console.log("Processing audio blob:", {
        size: audioBlob.size,
        type: audioBlob.type,
      })

      if (audioBlob.size === 0) {
        throw new Error("Empty audio recording")
      }

      const formData = new FormData()
      formData.append("audio", audioBlob, "recording.wav")

      // Add conversation history for context
      const history = buildConversationHistory()
      if (history.length > 0) {
        formData.append("history", JSON.stringify(history))
      }

      console.log("Sending audio to server...")

      const response = await fetch("/api/voice-chat", {
        method: "POST",
        body: formData,
      })

      console.log("Server response status:", response.status)
      console.log("Server response headers:", Object.fromEntries(response.headers.entries()))

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text()
        console.error("Non-JSON response received:", textResponse.substring(0, 200))
        throw new Error(`Server returned non-JSON response. Status: ${response.status}`)
      }

      let data
      try {
        data = await response.json()
        console.log("Parsed response data:", data)
      } catch (jsonError) {
        console.error("Failed to parse response as JSON:", jsonError)
        throw new Error(`Invalid JSON response from server`)
      }

      // Handle voice service fallback response
      if (data.isVoiceFallback || data.errorType === "voice_service_unavailable") {
        console.log("Voice service fallback detected, switching to text mode")
        setVoiceServiceAvailable(false)
        setIsTextMode(true)
        setVoiceState("text-mode")
        setError("Voice service temporarily unavailable. Switched to text mode.")

        // Play fallback message automatically
        await playFallbackMessage()

        // Stop continuous listening if active
        if (isContinuousMode) {
          stopContinuousListening()
        }
        return
      }

      if (!response.ok) {
        console.error("Server error response:", data)
        throw new Error(data.error || `Server error: ${response.status}`)
      }

      const userMessage: VoiceMessage = {
        id: Date.now().toString(),
        type: "user",
        content: data.transcript || "No transcript available",
        timestamp: new Date(),
      }

      const assistantMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.response || "No response generated",
        timestamp: new Date(),
        audioUrl: data.audioUrl,
      }

      setConversation((prev) => [...prev, userMessage, assistantMessage])
      setTranscript(data.transcript || "")
      setResponse(data.response || "")

      // Play the AI response if audio is available
      if (data.audioUrl) {
        try {
          await playAudio(data.audioUrl)
        } catch (audioError) {
          console.error("Failed to play audio:", audioError)
          setVoiceState(isContinuousMode ? "continuous-listening" : "idle")
        }
      } else {
        console.log("No audio URL provided, skipping audio playback")
        setVoiceState(isContinuousMode ? "continuous-listening" : "idle")
      }
    } catch (err) {
      console.error("Voice processing error:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to process your request"

      // Switch to text mode for any voice processing error and play fallback
      console.log("Voice processing error, switching to text mode and playing fallback")
      setVoiceServiceAvailable(false)
      setIsTextMode(true)
      setVoiceState("text-mode")
      setError("Voice service temporarily unavailable. Switched to text mode.")

      // Play fallback message automatically
      await playFallbackMessage()

      // Stop continuous listening if active
      if (isContinuousMode) {
        stopContinuousListening()
      }
    }
  }

  const processTextMessage = async (message: string) => {
    try {
      setIsProcessingText(true)
      setError("")

      console.log("Processing text message:", message.substring(0, 100))

      // Build conversation history for context
      const history = buildConversationHistory()

      const response = await fetch("/api/text-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: history.length > 0 ? history : undefined,
        }),
      })

      console.log("Text chat response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process message")
      }

      const data = await response.json()
      console.log("Text chat response data:", data)

      const userMessage: VoiceMessage = {
        id: Date.now().toString(),
        type: "user",
        content: message,
        timestamp: new Date(),
      }

      const assistantMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setConversation((prev) => [...prev, userMessage, assistantMessage])
      setTranscript(message)
      setResponse(data.response)
      setTextInput("")
    } catch (err) {
      console.error("Text processing error:", err)
      setError(err instanceof Error ? err.message : "Failed to process your message")
    } finally {
      setIsProcessingText(false)
    }
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (textInput.trim() && !isProcessingText) {
      processTextMessage(textInput.trim())
    }
  }

  const toggleVoiceAgent = () => {
    setIsOpen(!isOpen)
    setShowAttentionMessage(false) // Hide attention message when user interacts
    if (isRecording) {
      stopSingleRecording()
    }
    if (isContinuousMode) {
      stopContinuousListening()
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }
  }

  const handleVoiceAction = () => {
    if (isTextMode) {
      return // Do nothing in text mode
    }

    if (isContinuousMode) {
      stopContinuousListening()
    } else if (isRecording) {
      stopSingleRecording()
    } else if (voiceState === "idle" || voiceState === "error") {
      startSingleRecording()
    }
  }

  const handleContinuousToggle = () => {
    if (isTextMode || !voiceServiceAvailable) {
      return
    }

    if (isContinuousMode) {
      stopContinuousListening()
    } else {
      startContinuousListening()
    }
  }

  const clearConversation = () => {
    setConversation([])
    setTranscript("")
    setResponse("")
    setError("")
    setTextInput("")
    setVoiceState("idle")
    setHasPlayedIntro(false)
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }
  }

  const switchToTextMode = () => {
    setIsTextMode(true)
    setVoiceState("text-mode")
    setError("")
    if (isRecording) {
      stopSingleRecording()
    }
    if (isContinuousMode) {
      stopContinuousListening()
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }
  }

  const switchToVoiceMode = () => {
    if (!voiceServiceAvailable) {
      setError("Voice service is currently unavailable due to API limitations.")
      return
    }
    setIsTextMode(false)
    setVoiceState("idle")
    setError("")
  }

  const replayAudio = async (audioUrl: string) => {
    try {
      await playAudio(audioUrl)
    } catch (error) {
      console.error("Failed to replay audio:", error)
    }
  }

  // Helper function to handle email click
  const handleEmailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.location.href = "mailto:ashtone@wanailabs.org"
  }

  // Helper function to handle WhatsApp click
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.open("https://wa.me/qr/YUF73YQORYWJN1", "_blank", "noopener,noreferrer")
  }

  // Custom component to render contact buttons
  const ContactButtons = ({ content }: { content: string }): React.ReactElement | null => {
    const hasEmail = content.includes("ashtone@wanailabs.org")
    const hasWhatsApp = content.includes("https://wa.me/qr/YUF73YQORYWJN1")

    if (!hasEmail && !hasWhatsApp) return null

    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {hasEmail && (
          <motion.button
            type="button"
            onClick={handleEmailClick}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-4 h-4" />
            Email Ashtone
          </motion.button>
        )}
        {hasWhatsApp && (
          <motion.button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageSquare className="w-4 h-4" />
            Chat on WhatsApp
          </motion.button>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className={`fixed z-40 ${
          isOpen ? "bottom-4 right-4 sm:bottom-6 sm:right-6" : "bottom-4 right-4 sm:bottom-6 sm:right-6"
        } ${className}`}
        initial={false}
        animate={{
          scale: isOpen ? 0 : 1,
          opacity: isOpen ? 0 : 1,
          y: isOpen ? 20 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.button
          onClick={toggleVoiceAgent}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
            voiceState === "listening"
              ? "bg-red-500 hover:bg-red-600"
              : voiceState === "speaking"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Voice Agent"
        >
          {voiceState === "listening" ? (
            <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : voiceState === "speaking" ? (
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </motion.button>
      </motion.div>

      {/* Voice Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 max-w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 z-40"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    {isTextMode ? (
                      <Type className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <MessageCircle className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">Hermes</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {isTextMode ? "Text Mode" : isContinuousMode ? "Continuous Voice" : "Voice Mode"} • Ashtone's AI Assistant
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={isTextMode ? switchToVoiceMode : switchToTextMode}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs"
                    title={isTextMode ? "Switch to voice mode" : "Switch to text mode"}
                    disabled={!voiceServiceAvailable && !isTextMode}
                  >
                    {isTextMode ? <Mic className="w-4 h-4" /> : <Type className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleVoiceAgent}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {conversation.length === 0 && !error && (
                <div className="text-center py-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                    {isTextMode ? (
                      <Type className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Mic className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Hi! I'm Hermes, Ashtone's AI assistant.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {isTextMode
                      ? "Type your message below to ask me anything about Ashtone's work!"
                      : "Use voice or continuous mode to ask me anything about Ashtone's work, experience, or projects!"}
                  </p>
                </div>
              )}

              {conversation.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.type === "user" ? "bg-blue-50 dark:bg-blue-900/20" : "bg-purple-50 dark:bg-purple-900/20"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`text-sm flex-1 ${
                        message.type === "user"
                          ? "text-blue-800 dark:text-blue-200"
                          : "text-purple-800 dark:text-purple-200"
                      }`}
                    >
                      {message.type === "assistant" ? (
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-purple">
                          <ReactMarkdown
                            components={{
                              p: ({ children }: { children?: ReactNode }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              ul: ({ children }: { children?: ReactNode }) => (
                                <ul className="mb-2 pl-4">{children}</ul>
                              ),
                              li: ({ children }: { children?: ReactNode }) => (
                                <li className="mb-1">{children}</li>
                              ),
                              strong: ({ children }: { children?: ReactNode }) => (
                                <strong className="font-semibold">{children}</strong>
                              ),
                              a: ({
                                node,
                                href = '#',
                                children,
                                ...props
                              }: {
                                node?: any;
                                href?: string;
                                children?: ReactNode;
                                [key: string]: any;
                              }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 underline"
                                  {...props}
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                          <ContactButtons content={message.content} />
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                    {message.audioUrl && message.type === "assistant" && (
                      <button
                        onClick={() => replayAudio(message.audioUrl!)}
                        className="ml-2 p-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                        title="Replay audio"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {error && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Notice:</strong> {error}
                  </p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-3 sm:p-4 border-t border-gray-200/50 dark:border-gray-700/50">
              {isTextMode ? (
                <form onSubmit={handleTextSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    disabled={isProcessingText}
                  />
                  <motion.button
                    type="submit"
                    disabled={!textInput.trim() || isProcessingText}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isProcessingText ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </motion.button>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <motion.button
                      onClick={handleVoiceAction}
                      disabled={voiceState === "processing" || voiceState === "speaking" || !voiceServiceAvailable}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isRecording ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-white mr-1.5 animate-pulse" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" />
                          {voiceState === "processing"
                            ? "Processing..."
                            : voiceState === "speaking"
                              ? "Speaking..."
                              : "Talk to Hermes"}
                        </>
                      )}
                    </motion.button>

                    {/* Continuous Mode Toggle */}
                    <motion.button
                      onClick={handleContinuousToggle}
                      disabled={!voiceServiceAvailable}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                        isContinuousMode
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isContinuousMode ? "Stop Continuous" : "Continuous Mode"}
                    </motion.button>
                  </div>

                  {/* Continuous Mode Info */}
                  {isContinuousMode && (
                    <div className="text-center">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        🎤 Listening continuously - speak naturally, I'll respond when you pause
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
