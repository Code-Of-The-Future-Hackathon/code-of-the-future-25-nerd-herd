

import React, { useState, useEffect } from 'react';
import './login_page.css';
import TestForm from './testform';
import {accounts} from "./login_akaunti"

function Login() {
 
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false); 
  const [bool, setBool] = useState(false);
  // useEffect(() => {
  //   fetch('/login_akaunti.json') 
  //     .then((response) => response.json())
  //     .then((data) => setAccounts(data)) 
  //     .catch((error) => console.error('Error fetching credentials:', error));
  // }, []);

 
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = accounts.find(
      (account) => account.userId == userId && account.password == password
    );
    console.log(accounts)
    if (user) {
      setSuccessMessage('Login successful!');
      setErrorMessage('');
      setUserId('');
      setPassword('');
     

    } else {
      setErrorMessage('Invalid ID or password!');
      setSuccessMessage('');
    }
  };
  
  const handleLoginClick = () => {
    setShowLoginForm(true);
  };
  
  return (
    <div className="App">
      {!showLoginForm && (
        <header className="login-header">
          <h1>Welcome to NAME</h1>
          <p>Used for ...</p>
          <button className="login-btn" onClick={handleLoginClick}>
            Login
          </button>
        </header>
      )}

      {showLoginForm && (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage && <TestForm/>}</p>}
        </div>
      )}
      
    </div>
  );
}

export default Login;