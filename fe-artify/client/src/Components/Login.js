import React, { useState } from "react";
import '../utils/Assets/CSS/Login.css';
import Header from "../Reusables/Header"
import Footer from "../Reusables/Footer"

import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/services/authServices";

const Login = () => {

  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });


  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    
    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors({
          ...errors,
          email: "Please enter a valid email address.",
        });
      } else {
        setErrors({
          ...errors,
          email: "",
        });
      }
    }

    
    if (name === "password") {
      if (!validatePassword(value)) {
        setErrors({
          ...errors,
          password: "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.",
        });
      } else {
        setErrors({
          ...errors,
          password: "",
        });
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.email || errors.password) {
      setMessage("Please correct the errors before submitting.");
      return;
    }

    try {
      let response = await login(formData);
      setMessage(response?.data || "Hold on !");
      localStorage.setItem("userID", response ?.user?._id);
      navigate('/');
    } catch (e) {
      setMessage(e.response.data.error);
    }
  };

  return (
  

  <div className="main">
    <Header/>
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
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
            <button type="submit">Login</button>
          </form>
          <p className="paragraph">Don't have an account?<Link to='/signup' className="signup-link">Sign Up</Link></p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
