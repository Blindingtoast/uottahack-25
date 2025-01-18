import { QRCodeSVG } from "qrcode.react";

function AttendeeQRCode({id, activity, ...props}) {
  let encoded_data = `{"activity_id": "${activity}", "people_id": "${id}"}`
  return <QRCodeSVG value={encoded_data} {...props} />
}

export { AttendeeQRCode };
