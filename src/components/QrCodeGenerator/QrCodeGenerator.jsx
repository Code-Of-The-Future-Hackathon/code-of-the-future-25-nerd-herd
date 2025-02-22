import { useState, useEffect } from "react";
import QRCode from 'react-qr-code';
import './QrCodeGenerator.css';


function QrCodeGenerator({ user, formData }) {
    
    const OPTIONS_ID_CODE_LENGTH = 3;
    const AMOUNT_CODE_LENGTH = 2;
    
    const [key, setKey] = useState("");
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

    const handleQrCodeGenerator = () => {
        if (!key.trim()) {
            return;
        }

        var data = "";
        if (user !== undefined) {
            /* data += String(user);  not implemented*/
            for (const option in formData ){
                var optionId = String(options[option]);
                for (var i = optionId.length; i < OPTIONS_ID_CODE_LENGTH; i++){
                    data += "0";
                }
                data += optionId;
                for (var i = optionId.length; i < AMOUNT_CODE_LENGTH; i++){
                    data += "0";
                }
                data += String(formData[option]);
            }
            setValue(data);
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
