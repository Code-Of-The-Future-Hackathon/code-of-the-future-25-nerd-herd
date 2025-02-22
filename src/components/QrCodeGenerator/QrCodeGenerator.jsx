import { useState, useEffect } from "react";
import QRCode from 'react-qr-code';
import './QrCodeGenerator.css';
<<<<<<< HEAD


function QrCodeGenerator({ user, formData }) {
    
    const OPTIONS_ID_CODE_LENGTH = 3;
    const AMOUNT_CODE_LENGTH = 2;
    
    const [key, setKey] = useState("");
=======
import CryptoJS from "crypto-js";



function QrCodeGenerator({ user, formData }) {
    const OPTIONS_ID_CODE_LENGTH = 3;
    const AMOUNT_CODE_LENGTH = 2;

>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc
    const [value, setValue] = useState("");
    const [qrIsVisible, setQrIsVisible] = useState(false);
    const [options, setOptions] = useState({});


<<<<<<< HEAD
=======

>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc
    useEffect(() => {
        fetch("options.json")
            .then((response) => response.json())
            .then((data) => {
                setOptions(data);
            })
            .catch((error) => console.error("Error loading options.json:", error));
<<<<<<< HEAD
    }, []);


    const getFormattedDate = () => {
        const now = new Date();
    
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); 
        const year = now.getFullYear();
        const hour = String(now.getHours()).padStart(2, '0'); 
        const minute = String(now.getMinutes()).padStart(2, '0'); 
    
        return `${day}${month}${year}${hour}${minute}`;
    };

    const handleQrCodeGenerator = () => {
        if (!key.trim()) {
            return;
        }

        var data = "";
        if (user !== undefined) {
            data += String("00000000"); //here is supposed to be user id
            for (const option in formData ){
                var optionId = String(options[option]).padStart(OPTIONS_ID_CODE_LENGTH, '0');
                var optionCount = String(formData[option]).padStart(AMOUNT_CODE_LENGTH, '0');
=======

    }, []);


    const encryptWithSecretKey = async (text) => {
        try {
            const response = await fetch("secret.json");
            const data = await response.json();

            if (!data.secretKey) {
                throw new Error("Secret key not found in secret.json");
            }

            const secretKey = CryptoJS.enc.Utf8.parse(data.secretKey); // Ensure key is parsed correctly
            const iv = CryptoJS.lib.WordArray.random(16);

            const encrypted = CryptoJS.AES.encrypt(text, secretKey, {
                iv: iv,
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC,
            });

            const encryptedBase64 = CryptoJS.enc.Base64.stringify(
                iv.concat(encrypted.ciphertext)
            );

            return encryptedBase64;
        } catch (error) {
            console.error("Encryption error:", error);
            return null;
        }
    };








    const getFormattedDate = () => {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');

        return `${day}${month}${year}${hour}${minute}`;
    };

    const handleQrCodeGenerator = async () => {
        let data = "";
        if (user !== undefined) {
            data += String("00000000");
            for (const option in formData) {
                let optionId = String(options[option]).padStart(OPTIONS_ID_CODE_LENGTH, '0');
                let optionCount = String(formData[option]).padStart(AMOUNT_CODE_LENGTH, '0');
>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc
                data += optionId;
                data += optionCount;
            }
            const formattedDate = getFormattedDate();
            data += formattedDate;
<<<<<<< HEAD
            setValue(data);
=======
            setValue(await encryptWithSecretKey(data));
>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc
            setQrIsVisible(true);
        } else {
            setQrIsVisible(false);
            alert("Key not found in options.json");
        }
    };

    return (
        <div className="qrcode__container">
            <h1>QR Code Generator</h1>
            <div className="qrcode__container--parent">
                <div className="qrcode__input">
<<<<<<< HEAD
                    <input
                        type="text"
                        placeholder="Enter a key"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
                </div>
                {qrIsVisible && (
                    <div className="qrcode__download">
                        <div className="qrcode__image">
                            <QRCode value={value} size={300} />
=======
                    <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
                </div>
                {qrIsVisible && (
                    <div className="qrcode__download" >
                        <div className="qrcode__image">
                            <QRCode value={value} />
>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QrCodeGenerator;
