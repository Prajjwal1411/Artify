const Route=require("express").Router()
const UserController=require('../controllers/userController')

Route.post("/register",UserController.register);
Route.put("/updateUser/:userId",UserController.updateUser)