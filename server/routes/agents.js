import express from 'express';
import { createConversationalAgent } from '../services/elevenlabs.service.js';

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
    res.json({
      agentId: null,
      message: 'Database not yet connected'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
