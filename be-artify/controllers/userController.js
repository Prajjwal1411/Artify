const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const number = 10;
const secretKey = "token";

const register = (req, res) => {
  UserModel.findOne({ email: req.body.email }).then((userData) => {
    if (userData == null) {
      const uObj = new UserModel();
      uObj.firstName = req.body.firstName;
      uObj.lastName = req.body.lastName;
      uObj.password = bcrypt.hashSync(req.body.password, number);
      uObj.email = req.body.email;
      uObj.subscriptionID = req.body.subscriptionID;
      uObj.subscriptionEndDate = req.body.subscriptionEndDate;
      uObj.subscriptionStartDate = req.body.subscriptionStartDate;
      uObj.profilePicture = req.body.profilePicture || "";
      uObj.coverPicture = req.body.coverPicture || "";

      uObj.save().then(() => {
        res.json({
          status: 200,
          success: true,
          msg: "Data is saved to database successfully",
        });
      });
    } else {
      res.json({
        status: 400,
        success: false,
        msg: "User already exists",
      });
    }
  });
};

async function login(req, res) {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validating empty fields
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      error: "All fields are required.",
    });
  }

  // Validating email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: false,
      error: "Invalid email address.",
    });
  }

  // Validating password length
  if (password.length !== 8) {
    return res.status(400).json({
      status: false,
      error: "Password must be exactly 8 characters long.",
    });
  }

  const userEmail = await UserModel.findOne({ email });
  if (userEmail) {
    try {
      const validatePassword = await bcrypt.compare(password, userEmail.password);
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

module.exports = {
  register,
  login,
};
