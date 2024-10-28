const Route=require("express").Router()
const { getHighestBids } = require('../controllers/productController'); 


Route.get("/highest-bid", getHighestBids);

module.exports = Route;
