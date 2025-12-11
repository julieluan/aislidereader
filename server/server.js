// Load environment variables FIRST, before any other imports that might use them
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from the server directory
const envPath = join(__dirname, '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn('⚠️  Failed to load .env file:', result.error.message);
  console.warn('   Looking for .env at:', envPath);
} else {
  console.log('✅ Environment variables loaded from:', envPath);
  if (process.env.ELEVENLABS_API_KEY) {
    console.log('✅ ELEVENLABS_API_KEY found in environment');
  } else {
    console.warn('⚠️  ELEVENLABS_API_KEY not found in environment after loading .env');
  }
}

// Now import other modules (they can use process.env)
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Import routes
import transcriptionRoutes from './routes/transcription.js';
import coursesRoutes from './routes/courses.js';
import agentsRoutes from './routes/agents.js';

// Use routes
app.use('/api', transcriptionRoutes);
app.use('/api', coursesRoutes);
app.use('/api', agentsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Server started successfully!');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log(`  POST http://localhost:${PORT}/api/transcribe`);
  console.log(`  POST http://localhost:${PORT}/api/generate-outline`);
  console.log(`  POST http://localhost:${PORT}/api/generate-slides`);
  console.log(`  POST http://localhost:${PORT}/api/courses/:id/create-agent`);
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
