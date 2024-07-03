import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <GoogleOAuthProvider clientId="751252551779-f137bcbci81cnv03qi81u3doi7htuskc.apps.googleusercontent.com">
      <App />
  </GoogleOAuthProvider>;
  </BrowserRouter>
    
  </React.StrictMode>,
)
