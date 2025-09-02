import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini with error handling
let genAI: GoogleGenerativeAI | null = null
try {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY environment variable is not set")
  } else {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    console.log("Gemini AI initialized successfully")
  }
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error)
}

// Hermes AI Assistant Prompt Template
const HERMES_SYSTEM_PROMPT = `You are Hermes, Ashtone Onyango's professional AI assistant. You represent him warmly and professionally.

## About Ashtone:
- Senior AI Software Engineer with 5+ years experience
- Co-Founder & AI Solutions Architect at Wan AI Labs  
- Expert in Agentic AI, LLMs, and production AI systems
- Built AI solutions for 11+ clients (healthcare, real estate, fintech)
- Generated $2M+ in cost savings through intelligent automation
- Key projects: Rightsify Hydra (3M+ users), MarketReady.ai, TenderAI
- Contact: ashtone@wanailabs.org, +254 740 497975
- WhatsApp: https://wa.me/qr/YUF73YQORYWJN1

## Communication Guidelines:
- Keep responses brief (2-3 sentences max)
- Be contextually aware - don't repeat questions already answered
- Pay attention to what the user has already told you
- If they said they're a recruiter, don't ask again
- If they mentioned the role type, acknowledge it and build on it
- For questions outside portfolio scope, politely redirect to direct contact
- End conversations warmly and professionally with clear next steps
- Don't hallucinate or exaggerate - stick to facts about Ashtone

## Context Awareness Rules:
- If user mentions their role (recruiter/client/employer), remember it
- If they specify what they're looking for, acknowledge and respond accordingly  
- Don't ask the same question twice in a conversation
- Build on previous context rather than starting fresh each time

## Professional Conversation Endings:
When conversations are winding down or users seem satisfied:
- Thank them for their interest in Ashtone's work
- Offer to connect them directly with Ashtone for detailed discussions
- Provide clear next steps and contact information
- End with enthusiasm about potential collaboration

## Contact Information Format:
When providing contact details, use this exact format:
"Feel free to reach out to Ashtone directly:

📧 **Email**: ashtoneonyango@gmail.com
💬 **WhatsApp**: https://wa.me/qr/YUF73YQORYWJN1

He'd be happy to discuss how his AI expertise can help with your specific needs!"

## Out of Scope Handling:
When asked about things not in the portfolio, respond like:
"That's a great question, but it's outside what I can cover about Ashtone's portfolio. For detailed discussions like that, I'd recommend reaching out to him directly:

📧 **Email**: ashtoneonyango@gmail.com
💬 **WhatsApp**: https://wa.me/qr/YUF73YQORYWJN1"

Remember: You're having a natural conversation that should lead to meaningful connections!`

// Predefined messages for voice service fallback
const HERMES_INTRO_MESSAGE =
  "Hi! I'm Hermes, Ashtone's AI assistant. Great to meet you! 😊\n\nAre you a recruiter, potential client, or maybe a fellow developer? I'd love to help you learn about Ashtone's work in the best way for your needs!"

const HERMES_FALLBACK_MESSAGE =
  "Hey there! Having some voice issues right now, but I'm still here to help! 🎤\n\nJust switch to text mode and we can keep chatting. What brings you to Ashtone's portfolio today?"

