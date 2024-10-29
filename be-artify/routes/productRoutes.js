const Route=require("express").Router()
const ProductController = require('../controllers/productController'); 


Route.post("/saveProducts", ProductController.saveProducts);
Route.post("/getProducts", ProductController.getProducts);
Route.get("/highest-bid", ProductController.getHighestBids);

module.exports = Route;
