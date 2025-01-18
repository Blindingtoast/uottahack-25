import { Scanner as QRCodeScanner } from "@yudiel/react-qr-scanner"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

function Scanner() {
  const { toast } = useToast()

  let handleScan = (data) => {
    fetch("/api/scanned/", {
      method: "POST",
      body: data,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("couldn't send the data to backend");
      }
      return response.json()
    })
    .then(responsejson => {
      let toastparams = responsejson.status ? 
        { description: "Scanned successfully" } : {description: "There was a problem scanning", variant: "destructive"}
      toast(toastparams)
      console.log(`response from backend: ${responsejson.status}`);
    })
    .catch((error) => {
      console.error(`got an error during scanning post to backend ${error}`)
    });
  }
  return (
    <>
      <h1>Scanning</h1>
      <QRCodeScanner onScan={handleScan} onError={(e) => console.log(`got an error: ${e}`)} />
      <Toaster />
    </>
  );
}

export default Scanner;
