import React, { useState } from 'react';
import './App.css';
import QrScanner from './components/QrScanner';
import './components/QrCodeGenerator/QrCodeGenerator';
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';

function App() {
  const [formData, setFormData] = useState({
    mouse: 28,
    Paper: 5,
  });
  const user = 'User123';

  return (
    <div>
      <QrCodeGenerator user={user} formData={formData} />
    </div>
  );
}
export default App;
