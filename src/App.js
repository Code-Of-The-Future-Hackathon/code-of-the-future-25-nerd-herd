import React, { useState } from 'react';
import './App.css';
<<<<<<< HEAD
import TestForm from './testform';
import Login from './Login_page.js';

=======
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
import QrScanner from './components/QrScanner';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
=======
import './components/QrCodeGenerator/QrCodeGenerator';
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc
>>>>>>> ae486bb2f4613bd4a530a5148c1f7c924e8a045c

function App() {
  const [formData, setFormData] = useState({
    mouse: 28,
    Paper: 5,
  });
  const user = 'User123';

  return (
<<<<<<< HEAD
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header> */}
      <Login/>
=======
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
>>>>>>> ae486bb2f4613bd4a530a5148c1f7c924e8a045c
    </div>
>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc
  );
}
export default App;
