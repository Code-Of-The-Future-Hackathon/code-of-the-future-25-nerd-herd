import React, { useState, useRef } from "react";
import './testform.css';
import QrCodeGenerator from "./components/QrCodeGenerator/QrCodeGenerator";
import * as options from "./dictionary.json"

function TestForm() {
   const OPTIONS_ID_CODE_LENGTH = 3;
   const AMOUNT_CODE_LENGTH = 2;
   const [key, setKey] = useState('');
   const [value, setValue] = useState('');
   const [qrIsVisible, setQrIsVisible] = useState(false);
   const [number1, setAmount1] = useState(0);
   const [number2, setAmount2] = useState(0);
   const [number3, setAmount3] = useState(0);
   const [number4, setAmount4] = useState(0);
   const [number5, setAmount5] = useState(0);
   const [number6, setAmount6] = useState(0);
   const [bool, setBool] = useState(false);
   const [data, setData] = useState("");
   const QRref = useRef();

  const handleQrCodeGenerator = (user, formData) => {

   let data = '';
   if (user !== undefined) {
     for (const option in formData) {
      if(formData[option] < 1) continue;
      let optionId = String(options[option]);
       for (let i = optionId.length; i < OPTIONS_ID_CODE_LENGTH; i++) {
         data += '0';
       }
       data += optionId;
       for (let i = String(formData[option]).length; i < AMOUNT_CODE_LENGTH; i++) {
         data += '0';
       }
       data += String(formData[option]);
     }
     console.log(data)
     return data;
   } else {
     return "";
   }
 }

  

  function prowerka() {
    if (
      number1 > 0 ||
      number2 > 0 ||
      number3 > 0 ||
      number4 > 0 ||
      number5 > 0 ||
      number6 > 0
    ) {
      const result = handleQrCodeGenerator("pesho", {
        monitor: number1,
        keyboard: number2,
        mouse: number3,
        USB_cable: number4,
        marker: number5,
        paper: number6,
      });
      setData(result);
      
      setBool(true);
    } else {
      alert("You must choose at least one item");
    }
  }

  return (
    <section>
      <h2>What item do you want?</h2>
      <form>
        <h4>Technology</h4>
        <div className="tech">
          
          <label htmlFor="item11">Monitor</label>
          <input
            type="number"
            id="11"
            name="amount11"
            className="amount-input"
            placeholder="Qty"
            min="0"
            value={number1}
            onChange={(e) => setAmount1(+e.target.value)}
          />
        </div>
        <div className="tech">
          
          <label htmlFor="item12">Keyboard</label>
          <input
            type="number"
            id="12"
            name="amount12"
            className="amount-input"
            placeholder="Qty"
            min="0"
            value={number2}
            onChange={(e) => setAmount2(+e.target.value)}
          />
        </div>
        <div className="tech">
         
          <label htmlFor="item13">Mouse</label>
          <input
            type="number"
            id="13"
            name="amount13"
            className="amount-input"
            placeholder="Qty"
            min="0"
            value={number3}
            onChange={(e) => setAmount3(+e.target.value)}
          />
        </div>
        <div className="tech">
         
          <label htmlFor="item14">USB cable</label>
          <input
            type="number"
            id="14"
            name="amount14"
            className="amount-input"
            placeholder="Qty"
            min="0"
            value={number4}
            onChange={(e) => setAmount4(+e.target.value)}
          />
        </div>
        <h4>Office materials</h4>
        <div className="checkbox-group">
          
          <label htmlFor="item1">Markers</label>
          <input
            type="number"
            id="amount21"
            name="amount21"
            className="amount-input"
            placeholder="Qty"
            min="0"
            value={number5}
            onChange={(e) => setAmount5(+e.target.value)}
          />
        </div>
        <div className="office">
          
          <label htmlFor="22">Paper</label>
          <input
            type="number"
            id="22"
            name="amount22"
            className="amount-input"
            placeholder="Qty"
            min="0"
            value={number6}
            onChange={(e) => setAmount6(+e.target.value)}
          />
        </div>
        <br />
      </form>
      <button onClick={prowerka}>Submit</button>
      <br />
      <br />
      <br />
      <QrCodeGenerator ref={QRref} value={bool ? data : ''} />
    </section>
  );
}

export default TestForm;
