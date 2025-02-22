import React, { useState } from 'react';
import './App.css';
import './components/QrCodeGenerator/QrCodeGenerator';
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
import QrScanner from './components/QrScanner/QrScanner.js';

function App() {
  const [formData, setFormData] = useState({
    mouse: 28,
    Paper: 5,
  });
  const user = 'User123';

  return (
    <div>
      <QrScanner/>
    </div>
  );
}
export default App;