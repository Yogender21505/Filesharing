import { useState } from 'react'
import Router from "./routes"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ButtonUsage from './components/HelloButton'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext';
function App() {


  return (
    
    <AuthProvider>
    <BrowserRouter>
    <Router/>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
