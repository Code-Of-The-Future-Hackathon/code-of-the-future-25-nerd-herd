import React, { useState } from 'react';
import './App.css';
import './components/QrCodeGenerator/QrCodeGenerator';
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
import QrScanner from './components/QrScanner/QrScanner.js';

function App() {

  return (
    <div className='App'>
      <QrScanner/>
    </div>
  );
}
export default App;