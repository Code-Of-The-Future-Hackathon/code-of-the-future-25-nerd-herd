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
                data += optionId;
                data += optionCount;
            }
            const formattedDate = getFormattedDate();
            data += formattedDate;
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
