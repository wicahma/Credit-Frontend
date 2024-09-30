import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextWrapper from './ContextWrapper.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ContextWrapper />
    </StrictMode>,
)
