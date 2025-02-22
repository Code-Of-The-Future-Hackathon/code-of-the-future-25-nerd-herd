import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./e.css";
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

            setScanResult(result);
            scannerRef.current.clear();
        }

        scannerRef.current.render(success);
    }, []);


    const decryptWithSecretKey = async (encryptedText) => {

        try {
            var secretKey;
            const response = await fetch("secret.json");
            const data = await response.json();

            if (!data.secretKey) {
                throw new Error("Secret key not found in secret.json");
            }
            

            const fullCipher = CryptoJS.enc.Base64.parse(encryptedText);

            const iv = CryptoJS.lib.WordArray.create(fullCipher.words.slice(0, 4), 16);
            const ciphertext = CryptoJS.lib.WordArray.create(fullCipher.words.slice(4));

            const cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: ciphertext,
            });

            const decrypted = CryptoJS.AES.decrypt(
                cipherParams,
                CryptoJS.enc.Hex.parse(secretKey),
                {
                    iv: iv,
                    padding: CryptoJS.pad.Pkcs7,
                    mode: CryptoJS.mode.CBC,
                }
            );

            // Return decrypted text in UTF-8 format
            setScanResult(decrypted.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error("Decryption error:", error);
            return;
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