const { user } = require("../models/userModel");
const multer = require("multer");
const bcrypt = require("bcrypt");

const upload = multer();
const saltRounds = 10;

async function signUp(req, res) {
  const { userName, email, password, confirmedPassword } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // validating empty fields
  if (!userName || !email || !password || !confirmedPassword) {
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

  // validating the password match
  if (password !== confirmedPassword) {
    return res.status(400).json({
      status: false,
      error: "Passwords do not match.",
    });
  }

  const userEmail = await user.findOne({ email });
  const name = await user.findOne({ userName });

  if(userEmail) {
    return res.status(400).json({
      status: false,
      error: "Email Already Exists, Please Log In.",
    });
  }

  if(name) {
    return res.status(400).json({
      status: false,
      error: "Username already in use. Please try another one.",
    });
  }

  try {
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // saving the user to db when validated
    await user.create({
      userName: userName,
      email: email,
      password: hashedPassword
    });
    console.log("User Created!");

    return res.status(200).json({
      status: true,
      data: "User Created Successfully!",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      status: false,
      error: "Internal Server Error",
      details: e.message,
    });
  }
}

module.exports = { signUp };
