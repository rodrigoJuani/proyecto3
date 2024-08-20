import React from 'react'
import ReactDOOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
     <App />
   </BrowserRouter>
)
