

import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import Form from '../Form/Form.js';
import { accounts } from "../../Accounts.js";


function Login() {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [bool, setBool] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        const user = accounts.find(
          (account) => account.name === userName && account.password === password
        );
        console.log(accounts);
        if (user) {
          setSuccessMessage('Login successful!');
          setErrorMessage('');
          setUserId(user.userId); // Set the userName here using the found account's name.
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
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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
                    {successMessage && <p className="success">{successMessage && <Form userId={userId}  />}</p>}
                </div>
            )}

        </div>
    );
}

export default Login;