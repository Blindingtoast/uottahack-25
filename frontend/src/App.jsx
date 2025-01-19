import { useState, useEffect } from 'react'
import { AttendeeQRCode } from '@/components/ui/attendeeqr'
import { Link } from 'react-router-dom'
import { SurveyDialog } from '@/components/ui/survey'

function App() {
  return (
    <>
      <div className="py-4 border-b border-secondary">
        <h1 className="text-3xl font-semibold ">LineLess</h1>
      </div>
      <div id="api" className="py-4">
        <div id = "qrcode" className="py-2">
          <h2 className="font-medium">Attendee QR</h2>
          <AttendeeQRCode id="1234" activity="sample" className="bg-secondary p-4 my-2 rounded-lg"/>
        </div>
      </div>
      <SurveyDialog />
      <button>
        <Link to="scanner/somedata">Open Scanner</Link>
      </button>
    </>
  )
}

export default App
