import { QRCodeSVG } from "qrcode.react";

function AttendeeQRCode({id, activity, ...props}) {
  var encoded_data = `${activity};${id}`
  return <QRCodeSVG value={encoded_data} {...props} />
}

export { AttendeeQRCode };
