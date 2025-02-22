import React, { useState } from 'react';
import './App.css';
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
import QrScanner from './components/QrScanner';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
=======
import './components/QrCodeGenerator/QrCodeGenerator';
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc

function App() {
  const [formData, setFormData] = useState({
    mouse: 28,
    Paper: 5,
  });
  const user = 'User123';

  return (
<<<<<<< HEAD
    <Router>
        <Routes>
          <Route path="./components/QrScanner.js" element={<QrScanner />} />
          <Route path="./components/QrCodeGenerator/QrCodeGenerator.jsx" element={<QrCodeGenerator />} />
        </Routes>
    </Router>
=======
    <div>
      <QrCodeGenerator user={user} formData={formData} />
    </div>
>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc
  );
}
export default App;
