import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./QrScanner.css";
import { options } from "../../options"
import { users } from "../../users"
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
        const success = async(result) => {

            const decryptedText = await decryptWithSecretKey(result);
            setScanResult(decryptedText)
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

    const parsingFromKey = (encoded) => {
        try {
            const response = { "items": [] };
            const user = encoded.slice(0, 8);
            const date = encoded.slice(-12);
            const everything_else = encoded.slice(8, -12);

            const [day, month, year, hour, minutes] = [
                parseInt(date.slice(0, 2), 10),
                parseInt(date.slice(2, 4), 10) - 1, // Months are 0-based in JavaScript
                parseInt(date.slice(4, 8), 10),
                parseInt(date.slice(8, 10), 10),
                parseInt(date.slice(10, 12), 10)
            ];

            // Correct way to create Date object
            const date_time = new Date(year, month, day, hour, minutes);

            // Splitting everything_else into sets of 5 digits
            const a = everything_else.split("").reduce((accumulator, ch, i) => {
                accumulator.push(ch);
                if ((i + 1) % 5 === 0) accumulator.push(' ');
                return accumulator;
            }, []).join("").split(" ");

            for (const item of a) {
                if (item.length === 0) continue;

                // Correcting the indices for id and amount
                const id = item.slice(0, 3);
                const amount = item.slice(3, 5);

                // Correcting the forEach loop with proper destructuring
                Object.entries(options).forEach(([key, value]) => {
                    if (value == +id) response["items"].push({ "type": key, "amount": +amount });
                });
            }

            // Finding the user
            response["user"] = users.find((e) => e.userId == user);
            response["date"] = date_time.toLocaleDateString("en-US");

            return (
                <div>
                    <h3>{response["user"]?.name}</h3>
                    <h3>Scanned on {response["date"]}</h3>
                    {response["items"].map((i, index) =>
                        <div className="center_this"><strong key={index}>Requested {i["amount"]} {i["type"]}</strong><br/></div>
                    )}
                </div>
            )
        } catch (error) {
            console.log("Parsing successful:")
        }
    };


    return (
        <div className="qrscan">
            <h1>QR Code Scanner</h1>
            
            <p>Provide the generated QR Code to gain access</p>
            {
                scanResult ? <div className="scanResult">Success: {parsingFromKey(scanResult)}</div> : <div id="reader"></div>
            }
        </div>
    );
}