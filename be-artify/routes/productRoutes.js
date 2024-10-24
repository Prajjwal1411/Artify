const Route=require("express").Router()
const ProductController = require('../controllers/productController'); 


Route.post("/saveProducts", ProductController.saveProducts);

module.exports = Route;
