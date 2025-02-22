import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import QRCode from 'react-qr-code'; // Make sure you have the correct import for QRCode


const QrCodeGenerator = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
    greet() {
        console.log("kotka")
    },

    
  }));

  return (
    <div className="qrcode__container">
      <h1>QR Code Generator</h1>
      <div className="qrcode__container--parent">
      <div className="qrcode__download">
            <div className="qrcode__image">
              {(props.value != '') ? <QRCode value={props.value} size={256} /> : <></>}
            </div>
          </div>
      </div>
    </div>
  );
});

export default QrCodeGenerator;
