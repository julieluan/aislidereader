import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import FormData from 'form-data';

let client = null;
if (process.env.ELEVENLABS_API_KEY) {
  client = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY
  });
  console.log('✅ ElevenLabs client initialized');
} else {
  console.warn('⚠️  ELEVENLABS_API_KEY not set, check API key');
}

/**
 * Transcribe audio to text using OpenAI Whisper API
 * Note: ElevenLabs doesn't have transcription, so we use OpenAI's Whisper
 *
 * @param {Buffer} audioBuffer - Audio file buffer
 * @returns {Promise<string>} - Transcribed text
 */
export async function transcribeAudio(audioBuffer) {
  try {
    // Option 1: Use OpenAI Whisper API
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OPENAI_API_KEY not set. Returning mock transcription.');
      return '[Mock transcription] This is a placeholder. Add your OPENAI_API_KEY to enable real transcription.';
    }

    const formData = new FormData();
    formData.append('file', audioBuffer, { filename: 'audio.webm' });
    formData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Transcription failed: ${error}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error(`Failed to transcribe audio: ${error.message}`);
  }
}

/**
 * Create an ElevenLabs Conversational AI agent
 *
 * @param {Object} course - Course object
 * @param {Array} slides - Array of slide objects
 * @param {string} voiceId - ElevenLabs voice ID (optional)
 * @returns {Promise<string>} - Agent ID
 */
export async function createConversationalAgent(course, slides, voiceId) {
  try {
    if (!client) {
      throw new Error('ELEVENLABS_API_KEY not set in environment variables');
    }

    // Build knowledge base from slides
    const knowledgeBase = slides.map((slide, idx) => `
Slide ${idx + 1}: ${slide.title}
Concept: ${slide.concept}
Details: ${slide.bullets.map(b => b.text).join('. ')}
Teaching Notes: ${slide.teacher_script}
    `).join('\n\n');

    // Create agent prompt
    const agentPrompt = `You are an AI teaching assistant for the course "${course.title}" in ${course.subject}.

Your role:
- Answer student questions about the course content
- Explain concepts in simple, clear terms
- Guide students through the slides
- Adapt your teaching style for ${course.accessibility_mode} learners
- Be encouraging and patient

When a student asks about a topic:
1. Reference the relevant slide number
2. Provide clear explanations
3. Ask follow-up questions to check understanding
4. Encourage exploration and curiosity

If you need to navigate to a specific slide, say "Let's look at slide [number]"

Course Knowledge Base:
${knowledgeBase}

Remember: You're here to help students learn and understand the material. Be supportive and educational.`;

    // Create the agent
    const agent = await client.conversationalAI.createAgent({
      name: `${course.title} - AI Tutor`,
      prompt: agentPrompt,
      voice: {
        voice_id: voiceId || "21m00Tcm4TlvDq8ikWAM" // Default voice
      },
      conversation_config: {
        turn_timeout: 30000,
        agent_response_timeout: 15000,
        tts_speed: 1.0,
        language: "en"
      }
    });

    console.log(`Created agent: ${agent.agent_id}`);
    return agent.agent_id;
  } catch (error) {
    console.error('Agent creation error:', error);
    throw new Error(`Failed to create agent: ${error.message}`);
  }
}

/**
 * Get list of available ElevenLabs voices
 *
 * @returns {Promise<Array>} - Array of voice objects
 */
export async function getVoices() {
  try {
    if (!client) {
      throw new Error('ELEVENLABS_API_KEY not set in environment variables');
    }
    const voices = await client.voices.getAll();
    return voices;
  } catch (error) {
    console.error('Error fetching voices:', error);
    throw new Error(`Failed to fetch voices: ${error.message}`);
  }
}

/**
 * End a conversation session
 * Note: ElevenLabs conversations are managed client-side via WebRTC,
 * but this endpoint can be used for logging and tracking purposes
 *
 * @param {string} agentId - Agent ID
 * @param {string} sessionId - Optional session ID for tracking
 * @returns {Promise<Object>} - Confirmation object
 */
export async function endConversation(agentId, sessionId = null) {
  try {
    if (!client) {
      console.warn('ELEVENLABS_API_KEY not set - conversation end logged but not tracked on ElevenLabs');
    }

    // Log the conversation end
    console.log(`Ending conversation for agent: ${agentId}${sessionId ? `, session: ${sessionId}` : ''}`);

    // Note: ElevenLabs WebRTC conversations are managed client-side
    // The actual connection is closed by the frontend, but we log it here
    // In the future, if ElevenLabs adds server-side session management, we can implement it here

    return {
      success: true,
      message: 'Conversation ended successfully',
      agentId,
      sessionId,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error ending conversation:', error);
    throw new Error(`Failed to end conversation: ${error.message}`);
  }
}
