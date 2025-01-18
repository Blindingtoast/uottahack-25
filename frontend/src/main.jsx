import '@/index.css'
import App from '@/App.jsx'
import Scanner from '@/pages/scanner.jsx'
import AuthPage from '@/pages/auth.jsx'
import EventsPage from '@/pages/events.jsx'
import ActivitiesPage from '@/pages/activities'
import CreateEventPage from './pages/create_event'


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
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:eventId" element={<ActivitiesPage />} />
      <Route path="/events/create" element={<CreateEventPage />} />
    </Routes> 
  </Router>
);
