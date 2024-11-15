const Route=require("express").Router()
const ProductController = require('../controllers/productController'); 


Route.post("/saveProducts", ProductController.saveProducts);
Route.post("/getProducts", ProductController.getProducts);
Route.get("/highest-bid", ProductController.getHighestBids);
Route.get("/api/products/:id", ProductController.getProductById);

module.exports = Route;
