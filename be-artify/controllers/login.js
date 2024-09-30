const { user } = require("../models/userModel");
const bcrypt = require("bcrypt");

async function login(req, res) {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // validating empty fields
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      error: "All fields are required.",
    });
  }

  // validating email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: false,
      error: "Invalid email address.",
    });
  }

  // validating password length
  if (password.length !== 8) {
    return res.status(400).json({
      status: false,
      error: "Password must be exactly 8 characters long.",
    });
  }

  const userEmail = await user.findOne({ email });
  if (userEmail) {
    try {
      const validatePassword = await bcrypt.compare(
        password,
        userEmail.password
      );
      if (!validatePassword) {
        return res.status(400).json({
          status: false,
          error: "Incorrect Password entered for the Email ID Provided.",
        });
      } else {
        console.log("User Authenticated!");
        return res.status(200).json({
          status: true,
          data: "Logged In!",
        });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        status: false,
        error: "Internal Server Error",
        details: e.message,
      });
    }
  } else {
    return res.status(400).json({
        status: false,
        error: "Email ID is not found!",
      });
  }
}

module.exports = { login }
