import '@/index.css'
import App from '@/App.jsx'
import Scanner from '@/pages/scanner.jsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, useParams, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/scanner/:activityId" element={<Scanner />} />
    </Routes> 
  </Router>
);
