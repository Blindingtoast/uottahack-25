import '@/index.css'
import Scanner from '@/pages/scanner.jsx'
import AuthPage from '@/pages/auth.jsx'
import EventsPage from '@/pages/events.jsx'
import ActivitiesPage from '@/pages/activities'
import CreateEventPage from './pages/create_event'
import CreateActivityPage from "@/pages/create_activity"
import NavBar from './components/navbar'
import CreateRoomPage from './pages/create_room'
import RoomDetailsPage from './pages/view_room'
import RoomsPage from './pages/rooms'
import ScannerPage from './pages/scanner_page'
import AccountPage from './pages/account'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, useParams, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<AccountPage />} />
      <Route path="/scanner/:activityId" element={<Scanner />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:eventId" element={<ActivitiesPage />} />
      <Route path="/events/create" element={<CreateEventPage />} />
      <Route path="/events/:eventId/create" element={<CreateActivityPage />} />
      <Route path="/rooms/create" element={<CreateRoomPage />} />
      <Route path="/rooms/:roomId" element={<RoomDetailsPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/scanner" element={<ScannerPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes> 
  </Router>
);
