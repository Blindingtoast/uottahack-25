import '@/index.css'
import App from '@/App.jsx'
import Scanner from '@/pages/scanner.jsx'
import AuthPage from '@/pages/auth.jsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, useParams, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/scanner/:activityId" element={<Scanner />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
    </Routes> 
  </Router>
);
