import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./QrScanner.css";
import CryptoJS from "crypto-js";

export default function QrScanner() {
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

        if (!scannerRef.current) {
            scannerRef.current = new Html5QrcodeScanner('reader', {
                qrbox: {
                    width: 300,
                    height: 300,
                },
                fps: 10,
            });
        }
        const success = result => {

            setScanResult(decryptWithSecretKey(result));
            scannerRef.current.clear();
        }

        scannerRef.current.render(success);
    }, []);


    const decryptWithSecretKey = async (encryptedText) => {
        try {
            console.log("Encrypted Text Received:", encryptedText); // Debugging
    
            // Fetch secret key
            const response = await fetch("secret.json");
            const data = await response.json();
            if (!data.secretKey) {
                throw new Error("Secret key not found in secret.json");
            }
            const secretKey = CryptoJS.enc.Utf8.parse(data.secretKey); // Match encryption method
            console.log("Secret Key:", secretKey.toString(CryptoJS.enc.Base64)); // Debugging
    
            // Decode Base64
            const encryptedData = CryptoJS.enc.Base64.parse(encryptedText);
            const encryptedBytes = encryptedData.words;
            
            if (!encryptedBytes || encryptedBytes.length < 4) {
                throw new Error("Invalid encrypted text format.");
            }
    
            // Extract IV and ciphertext
            const iv = CryptoJS.lib.WordArray.create(encryptedBytes.slice(0, 4), 16);
            const ciphertext = CryptoJS.lib.WordArray.create(encryptedBytes.slice(4));
    
            // Decrypt
            const decrypted = CryptoJS.AES.decrypt(
                { ciphertext: ciphertext },
                secretKey,
                {
                    iv: iv,
                    padding: CryptoJS.pad.Pkcs7,
                    mode: CryptoJS.mode.CBC,
                }
            );
    
            // Convert to UTF-8 and return
            const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
            if (!decryptedText) {
                throw new Error("Decryption resulted in an empty string. Possible incorrect key?");
            }
    
            console.log("Decryption successful:", decryptedText);
            return decryptedText;
        } catch (error) {
            console.error("Decryption error:", error);
            return "Decryption Failed";
        }
    };
    
    


    return (
        <div className="qrscan">
            <h1>QR Code Scanner</h1>
            <p>Provide the generated QR Code to gain access</p>
            {
                scanResult ? <div className="scanResult">Success: {scanResult}</div> : <div id="reader"></div>
            }
        </div>
    );
}