# Quick Environment Setup Guide

## TL;DR

**For Local Development:**
```bash
npm run dev
# Uses .env.development → Backend at http://localhost:3001
```

**For Production Build:**
```bash
npm run build
# Uses .env.production → Backend at your deployed URL
```

## Environment Files Explained

| File | Used When | Backend URL | Committed? |
|------|-----------|-------------|------------|
| `.env` | Fallback | localhost:3001 | ❌ No (gitignored) |
| `.env.development` | `npm run dev` | localhost:3001 | ✅ Yes (template) |
| `.env.production` | `npm run build` | Deployed backend | ✅ Yes (template) |

## What This Solves

✅ **Local development** uses local backend (`localhost:3001`)
✅ **Production builds** automatically use deployed backend
✅ No need to manually change URLs when deploying
✅ Environment variables are separated and secure

## How Vite Loads Environment Variables

Vite automatically loads environment files in this order (later files override earlier ones):

1. `.env` - Loaded in all cases
2. `.env.local` - Loaded in all cases, ignored by git
3. `.env.[mode]` - Only loaded in specified mode (development/production)
4. `.env.[mode].local` - Only loaded in specified mode, ignored by git

**Mode is determined by:**
- `npm run dev` → `development` mode
- `npm run build` → `production` mode

## Current Configuration

### Development (.env.development)
```
VITE_API_BASE_URL=http://localhost:3001
```

### Production (.env.production)
```
VITE_API_BASE_URL=https://svc-01kbv37kpz62m44tf1etshrhqg.01k95bsc0q4563cvhdsxj8gqva.lmapp.run
```

## Deploying to Raindrop

When you deploy to Raindrop, the build process will:

1. Run `npm run build` (production mode)
2. Vite loads `.env.production`
3. Frontend is built with `VITE_API_BASE_URL` pointing to your deployed backend
4. No code changes needed!

**Just make sure your remote backend has:**
- ✅ `/api/courses/:id/agent` endpoint
- ✅ `/api/conversations/:agentId/end` endpoint
- ✅ All other required endpoints

## Adding a New Environment Variable

1. Add to `.env.development`:
   ```
   VITE_NEW_VARIABLE=dev_value
   ```

2. Add to `.env.production`:
   ```
   VITE_NEW_VARIABLE=prod_value
   ```

3. **Important:** Prefix with `VITE_` to expose to browser!

4. Use in code:
   ```javascript
   const value = import.meta.env.VITE_NEW_VARIABLE
   ```

## Restart Required

⚠️ **Important:** After changing `.env` files, you must restart your dev server:
```bash
# Stop the server (Ctrl+C)
npm run dev  # Restart
```

## Security Best Practices

- ❌ Don't commit `.env` with real API keys
- ✅ Use `.env.development` and `.env.production` as templates
- ✅ Set real secrets in Raindrop deployment settings
- ✅ Use placeholder values in committed templates
- ✅ Keep `.env` and `.env.local` gitignored
