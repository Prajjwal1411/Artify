const productModel=require('../models/productModel')

const getHighestBids = async (req, res) => {
    try {
        const products = await ProductData.find({}, 'highestBid _id');

        const productBids = products.map(product => ({
            productId: product._id,
            highestBid: product.highestBid || 'No bids yet'
        }));

        res.status(200).json({
            success: true,
            data: productBids
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products",
            error: error.message
        });
    }
};

const saveProducts = (req, res) => {

    try{
    const { productImage, productName, description, startingBid, sellerID, categoryID } = req.body;
    const pObj = new productModel();
      pObj.productImage = productImage;
      pObj.productName = productName;
      pObj.description = description;
      pObj.startingBid = startingBid;
      pObj.sellerID = sellerID;
      pObj.categoryID =categoryID;

      pObj.save().then(() => {
        res.json({
          status: 200,
          success: true,
          msg: "Data is saved to database successfully",
        });
      });
    }
    catch (error){
        res.json({
            status: 500,
            success: false,
            msg: "Error saving producy"+ error,
          });

    }
}

const getProducts = (req,res) =>{

  productModel.find()
  .then(Products => {
      res.json({
          status: 200,
          success: true,
          data: Products
      });
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({
          status: 500,
          success: false,
          msg: "Internal server error"
      });
  });
}

module.exports = {
    saveProducts,
    getProducts,
    getHighestBids
};