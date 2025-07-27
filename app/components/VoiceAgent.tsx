"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
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
  const animationFrameRef = useRef<number>()
  const silenceTimeoutRef = useRef<NodeJS.Timeout>()
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
  const handleEmailClick = () => {
    window.location.href = "mailto:ashtoneonyango@gmail.com"
  }

  // Helper function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/qr/YUF73YQORYWJN1", "_blank", "noopener,noreferrer")
  }

  // Custom component to render contact buttons
  const ContactButtons = ({ content }: { content: string }) => {
    const hasEmail = content.includes("ashtoneonyango@gmail.com")
    const hasWhatsApp = content.includes("https://wa.me/qr/YUF73YQORYWJN1")

    if (!hasEmail && !hasWhatsApp) {
      return null
    }

    return (
      <div className="mt-3 flex flex-col gap-2">
        {hasEmail && (
          <motion.button
            onClick={handleEmailClick}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-4 h-4" />
            Send Email
          </motion.button>
        )}
        {hasWhatsApp && (
          <motion.button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
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
      {/* Floating Voice Button */}
      <motion.div
        className={`fixed bottom-8 right-8 z-50 ${className}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Animated Attention Message */}
        <AnimatePresence>
          {showAttentionMessage && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-2 -left-2 pointer-events-none"
            >
              {/* Curved text path around the button */}
              <svg width="120" height="120" className="absolute inset-0">
                <defs>
                  <path id="circle-path" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
                </defs>
                <motion.text
                  fontSize="11"
                  fontWeight="600"
                  className="fill-purple-600 dark:fill-purple-400"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <textPath href="#circle-path" startOffset="0%">
                    <motion.tspan
                      animate={{
                        startOffset: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      I'm Hermes, talk to me! 💬 ✨
                    </motion.tspan>
                  </textPath>
                </motion.text>
              </svg>

              {/* Pulsing background glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-md"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Dancing sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  style={{
                    left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 6)}px`,
                    top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}px`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleVoiceAgent}
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={
            showAttentionMessage && !isOpen
              ? {
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }
              : {}
          }
          transition={
            showAttentionMessage && !isOpen
              ? {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
              : {}
          }
        >
          {/* Animated Voice Orb */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Central orb with gradient */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500"
              animate={{
                background:
                  voiceState === "listening" || voiceState === "continuous-listening"
                    ? [
                        "linear-gradient(45deg, #8B5CF6, #EC4899, #3B82F6)",
                        "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)",
                        "linear-gradient(45deg, #EC4899, #3B82F6, #8B5CF6)",
                      ]
                    : ["linear-gradient(45deg, #8B5CF6, #EC4899, #3B82F6)"],
              }}
              transition={{
                duration: voiceState === "listening" || voiceState === "continuous-listening" ? 1 : 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {/* Inner pulsing effect */}
              <motion.div
                className="absolute inset-1 rounded-full bg-white/10 backdrop-blur-sm"
                animate={{
                  scale:
                    voiceState === "listening" || voiceState === "continuous-listening" ? [1, 1.1, 1] : [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: voiceState === "listening" || voiceState === "continuous-listening" ? 0.5 : 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Audio level visualization */}
              {(voiceState === "listening" || voiceState === "continuous-listening") && (
                <motion.div
                  className="absolute inset-2 rounded-full bg-white/20"
                  animate={{
                    scale: 1 + audioLevel * 0.3,
                    opacity: 0.4 + audioLevel * 0.4,
                  }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </motion.div>

            {/* State indicator icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {(voiceState === "listening" || voiceState === "continuous-listening") && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Mic className="w-6 h-6 text-white" />
                </motion.div>
              )}
              {voiceState === "processing" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              )}
              {voiceState === "speaking" && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Volume2 className="w-6 h-6 text-white" />
                </motion.div>
              )}
              {(voiceState === "idle" || voiceState === "text-mode") && (
                <MessageCircle className="w-6 h-6 text-white" />
              )}
              {voiceState === "error" && <MicOff className="w-6 h-6 text-white" />}
            </div>
          </div>

          {/* Pulse effect for idle state */}
          {(voiceState === "idle" || voiceState === "text-mode") && (
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-400/20"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Voice Chat Panel - Moved further left to avoid section indicators */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-24 w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 z-40"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  {isTextMode ? (
                    <Type className="w-4 h-4 text-white" />
                  ) : (
                    <MessageCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Hermes</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {isTextMode ? "Text Mode" : isContinuousMode ? "Continuous Voice" : "Voice Mode"} • Ashtone's AI
                    Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Mode Toggle */}
                <button
                  onClick={isTextMode ? switchToVoiceMode : switchToTextMode}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs"
                  title={isTextMode ? "Switch to voice mode" : "Switch to text mode"}
                  disabled={!voiceServiceAvailable && !isTextMode}
                >
                  {isTextMode ? <Mic className="w-4 h-4" /> : <Type className="w-4 h-4" />}
                </button>
                {conversation.length > 0 && (
                  <button
                    onClick={clearConversation}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs"
                    title="Clear conversation"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={toggleVoiceAgent}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
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

              {/* Conversation History */}
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
                        <div>
                          <ReactMarkdown
                            className="prose prose-sm max-w-none dark:prose-invert prose-purple"
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }) => <ul className="mb-2 pl-4">{children}</ul>,
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 underline"
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
            <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
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
                  {/* Voice Controls */}
                  <div className="flex items-center justify-center gap-3">
                    <motion.button
                      onClick={handleVoiceAction}
                      disabled={voiceState === "processing" || voiceState === "speaking" || !voiceServiceAvailable}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="w-4 h-4" />
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
