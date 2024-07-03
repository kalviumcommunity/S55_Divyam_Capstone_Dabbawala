import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const clientId = "728172368266-eu9fvflnss2q3hddmufq0jk3g077ocmp.apps.googleusercontent.com";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false); // State to track Google Sign-In
  const navigate = useNavigate();

  const [googleAuth, setGoogleAuth] = useState(null); // State to store Google Auth instance

  useEffect(() => {
    const initGoogleSignIn = () => {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: clientId,
          scope: 'email',
        });
        setGoogleAuth(auth2); // Store Google Auth instance in state
      });
    };

    initGoogleSignIn();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await googleAuth.signIn();
      const profile = googleUser.getBasicProfile();
      const email = profile.getEmail();
      console.log('Logged in with Google:', email);
      setIsGoogleSignIn(true);

      // Simulate a successful signup with Google
      const response = await axios.post(
        "https://s55-divyam-capstone-dabbawala.onrender.com/signup/google",
        { email }
      );
      if (response.status === 200) {
        alert('Google Sign-up successful');
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('username', email);
        navigate("/"); // Redirect directly to home page
      }
    } catch (error) {
      if (error.error === 'popup_closed_by_user') {
        console.log('Google sign-in popup was closed by the user.');
      } else {
        console.error('Google login failed:', error);
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isGoogleSignIn) {
      // Skip form validation if signing up with Google
      return;
    }
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
          alert('Sign-up successful');
          navigate("/login");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Username already exists");
    }
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
                disabled={isGoogleSignIn} // Disable if signing up with Google
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
                disabled={isGoogleSignIn} // Disable if signing up with Google
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
                disabled={isGoogleSignIn} // Disable if signing up with Google
              />
            </div>
            <button type="submit" id="btn" disabled={isGoogleSignIn}>
              SIGN-UP
            </button>
            <button type="button" onClick={handleGoogleLogin}>
              Signup with Google
            </button>
          </form>
          <br />
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
