import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./QR_style.css";

export default function QrScanner () {
    const [scanResult, setScanResult] = useState(null);
    const scannerRef = useRef(null);
    useEffect(() => {
        // setTimeout(() => {
        //     scannerRef.current = new Html5QrcodeScanner('reader', {
        //         qrbox: {
        //             width: 300,
        //             height: 300,
        //         },
        //         fps: 10,
        //     });
        //     setScanResult(false);

        //     const success = result => {

        //         setScanResult(result);
        //         scannerRef.current.clear();
        //     }
    
        //     scannerRef.current.render(success);
        // },  5000)

        if (!scannerRef.current){
            scannerRef.current = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 300,
                    height: 300,
                },
                fps : 10,
            });
        }
        const success = result => {

            setScanResult(result);
            scannerRef.current.clear();
        }
    
        scannerRef.current.render(success);
    }, []);

    return (
        <div className="qrscan">
            <h1>QR Code Scanner</h1>
            <p>Provide the generated QR Code to gain access</p>
            {
                scanResult? <div className="scanResult">Success: {scanResult}</div> : <div id="reader"></div>
            }
        </div>
    );
}