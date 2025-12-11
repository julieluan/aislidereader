# Deployment Guide

This document explains how to deploy the AI Slide Reader application to Raindrop or other platforms.

## Environment Configuration

The application uses different environment variables for **development** and **production**:

### Development (Local)
- Uses `.env.development`
- Backend URL: `http://localhost:3001`
- Runs both frontend and backend locally

### Production (Deployed)
- Uses `.env.production`
- Backend URL: Your deployed backend service URL
- Frontend and backend deployed separately

## Environment Files

### `.env` (Fallback - Not Committed)
Contains your actual API keys and secrets. This file is gitignored and used as a fallback.

### `.env.development` (Template - Can be Committed)
Used when running `npm run dev`. Contains development configuration pointing to `localhost:3001`.

### `.env.production` (Template - Can be Committed)
Used when running `npm run build`. Contains production configuration pointing to your deployed backend.

**⚠️ IMPORTANT:** Remove actual API keys from `.env.development` and `.env.production` before committing to Git!

## Deploying to Raindrop

### Step 1: Deploy Backend Service

Your backend needs to be deployed first and have the following endpoints:
- `GET /api/courses/:id/agent` - Get agent ID for a course
- `POST /api/courses/:id/create-agent` - Create agent for a course
- `POST /api/conversations/:agentId/end` - End conversation session

Currently, your backend service is at:
```
https://svc-01kbv37kpz62m44tf1etshrhqg.01k95bsc0q4563cvhdsxj8gqva.lmapp.run
```

### Step 2: Update Production Environment

Update `.env.production` with your deployed backend URL:
```bash
VITE_API_BASE_URL=https://your-backend-service.lmapp.run
```

### Step 3: Set Environment Variables on Raindrop

When deploying to Raindrop, set these environment variables in your deployment settings:

**Frontend Environment Variables:**
- `VITE_API_BASE_URL` = Your backend service URL
- `VITE_ELEVENLABS_API_KEY` = Your ElevenLabs API key

**Backend Environment Variables:**
- `ELEVENLABS_API_KEY` = Your ElevenLabs API key
- `OPENAI_API_KEY` = Your OpenAI API key (for transcription)
- `PORT` = 3001 (or as configured by Raindrop)
- `NODE_ENV` = production

### Step 4: Build and Deploy

```bash
# Build the application (uses .env.production)
npm run build

# Deploy to Raindrop using your deployment command
# (This depends on your Raindrop setup)
```

## How It Works

### Local Development (`npm run dev`)
1. Vite loads `.env.development`
2. Frontend runs on port 5173 (default Vite port)
3. Backend runs on port 3001
4. Frontend calls `http://localhost:3001/api/*`

### Production Build (`npm run build`)
1. Vite loads `.env.production`
2. Frontend is built with production backend URL
3. Frontend calls your deployed backend URL

### Deployment Architecture

```
┌─────────────────────────────────────────┐
│  Frontend (Raindrop/Vercel/Netlify)     │
│  - Built React app                       │
│  - Uses VITE_API_BASE_URL               │
└────────────┬────────────────────────────┘
             │
             │ HTTP Requests
             ▼
┌─────────────────────────────────────────┐
│  Backend (Raindrop Service)             │
│  - Express server                        │
│  - Agent workflow API                    │
│  - ElevenLabs integration               │
└─────────────────────────────────────────┘
```

## Troubleshooting

### 404 Error on `/api/conversations/:agentId/end`
- **Problem**: Backend doesn't have the endpoint
- **Solution**: Ensure your deployed backend includes the agents routes from `server/routes/agents.js`

### CORS Errors
- **Problem**: Backend not allowing requests from frontend domain
- **Solution**: Update CORS settings in `server/server.js` to allow your frontend domain

### Environment Variables Not Working
- **Problem**: Variables not loading in production
- **Solution**: Set them directly in Raindrop deployment settings, don't rely on `.env` files in production

## Security Notes

1. **Never commit real API keys** to Git
2. Use environment variable templates (`.env.development`, `.env.production`) with placeholder values
3. Set real secrets via deployment platform's environment variable settings
4. Keep `.env` file gitignored
5. Rotate API keys if accidentally committed

## Current Status

✅ Local development configured to use `http://localhost:3001`
✅ Production build configured to use remote backend
⚠️ Remote backend needs to implement `/api/conversations/:agentId/end` endpoint
⚠️ Database connection needed for course/agent mapping

## Next Steps for Production

1. Add database to backend service (to store course-agent mappings)
2. Implement missing endpoints on remote backend
3. Test production build locally with `npm run build && npm run preview`
4. Deploy to Raindrop
5. Update environment variables in Raindrop settings
6. Test deployed application
