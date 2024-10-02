import React, { useState } from "react";
import axios from "axios";
import './Login.css';
import Header from "../../Reusables/Header"
import Footer from "../../Reusables/Footer"

import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/validate-user", formData);
      if (response.data) {
        setMessage(response.data.data);
      }
    } catch (e) {
      setMessage(e.response.data.error);
    }
  };

  return (
  <>
  <Header/>

  <div className="main">
      <div className="container">
        <div className="image2"></div>
        <div className="form-container">
          <h2>Welcome Back Traveller</h2>
          <p>Welcome Back! Enter Your Details And Login To Your Account.</p>
          {message && (
            <p className={message === "Logged In!" ? "success" : "error"}>
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
            <button type="submit">Login</button>
          </form>
          <p className="paragraph">Don't have an account?<Link to='/signup' className="signup-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  <Footer/>
  </>
  );
};

export default Login;
