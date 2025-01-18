import { useState, useEffect } from 'react'
import { AttendeeQRCode } from '@/components/ui/attendeeqr'
import { FileForm } from '@/components/ui/fileform'
import { Scanner } from '@yudiel/react-qr-scanner';

function App() {
  const [msg, setMsg] = useState(0)

  useEffect(() => {
    fetch('/api/data')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP ERROR");
      }
      return response.json();
    })
    .then(data => {
      setMsg(data.message);
      console.log(`got the response: ${data.message}`);
    })
    .catch(error => {
      console.error("Error fetching msg ", error);
      setMsg("error getting data from flask");
    });
  }, []);

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
        <div id = "scanner" className="py-2">
          <h2 className="font-medium">Scanner</h2>
          <Scanner onScan={(result) => console.log(result)} />
        </div>
      </div>
    </>
  )
}

export default App
