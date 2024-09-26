import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google'; 
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password || !repeatPassword) {
        alert("Please fill in all fields");
      } else if (password !== repeatPassword) {
        alert("Passwords do not match");
      } else if (password.length < 6) {
        alert("Password should contain at least 6 characters");
      } else {
        const response = await axios.post(
          "https://s55-divyam-capstone-dabbawala.onrender.com/signup",
          { username, password }
        );
        if (response.status === 200) {
          navigate("/login");
          alert('Sign-up successful');
        }
      }
    } catch (err) {
      console.error(err);
      alert("Username already exists");
    }
  };

  const handleGoogleSignupSuccess = async (response) => {
    try {

        const decoded = jwtDecode(response.credential);
        console.log('Decoded:', decoded);
        console.log(response)
        
        const data = {
            username: decoded.name,
            googleId: decoded.sub,
            profilePic: decoded.picture,
        };

        const res = await axios.post("https://s55-divyam-capstone-dabbawala.onrender.com/googleAuthSignup", data);

        if (res.status === 200 || res.status === 201) {
            sessionStorage.setItem("login", true);
            sessionStorage.setItem("username", data.username); // Corrected to use data.username
            alert("Sign-up successful");
            navigate("/");
        } else {
            alert("Google sign-up failed. Please try again.");
        }
    } catch (err) {
        console.error("Google Sign-up Error:", err);
        alert("Google sign-up failed. Please try again.");
    }
};


  const handleGoogleSignupFailure = (error) => {
    console.log("Google Sign-up Failed", error);
    alert("Google sign-up failed. Please try again.");
  };

  return (
    <div className="grid">
      <img
        src="https://img.hotimg.com/Dabbawala-Mumbai-3.png"
        alt="bg"
        id="sign-img"
      />
      <div id="sign-page">
        <div className="container">
          <h1 id="heading">SIGN-UP</h1>
          <form onSubmit={handleSignup}>
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
            <div>
              <p className="text">Repeat your password</p>
              <input
                type="password"
                className="input"
                placeholder="Repeat your password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <button type="submit" id="btn">
              SIGN-UP
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
              onSuccess={handleGoogleSignupSuccess}
              onError={handleGoogleSignupFailure}
              text="continue_with"
              size="medium"
              width="250"
            />
          </div>
          <br />
          <p>
            Already a user? <Link to="/login">Login</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
