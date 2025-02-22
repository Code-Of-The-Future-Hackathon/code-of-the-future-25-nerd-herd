import { useState, useEffect } from "react";
import QRCode from 'react-qr-code';
import './QrCodeGenerator.css';
import CryptoJS from "crypto-js";

function QrCodeGenerator({ data, user }) {
  const [value, setValue] = useState("");
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const [options, setOptions] = useState({});


  useEffect(() => {
    fetch("options.json")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((error) => console.error("Error loading options.json:", error));
  }, []);


  useEffect(() => {
    if (data) {
      handleQrCodeGeneration(data);
    }
  }, [data]); 

  const encryptWithSecretKey = async (text) => {
    try {
      const response = await fetch("secret.json");
      const secretData = await response.json();

      if (!secretData.secretKey) {
        throw new Error("Secret key not found in secret.json");
      }

      const secretKey = CryptoJS.enc.Utf8.parse(secretData.secretKey);
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


  const handleQrCodeGeneration = async (data) => {
    let formattedData = String(user); 
    for (const option in data) {
      let optionId = String(options[option]).padStart(3, '0');
      let optionCount = String(data[option]).padStart(2, '0');
      formattedData += optionId + optionCount;
    }
    const formattedDate = getFormattedDate();
    formattedData += formattedDate;

    const encryptedValue = await encryptWithSecretKey(formattedData);
    setValue(encryptedValue);
    setQrIsVisible(true);
  };

  return (
    <div className="qrcode__container">
      <h1>QR Code Generator</h1>
      {qrIsVisible && (
        <div className="qrcode__download">
          <div className="qrcode__image">
            <QRCode value={value} />
          </div>
        </div>
      )}
    </div>
  );
}

export default QrCodeGenerator;