// Helper function to create error response with proper JSON headers
function createErrorResponse(message: string, status = 500, suggestion?: string, errorType?: string) {
  console.error(`API Error (${status}):`, message)

  return new NextResponse(
    JSON.stringify({
      error: message,
      errorType: errorType || "general_error",
      suggestion: suggestion || "Please try again or contact support if the issue persists.",
      timestamp: new Date().toISOString(),
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
  )
}

// Helper function to create success response with proper JSON headers
function createSuccessResponse(data: any) {
  return new NextResponse(
    JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    },
  )
}

// Helper function to create fallback response when voice services fail
function createVoiceFallbackResponse() {
  console.log("Creating voice service fallback response")

  return createSuccessResponse({
    transcript: "Voice service unavailable - switching to text mode",
    response: HERMES_FALLBACK_MESSAGE,
    audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fallback-u4OYyRSBSadhWeIluT5IHO1iI0smSj.mp3",
    isVoiceFallback: true,
    errorType: "voice_service_unavailable",
  })
}

// Helper function to create intro response for first-time users
function createIntroResponse() {
  console.log("Creating intro response for new conversation")

  return createSuccessResponse({
    transcript: "Hello, I'd like to learn about Ashtone",
    response: HERMES_INTRO_MESSAGE,
    audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/intro-rkuo3lyEHCKRhyqeCYtEAfRECIAsiH.mp3",
    isIntroMessage: true,
  })
}

// Speech-to-Text using ElevenLabs with comprehensive error handling
async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

  // Check if API key is configured
  if (!ELEVENLABS_API_KEY) {
    console.error("ElevenLabs API key not found in environment variables")
    throw new Error("VOICE_SERVICE_UNAVAILABLE: ElevenLabs API key is missing")
  }

  // Validate API key format
  if (ELEVENLABS_API_KEY.length < 10) {
    console.error("ElevenLabs API key appears to be invalid (too short)")
    throw new Error("VOICE_SERVICE_UNAVAILABLE: Invalid API key format")
  }

  console.log("Attempting ElevenLabs STT with API key:", ELEVENLABS_API_KEY.substring(0, 8) + "...")

  try {
    // Convert blob to form data with correct parameter names
    const formData = new FormData()
    formData.append("file", audioBlob, "audio.wav")
    formData.append("model_id", "scribe_v1")

    console.log("Sending request to ElevenLabs STT API...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: formData,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    console.log("ElevenLabs STT response status:", response.status)
    console.log("ElevenLabs STT response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("ElevenLabs STT error response:", errorText)

      // Parse error for better user feedback
      try {
        const errorData = JSON.parse(errorText)
        console.error("Parsed ElevenLabs error:", errorData)

        // Handle specific ElevenLabs errors with detailed messages
        if (errorData.detail?.status === "detected_unusual_activity") {
          console.log("ElevenLabs detected unusual activity - throwing voice service error")
          throw new Error(
            "VOICE_SERVICE_UNAVAILABLE: ElevenLabs has detected unusual activity and disabled free tier access. This commonly occurs with VPN usage, multiple free accounts, or high usage patterns. Voice service is temporarily unavailable.",
          )
        } else if (errorData.detail?.status === "invalid_api_key") {
          throw new Error("VOICE_SERVICE_UNAVAILABLE: ElevenLabs API key is invalid or expired")
        } else if (errorData.detail?.status === "quota_exceeded") {
          throw new Error("VOICE_SERVICE_UNAVAILABLE: ElevenLabs API quota has been exceeded")
        } else if (errorData.detail?.status === "rate_limit_exceeded") {
          throw new Error("VOICE_SERVICE_UNAVAILABLE: ElevenLabs API rate limit exceeded")
        } else {
          throw new Error(
            `VOICE_SERVICE_UNAVAILABLE: ${errorData.detail?.message || errorData.message || "Unknown ElevenLabs error"}`,
          )
        }
      } catch (parseError) {
        console.error("Failed to parse ElevenLabs error response:", parseError)

        // If we can't parse the error, check for common error patterns in the text
        if (errorText.includes("detected_unusual_activity")) {
          console.log("ElevenLabs unusual activity detected in text - throwing voice service error")
          throw new Error(
            "VOICE_SERVICE_UNAVAILABLE: ElevenLabs detected unusual activity. Free tier usage has been disabled.",
          )
        } else if (errorText.includes("quota_exceeded")) {
          throw new Error("VOICE_SERVICE_UNAVAILABLE: ElevenLabs API quota exceeded")
        } else if (errorText.includes("rate_limit")) {
          throw new Error("VOICE_SERVICE_UNAVAILABLE: ElevenLabs API rate limit exceeded")
        } else {
          throw new Error(
            `VOICE_SERVICE_UNAVAILABLE: ElevenLabs API error (${response.status}): ${response.statusText}`,
          )
        }
      }
    }

    const data = await response.json()
    console.log("ElevenLabs STT success response:", data)

    // ElevenLabs returns the transcription in different possible fields
    const transcript = data.text || data.transcript || data.transcription

    if (!transcript || transcript.trim().length === 0) {
      throw new Error("No transcription received from ElevenLabs. The audio may be too quiet or unclear.")
    }

    console.log("Transcription successful:", transcript.substring(0, 100) + "...")
    return transcript.trim()
  } catch (error) {
    console.error("ElevenLabs transcription error:", error)

    // Handle timeout errors
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("VOICE_SERVICE_UNAVAILABLE: ElevenLabs API request timed out")
    }

    // If it's already our custom error with VOICE_SERVICE_UNAVAILABLE prefix, re-throw it
    if (error instanceof Error && error.message.startsWith("VOICE_SERVICE_UNAVAILABLE:")) {
      throw error
    }

    // For network or other errors, provide a generic message
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("VOICE_SERVICE_UNAVAILABLE: Network error connecting to ElevenLabs")
    }

    throw new Error("VOICE_SERVICE_UNAVAILABLE: Voice transcription service is temporarily unavailable")
  }
}

