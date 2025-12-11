#!/usr/bin/env node

/**
 * Environment Configuration Checker
 * Run this to verify your environment setup
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filename) {
  const filepath = path.join(__dirname, filename);
  const exists = fs.existsSync(filepath);

  if (exists) {
    log('green', `✅ ${filename} exists`);

    // Read and check content
    const content = fs.readFileSync(filepath, 'utf8');

    // Check for VITE_API_BASE_URL
    const baseUrlMatch = content.match(/VITE_API_BASE_URL=(.+)/);
    if (baseUrlMatch) {
      const url = baseUrlMatch[1].trim();
      log('blue', `   → API URL: ${url}`);

      if (url.includes('localhost') || url.includes('127.0.0.1')) {
        log('yellow', '   ⚠️  Using local backend (development)');
      } else {
        log('green', '   ℹ️  Using remote backend (production)');
      }
    } else {
      log('red', '   ❌ VITE_API_BASE_URL not found!');
    }

    // Check for API keys
    if (content.includes('VITE_ELEVENLABS_API_KEY')) {
      const keyMatch = content.match(/VITE_ELEVENLABS_API_KEY=(.+)/);
      if (keyMatch && keyMatch[1].trim().length > 0) {
        log('green', '   ✅ ElevenLabs API key configured');
      } else {
        log('red', '   ❌ ElevenLabs API key is empty');
      }
    }

    return true;
  } else {
    log('red', `❌ ${filename} NOT found`);
    return false;
  }
}

console.log('\n' + '='.repeat(60));
log('magenta', '🔍 Environment Configuration Check');
console.log('='.repeat(60) + '\n');

// Check all environment files
log('blue', '📁 Checking Environment Files:');
console.log('');

const files = [
  { name: '.env', required: false, description: 'Fallback (gitignored)' },
  { name: '.env.development', required: true, description: 'Development mode' },
  { name: '.env.production', required: true, description: 'Production build' },
];

let allGood = true;

files.forEach(file => {
  console.log(`\n${file.description}:`);
  const exists = checkFile(file.name);
  if (file.required && !exists) {
    allGood = false;
  }
});

// Check backend .env
console.log('\n\nBackend Configuration:');
const backendEnvPath = path.join(__dirname, 'server', '.env');
if (fs.existsSync(backendEnvPath)) {
  log('green', '✅ server/.env exists');
  const content = fs.readFileSync(backendEnvPath, 'utf8');

  if (content.includes('ELEVENLABS_API_KEY')) {
    log('green', '   ✅ ElevenLabs API key configured');
  } else {
    log('red', '   ❌ ElevenLabs API key missing');
  }

  if (content.includes('OPENAI_API_KEY')) {
    log('green', '   ✅ OpenAI API key configured');
  } else {
    log('yellow', '   ⚠️  OpenAI API key missing (needed for transcription)');
  }
} else {
  log('red', '❌ server/.env NOT found');
  allGood = false;
}

// Summary
console.log('\n' + '='.repeat(60));
if (allGood) {
  log('green', '✅ All required environment files are configured!');
  console.log('');
  log('blue', '📝 Next steps:');
  console.log('   1. Run "npm run dev" for local development');
  console.log('   2. Run "npm run build" for production build');
  console.log('   3. Check ENV_SETUP.md for more details');
} else {
  log('red', '❌ Some environment files are missing or misconfigured');
  console.log('');
  log('blue', '📝 To fix:');
  console.log('   1. Create missing .env files');
  console.log('   2. Check DEPLOYMENT.md for setup instructions');
  console.log('   3. Run this script again to verify');
}
console.log('='.repeat(60) + '\n');
