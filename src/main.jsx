import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProviderComponent } from './context/ThemeContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderComponent>
        <App />
    </ThemeProviderComponent>
  </StrictMode>,
)