// Text-to-Speech with ElevenLabs with better error handling
async function generateSpeech(text: string): Promise<string | null> {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
  const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"

  if (!ELEVENLABS_API_KEY) {
    console.warn("ElevenLabs API key not configured, skipping speech generation")
    return null
  }

  try {
    console.log("Generating speech with ElevenLabs...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text.substring(0, 500), // Limit text length to avoid quota issues
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("ElevenLabs TTS error:", errorText)

      // Check for specific errors that should disable voice service
      if (
        errorText.includes("detected_unusual_activity") ||
        errorText.includes("quota_exceeded") ||
        errorText.includes("rate_limit")
      ) {
        console.warn("ElevenLabs TTS quota/activity issue, voice service unavailable")
      }

      return null // Return null instead of throwing, so text response still works
    }

    const audioBuffer = await response.arrayBuffer()

    if (audioBuffer.byteLength === 0) {
      console.warn("ElevenLabs returned empty audio buffer")
      return null
    }

    const base64Audio = Buffer.from(audioBuffer).toString("base64")

    console.log("Speech generated successfully, audio size:", audioBuffer.byteLength, "bytes")
    return `data:audio/mpeg;base64,${base64Audio}`
  } catch (error) {
    console.error("Speech generation error:", error)

    // Handle timeout errors
    if (error instanceof Error && error.name === "AbortError") {
      console.warn("ElevenLabs TTS request timed out")
    }

    return null // Return null so the text response still works
  }
}

