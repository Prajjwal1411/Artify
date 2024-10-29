const productModel=require('../models/productModel')

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
};

module.exports = {
    saveProducts
};