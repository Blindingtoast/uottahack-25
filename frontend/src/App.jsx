import { useState, useEffect } from 'react'
import { FileForm } from '@/components/ui/fileform'

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
        <h1 className="text-3xl font-semibold ">OEC Preperation</h1>
      </div>
      <div id="api" className="py-4">
        <div id="api-json" className="py-2">
          <h2 className="font-medium">Flask JSON Response Demonstration</h2>
          <p className="p-4 my-2 bg-secondary rounded-lg">Message from Flask: <code>{msg}</code></p>
        </div>
        <div id="api-file" className="py-2">
          <h2 className="font-medium">Flask File Upload Demonstration</h2>
          <FileForm className="bg-secondary p-4 my-2 rounded-lg"/>
        </div>
      </div>
    </>
  )
}

export default App
