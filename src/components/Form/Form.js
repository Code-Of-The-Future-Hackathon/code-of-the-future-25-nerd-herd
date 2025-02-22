import React, { useState } from "react";
import "./Form.css";
import QrCodeGenerator from "../QrCodeGenerator/QrCodeGenerator";

function TestForm({ userId }) {
  const [number1, setAmount1] = useState(0);
  const [number2, setAmount2] = useState(0);
  const [number3, setAmount3] = useState(0);
  const [number4, setAmount4] = useState(0);
  const [number5, setAmount5] = useState(0);
  const [number6, setAmount6] = useState(0);
  const [formData, setFormData] = useState(null);

  // Build data object only with values > 0
  const prowerka = () => {
    const data = {};
    if (number1 > 0) data.monitor = number1;
    if (number2 > 0) data.keyboard = number2;
    if (number3 > 0) data.mouse = number3;
    if (number4 > 0) data.USB_cable = number4;
    if (number5 > 0) data.marker = number5;
    if (number6 > 0) data.paper = number6;

    if (Object.keys(data).length > 0) {
      setFormData(data);
    } else {
      alert("You must choose at least one item");
    }
  };

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
      {/* Pass the filtered formData to the QR code generator */}
      <QrCodeGenerator data={formData} user={userId} />
    </section>
  );
}

export default TestForm;
