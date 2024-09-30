import React, { useState } from "react";
import axios from "axios";
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
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
      const response = await axios.post(
        "http://localhost:8000/api/auth/create-user",
        formData
      );
      if (response.data) {
        setMessage(response.data.data);
        setFormData({
          userName: "",
          email: "",
          password: "",
          confirmedPassword: "",
        });
      }
    } catch (e) {
      setMessage(e.response.data.error);
    }
  };

  return (
    <div className="main">
    <div className="container">
      <div className="image"></div>
      <div className="form-container">
        <h2>Create Account</h2>
        <p>Welcome! Enter Your Details And Start<br/> Creating, Collecting And Bidding Artwork.</p>
        {message && (
          <p style={{ color: message.includes("Successfully") ? "green" : "red" }}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
          <input
            type="password"
            name="confirmedPassword"
            placeholder="Confirm Password"
            value={formData.confirmedPassword}
            onChange={handleChange}
            required
            minLength="8"
          />
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
