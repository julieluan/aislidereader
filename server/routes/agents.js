import express from 'express';
import { createConversationalAgent, endConversation } from '../services/elevenlabs.service.js';

const router = express.Router();

/**
 * POST /api/courses/:id/create-agent
 * Create an ElevenLabs conversational agent for a course
 */
router.post('/courses/:id/create-agent', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { voiceId } = req.body;

    console.log(`Creating agent for course ${id}`);

    // TODO: Fetch course and slides from database
    // For now, return a placeholder

    // const agentId = await createConversationalAgent(course, slides, voiceId);

    res.json({
      message: 'Agent creation endpoint ready',
      courseId: id,
      voiceId: voiceId || 'default',
      note: 'Database connection needed to fully implement'
    });
  } catch (error) {
    console.error('Agent creation error:', error);
    next(error);
  }
});

/**
 * GET /api/courses/:id/agent
 * Get agent ID for a course
 */
router.get('/courses/:id/agent', async (req, res, next) => {
  try {
    const { id } = req.params;

    // TODO: Fetch agent_id from database
    // For now, use single hardcoded agent for all courses (development)
    const SHARED_AGENT_ID = 'agent_1301kayr8fdneh8agzn2vx0hfra0';

    res.json({
      agentId: SHARED_AGENT_ID,
      message: 'Using shared agent for development'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/conversations/:agentId/end
 * End a conversation session
 * Also handles sendBeacon requests from beforeunload events
 */
router.post('/conversations/:agentId/end', async (req, res, next) => {
  try {
    const { agentId } = req.params;
    
    // Handle both regular JSON and sendBeacon (Blob) requests
    let sessionId = null;
    if (req.body && typeof req.body === 'object') {
      sessionId = req.body.sessionId || null;
    }

    const result = await endConversation(agentId, sessionId);

    // For sendBeacon requests, we don't need to wait for response
    // But we'll still send a response for regular requests
    res.json(result);
  } catch (error) {
    console.error('Error ending conversation:', error);
    // For sendBeacon, errors are logged but we still return 200
    if (req.headers['content-type']?.includes('application/json')) {
      next(error);
    } else {
      res.status(200).json({ success: false, error: error.message });
    }
  }
});

export default router;
