const Route=require("express").Router()
const CategoryController = require('../controllers/categoryController'); 


Route.get("/getCategories", CategoryController.getCategory);
Route.post("/saveCategories", CategoryController.saveCategory);

module.exports = Route;