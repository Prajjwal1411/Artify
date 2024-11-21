const productModel=require('../models/productModel')

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

  
    const product = await productModel
    .findById(productId)
    .populate('sellerID', 'username profilePicture'); 

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    res.status(200).json({
      success: true,
      product: {
        ...product.toObject(), 
        creatorName: product.sellerID?.username || 'Unknown Creator',
        creatorProfilePic: product.sellerID?.profilePic || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the product',
      error: error.message,
    });
  }
};
  

const getHighestBids = async (req, res) => {
    try {
        const products = await productModel.find({}, 'highestBid _id');

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

const saveProducts = async (req, res) => {
  try {
    const {
      productImage,
      productName,
      description,
      startingBid,
      sellerID,
      categoryID,
      email,
    } = req.body;

    // Create a new product instance
    const pObj = new productModel();
    pObj.productImage = productImage;
    pObj.productName = productName;
    pObj.description = description;
    pObj.startingBid = startingBid;
    pObj.sellerID = sellerID;
    pObj.categoryID = categoryID;

    // Save product to the database
    await pObj.save();

    const emailId = process.env.APP_EMAIL_ID;
    const appPassword = process.env.APP_PASSWORD;
    // Configure SMTP Transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: emailId,
        pass: appPassword,
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"Artify" <${emailId}>`,
      to: email,
      subject: "Product Upload Confirmation",
      text: `Hello, your product "${productName}" has been successfully uploaded!`,
      html: `<p>Hello,</p>
             <p>Your product <strong>${productName}</strong> has been successfully uploaded!</p>
             <h5>Product Details</h5>
             <p>Product Name: ${productName}</p>
             <p>Product Image Link: ${productImage}</p>
             <p>Product Starting Bid: ${startingBid}</p>
             <p>Product Description: ${description}</p>
             <p>Thank you for using our service.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send a response back to the client
    res.json({
      status: 200,
      success: true,
      msg: "Data is saved to database successfully and confirmation email sent!",
    });
  } catch (error) {
    res.json({
      status: 500,
      success: false,
      msg: `Error saving product: ${error.message}`,
    });
  }
};

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
    getHighestBids,
    getProductById
};