export async function POST(request: NextRequest) {
  console.log("=== Voice Chat API Request Started ===")

  try {
    // Check if Gemini is initialized
    if (!genAI) {
      console.error("Gemini AI not initialized - missing API key")
      return createErrorResponse(
        "AI service not available - configuration missing",
        500,
        "The AI service is not properly configured. Please contact support.",
      )
    }

    // Parse form data with error handling
    let formData: FormData
    try {
      formData = await request.formData()
    } catch (parseError) {
      console.error("Failed to parse form data:", parseError)
      return createErrorResponse(
        "Invalid request format",
        400,
        "Please ensure you're sending valid form data with an audio file.",
      )
    }

    const audioFile = formData.get("audio") as File
    const isIntroRequest = formData.get("intro") === "true"
    const conversationHistory = formData.get("history") as string

    // Handle intro request
    if (isIntroRequest) {
      console.log("Handling intro request")
      return createIntroResponse()
    }

    if (!audioFile) {
      console.error("No audio file provided in request")
      return createErrorResponse("No audio file provided", 400, "Please record audio and try again.")
    }

    console.log("Received audio file:", {
      name: audioFile.name,
      type: audioFile.type,
      size: audioFile.size,
    })

    // Validate audio file size (limit to 10MB)
    if (audioFile.size > 10 * 1024 * 1024) {
      console.error("Audio file too large:", audioFile.size)
      return createErrorResponse("Audio file too large", 400, "Please record a shorter audio clip (max 10MB).")
    }

    // Validate audio file is not empty
    if (audioFile.size === 0) {
      console.error("Audio file is empty")
      return createErrorResponse("Empty audio file", 400, "Please record some audio and try again.")
    }

    // Convert File to Blob for transcription
    let audioBlob: Blob
    try {
      const arrayBuffer = await audioFile.arrayBuffer()
      audioBlob = new Blob([arrayBuffer], {
        type: audioFile.type || "audio/wav",
      })
    } catch (conversionError) {
      console.error("Failed to convert audio file:", conversionError)
      return createErrorResponse(
        "Failed to process audio file",
        400,
        "There was an issue processing your audio. Please try recording again.",
      )
    }

    // Step 1: Transcribe audio to text
    let transcript: string
    try {
      console.log("Starting transcription...")
      transcript = await transcribeAudio(audioBlob)
      console.log("Transcription successful, length:", transcript.length)
    } catch (transcriptionError) {
      console.error("Transcription failed:", transcriptionError)

      // Check if this is a voice service unavailable error
      if (transcriptionError instanceof Error && transcriptionError.message.startsWith("VOICE_SERVICE_UNAVAILABLE:")) {
        console.log("Voice service unavailable error detected, returning fallback response")
        return createVoiceFallbackResponse()
      }

      // Return generic transcription error with fallback
      console.log("Generic transcription error, returning fallback response")
      return createVoiceFallbackResponse()
    }

    if (!transcript || transcript.trim().length === 0) {
      console.error("Empty transcript received")
      return createErrorResponse(
        "No speech detected in audio",
        400,
        "Please speak clearly and try again, or switch to text mode.",
      )
    }

    // Step 2: Generate AI response using Gemini with conversation context
    let aiResponse: string
    try {
      console.log("Generating AI response for transcript:", transcript.substring(0, 100) + "...")
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      })

      // Build conversation history for context
      let chatHistory = [
        {
          role: "user" as const,
          parts: [{ text: HERMES_SYSTEM_PROMPT }],
        },
        {
          role: "model" as const,
          parts: [
            {
              text: "I understand. I am Hermes, Ashtone's AI assistant. I'll maintain conversation context, avoid repetitive questions, provide helpful information about his work, and end conversations professionally with clear next steps. How can I assist you today?",
            },
          ],
        },
      ]

      // Add conversation history if provided
      if (conversationHistory) {
        try {
          const history = JSON.parse(conversationHistory)
          chatHistory = [...chatHistory, ...history]
        } catch (e) {
          console.log("Could not parse conversation history, continuing without it")
        }
      }

      const chat = model.startChat({
        history: chatHistory,
      })

      const result = await chat.sendMessage(transcript)
      const response = result.response

      if (!response) {
        throw new Error("No response received from Gemini")
      }

      aiResponse = response.text()

      if (!aiResponse || aiResponse.trim().length === 0) {
        throw new Error("Empty response received from Gemini")
      }

      console.log("AI response generated successfully, length:", aiResponse.length)
    } catch (aiError) {
      console.error("AI response generation failed:", aiError)

      // Provide a fallback response
      aiResponse =
        "I apologize, but I'm having trouble processing your request right now. Please try asking again, or feel free to contact Ashtone directly at ashtone@wanailabs.org for immediate assistance."

      console.log("Using fallback response due to AI error")
    }

    // Step 3: Convert AI response to speech (optional, won't fail if TTS fails)
    let audioUrl: string | null = null
    try {
      console.log("Attempting to generate speech...")
      audioUrl = await generateSpeech(aiResponse)

      if (audioUrl) {
        console.log("Speech generated successfully")
      } else {
        console.log("Speech generation skipped or failed, returning text-only response")
      }
    } catch (speechError) {
      console.error("Speech generation error:", speechError)
      // Continue without audio - this is not a critical failure
    }

    // Return successful response
    console.log("=== Voice Chat API Request Completed Successfully ===")
    return createSuccessResponse({
      transcript,
      response: aiResponse,
      audioUrl,
    })
  } catch (error) {
    console.error("=== Voice Chat API Request Failed ===")
    console.error("Unexpected error in voice chat API:", error)

    // For any unexpected error, return the fallback response
    console.log("Unexpected error occurred, returning fallback response")
    return createVoiceFallbackResponse()
  }
}
