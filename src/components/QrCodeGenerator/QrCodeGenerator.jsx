import { useState, useEffect } from "react";
import QRCode from 'react-qr-code';
import './QrCodeGenerator.css';


function QrCodeGenerator(user, options, amounts) {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [qrIsVisible, setQrIsVisible] = useState(false);


    const handleQrCodeGenerator = () => {
        if (!key.trim()) {
            return;
        }
        if (user !== undefined) {
            setValue(String(user));
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QrCodeGenerator;
