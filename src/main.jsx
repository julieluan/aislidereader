import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Note: Strict Mode is disabled because it causes issues with WebRTC connections
// in the ElevenLabs ConversationBar component. Strict Mode intentionally
// mounts/unmounts components twice in development, which breaks persistent
// WebSocket/WebRTC connections.
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)