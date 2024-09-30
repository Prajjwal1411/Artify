const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String }
})

const user = mongoose.model("Users", userModel);

module.exports = { user }