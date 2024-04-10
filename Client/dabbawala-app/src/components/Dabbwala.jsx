import React from "react";
import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios'
function Dabbwala() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!firstname || !lastname || !email || !password || !pin || !phone) {
        alert("Please fill in all fields");
      } else if (password.length < 6) {
        alert("Password should contain at least 6 characters");
      } else if (phone.length < 10) {
        alert("Enter a valid phone number");
      } else {
        const response = await axios.post(
          "https://s55-divyam-capstone-dabbawala.onrender.com/provsign",
          { firstname, lastname, email, password, pin, phone }
        );
        if (response.status === 200) {
          navigate("/");
          alert("sign-up successfull");
        }
      }
    } catch (err) {
      console.error(err);
      alert("username already exists");
    }
  };

  return (
    <>
      <div className="translucent3"></div>
      <div className="dab-cont">
        <div className="form-cont">
          <h1 className="slogan">Earn a living following your heart</h1>
          <form action="" className="reg-form" onSubmit={handleSignup}>
            <input
              type="text"
              className="reg"
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              className="reg"
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="email"
              className="reg"
              placeholder=" Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="reg"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              className="reg"
              pattern="[0-9]{6}"
              placeholder="Pin-code"
              onChange={(e) => setPin(e.target.value)}
            />
            <input
              type="tel"
              className="reg"
              pattern="[1-9]{1}[0-9]{9}"
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button id="sub" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Dabbwala;
