const Route=require("express").Router()
const UserController=require('../controllers/userController')

Route.post("/register",UserController.register);
Route.post("/validate-user", UserController.login);


module.exports = Route;