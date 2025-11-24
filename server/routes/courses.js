import express from 'express';
import { generateOutline, generateSlides } from '../services/llm.service.js';

const router = express.Router();

/**
 * POST /api/generate-outline
 * Generate course outline from knowledge text using Claude
 */
router.post('/generate-outline', async (req, res, next) => {
  try {
    const { knowledgeText, concepts, accessibility, keywords } = req.body;

    // Validation
    if (!knowledgeText || !concepts || !accessibility) {
      return res.status(400).json({
        error: 'Missing required fields: knowledgeText, concepts, accessibility'
      });
    }

    console.log(`Generating outline for accessibility mode: ${accessibility}`);

    const result = await generateOutline(
      knowledgeText,
      concepts,
      accessibility,
      keywords
    );

    res.json(result);
  } catch (error) {
    console.error('Outline generation error:', error);
    next(error);
  }
});

/**
 * POST /api/generate-slides
 * Generate slides from outline using Claude
 */
router.post('/generate-slides', async (req, res, next) => {
  try {
    const { outline, accessibility } = req.body;

    // Validation
    if (!outline || !accessibility) {
      return res.status(400).json({
        error: 'Missing required fields: outline, accessibility'
      });
    }

    if (!Array.isArray(outline)) {
      return res.status(400).json({
        error: 'Outline must be an array'
      });
    }

    console.log(`Generating ${outline.length} slides for accessibility mode: ${accessibility}`);

    const slides = await generateSlides(outline, accessibility);

    res.json({ slides });
  } catch (error) {
    console.error('Slide generation error:', error);
    next(error);
  }
});

/**
 * GET /api/courses
 * Get all courses (placeholder - will connect to DB later)
 */
router.get('/courses', async (req, res, next) => {
  try {
    // TODO: Connect to database
    res.json({
      courses: [],
      message: 'Database not yet connected'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/courses/:id
 * Get course by ID (placeholder - will connect to DB later)
 */
router.get('/courses/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: Connect to database
    res.json({
      course: null,
      message: 'Database not yet connected'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
