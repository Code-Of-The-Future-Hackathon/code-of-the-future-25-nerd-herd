import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
import App from './App';
=======
<<<<<<< HEAD
//import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
import App from './App';
=======
import App from './App.js'
>>>>>>> e394a9eefba6cdc0cd643faf54172194ce1294bc
>>>>>>> ae486bb2f4613bd4a530a5148c1f7c924e8a045c

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
