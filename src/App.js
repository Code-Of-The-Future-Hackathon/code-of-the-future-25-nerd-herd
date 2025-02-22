import React, { useState } from 'react';
import './App.css';

import TestForm from './testform';
import Login from './Login_page.js';

import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
import QrScanner from './components/QrScanner';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './components/QrCodeGenerator/QrCodeGenerator';
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';

function App() {
  const [formData, setFormData] = useState({
    mouse: 28,
    Paper: 5,
  });
  const user = 'User123';

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header> */}
      <Login/>

    <Router>
        <Routes>
          <Route path="./components/QrScanner.js" element={<QrScanner />} />
          <Route path="./components/QrCodeGenerator/QrCodeGenerator.jsx" element={<QrCodeGenerator />} />
        </Routes>
    </Router>
    </div>
  );
}
export default App;
