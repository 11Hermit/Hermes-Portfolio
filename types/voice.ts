export interface VoiceMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  audioUrl?: string
}

export interface VoiceSession {
  id: string
  messages: VoiceMessage[]
  startTime: Date
  endTime?: Date
}

export interface ElevenLabsVoiceSettings {
  stability: number
  similarity_boost: number
  style: number
  use_speaker_boost: boolean
}

export interface ElevenLabsRequest {
  text: string
  model_id: string
  voice_settings: ElevenLabsVoiceSettings
}
