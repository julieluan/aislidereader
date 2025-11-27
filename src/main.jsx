import React from 'react'
import ReactDOM from 'react-dom/client'
import { ElevenLabsProvider } from '@elevenlabs/react'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ElevenLabsProvider
      apiKey={import.meta.env.VITE_ELEVENLABS_API_KEY}
    >
      <App />
    </ElevenLabsProvider>
  </React.StrictMode>,
)