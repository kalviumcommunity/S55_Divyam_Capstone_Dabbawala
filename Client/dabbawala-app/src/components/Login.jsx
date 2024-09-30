import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import './Login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!username || !password) {
                alert('Please enter both username and password');
            } else if (password.length < 6) {
                alert('Password should contain at least 6 characters');
            } else {
                const response = await axios.post(`https://s55-divyam-capstone-dabbawala.onrender.com/login`, { username, password });
                if (response.status === 200) {
                    sessionStorage.setItem('login', true);
                    sessionStorage.setItem('username', username);
                    alert('Login successful');
                    navigate('/');
                } else if (response.status === 401) {
                    alert('Invalid user credentials');
                }
            }
        } catch (err) {
            console.error('Error during login:', err);
            alert('Login failed. Please try again.');
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const decoded = jwtDecode(response.credential); 
            const data = {
                googleId: decoded.sub,
                username: decoded.name,
                profilePic: decoded.picture,
            };

            const res = await axios.post(`https://s55-divyam-capstone-dabbawala.onrender.com/googleAuthLogin`, data);

            if (res.status === 200 || res.status === 201) {
                sessionStorage.setItem('login', true);
                sessionStorage.setItem('username', decoded.name);
                alert('Login successful');
                navigate('/');
            } else {
                alert('Google login failed. Please try again.');
            }
        } catch (err) {
            console.error("Google Login Error:", err);
            alert('Google login failed. Please try again.');
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google Login Failed:', error);
        alert('Google login failed. Please try again.');
    };

    return (
        <div className="grid">
            <img src="https://img.hotimg.com/Dabbawala-Mumbai-3.png" alt="bg" id="sign-img" />
            <div id="sign-page">
                <div className="container">
                    <h1 id="heading">LOGIN</h1>
                    <form onSubmit={handleLogin}>
                        <div>
                            <p className="text">Username</p>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <p className="text">Password</p>
                            <input
                                type="password"
                                className="input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <br />
                        <button type="submit" id="btn">
                            LOGIN
                        </button>
                    </form>
                    <br />
                    <div className="line-container">
                        <div className="myLine"></div>
                        <div className="or">OR</div>
                        <div className="myLine"></div>
                    </div>
                    <div className="custom-google-login-button">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginFailure}
                            className="padding"
                            text="continue_with"
                            size="medium"
                            width="250"
                        />
                    </div>
                    <br />
                    <p>
                        Not a user yet? <Link to="/signup">Sign-up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
