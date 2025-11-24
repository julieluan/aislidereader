import express from 'express';
import multer from 'multer';
import { transcribeAudio } from '../services/elevenlabs.service.js';

const router = express.Router();

// Configure multer for audio file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept audio files
    if (file.mimetype.startsWith('audio/') || file.mimetype === 'video/webm') {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'));
    }
  }
});

/**
 * POST /api/transcribe
 * Transcribe audio to text using Whisper API
 */
router.post('/transcribe', upload.single('audio'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    console.log(`Transcribing audio file: ${req.file.originalname} (${req.file.size} bytes)`);

    const transcription = await transcribeAudio(req.file.buffer);

    res.json({
      text: transcription,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    });
  } catch (error) {
    console.error('Transcription error:', error);
    next(error);
  }
});

export default router;
