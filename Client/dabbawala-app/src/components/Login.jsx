import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            if (!username || !password) {
                if (!username) {
                    alert('Please enter your username');
                }
                if (!password) {
                    alert('Please enter your password');
                }
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
            console.error(err);
        }
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
                    <br />
                    <p>
                        Not a user yet? <Link to="/signup">Sign-up</Link>{' '}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
