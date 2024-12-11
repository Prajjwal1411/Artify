import React, { useState } from "react";
import "../utils/Assets/CSS/SignUp.css";
import Header from "../Reusables/Header";
import Footer from "../Reusables/Footer";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Password validation function (minLength, one uppercase, one number, one special character)
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  // Handle change and real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation for email
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

    // Real-time validation for password
    if (name === "password") {
      if (!validatePassword(value)) {
        setErrors({
          ...errors,
          password: "Password must be at least 8 characters, contain one uppercase letter, one number, and one special character.",
        });
      } else {
        setErrors({
          ...errors,
          password: "",
        });
      }
    }

    // Real-time validation for confirmedPassword
    if (name === "confirmedPassword") {
      if (value !== formData.password) {
        setErrors({
          ...errors,
          confirmedPassword: "Passwords do not match.",
        });
      } else {
        setErrors({
          ...errors,
          confirmedPassword: "",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit only if no errors
    if (errors.email || errors.password || errors.confirmedPassword) {
      setMessage("Please correct the errors before submitting.");
      return;
    }

    if (formData.password === formData.confirmedPassword) {
      navigate("/subscription", { state: formData });
    } else {
      setMessage("Passwords do not match!");
    }

    // Clear form data
    setFormData({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmedPassword: "",
    });
  };

  return (
    <div className="main">
    <Header/>
      <div className="container">
        <div className="image"></div>
        <div className="form-container">
          <h2>Create Account</h2>
          <p>
            Welcome! Enter Your Details And Start
            <br /> Creating, Collecting And Bidding Artwork.
          </p>
          {message && (
            <p
              style={{
                color: message.includes("Successfully") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit}> 
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
             <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
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
              minLength="8"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <input
              type="password"
              name="confirmedPassword"
              placeholder="Confirm Password"
              value={formData.confirmedPassword}
              onChange={handleChange}
              required
              minLength="8"
            />
            {errors.confirmedPassword && <p className="error-text">{errors.confirmedPassword}</p>}

            <button type="submit">Create account</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SignUp;
