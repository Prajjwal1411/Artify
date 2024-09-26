const { default: mongoose } = require("mongoose");
const mongoDb = require("mongoose");


const productSchema=new mongoDb.Schema({
    productImage:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startingBid:{
        type:String,
        required:true
    },
    highestBid:{
        type:String,
        required:false
    },
    highestBidUserID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    sellerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    categoryID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    productAddedOn:{
        type:Date,
        default:Date.now()
    }

});


const ProductData=mongoDb.model('Products',productSchema);

module.exports =ProductData;