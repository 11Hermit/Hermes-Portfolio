import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini with error handling
let genAI: GoogleGenerativeAI | null = null
try {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY environment variable is not set")
  } else {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    console.log("Gemini AI initialized successfully for text chat")
  }
} catch (error) {
  console.error("Failed to initialize Gemini AI for text chat:", error)
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

// Helper function to create error response with proper JSON headers
function createErrorResponse(message: string, status = 500, suggestion?: string) {
  console.error(`Text Chat API Error (${status}):`, message)

  return new NextResponse(
    JSON.stringify({
      error: message,
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

export async function POST(request: NextRequest) {
  console.log("=== Text Chat API Request Started ===")

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

    // Parse JSON body with error handling
    let body: { message: string; history?: any[] }
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("Failed to parse JSON body:", parseError)
      return createErrorResponse(
        "Invalid request format",
        400,
        "Please ensure you're sending valid JSON with a 'message' field.",
      )
    }

    const { message, history } = body

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      console.error("No message provided in request")
      return createErrorResponse("No message provided", 400, "Please provide a message and try again.")
    }

    console.log("Received text message:", message.substring(0, 100) + "...")

    // Validate message length (limit to 2000 characters)
    if (message.length > 2000) {
      console.error("Message too long:", message.length)
      return createErrorResponse("Message too long", 400, "Please keep your message under 2000 characters.")
    }

    // Generate AI response using Gemini with conversation context
    let aiResponse: string
    try {
      console.log("Generating AI response for text message...")
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
      if (history && Array.isArray(history)) {
        chatHistory = [...chatHistory, ...history]
      }

      const chat = model.startChat({
        history: chatHistory,
      })

      const result = await chat.sendMessage(message.trim())
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

    // Return successful response
    console.log("=== Text Chat API Request Completed Successfully ===")
    return createSuccessResponse({
      response: aiResponse,
    })
  } catch (error) {
    console.error("=== Text Chat API Request Failed ===")
    console.error("Unexpected error in text chat API:", error)

    // Ensure we always return a JSON response, even for unexpected errors
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"

    return createErrorResponse(
      `Internal server error: ${errorMessage}`,
      500,
      "An unexpected error occurred. Please try again.",
    )
  }
}
