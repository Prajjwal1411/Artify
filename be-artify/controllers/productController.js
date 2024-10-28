const ProductData = require("../models/productModel");

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

module.exports = {
    getHighestBids
};
