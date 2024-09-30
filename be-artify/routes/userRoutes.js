const express = require("express");
const { signUp } = require("../controllers/signUp");
const router = express.Router();
const multer = require("multer");
const { login } = require("../controllers/login");
const upload = multer();

// SignUp API
router.post("/create-user", upload.none(), signUp);

// Login API
router.post("/validate-user", login);

module.exports = router