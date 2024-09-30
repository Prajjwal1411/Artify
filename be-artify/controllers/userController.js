const UserModel=require("../models/userModel");
const bcrypt=require('bcrypt');
const number=10
const jwt=require('jsonwebtoken');
const secretKey='token';

const register=(req,res)=>{


    UserModel.findOne({email: req.body.email})
        .then(userData=>{
            if(userData==null){

                const uObj=new UserModel();
                uObj.firstName=req.body.firstName;
                uObj.lastName=req.body.lastName;
                uObj.password=bcrypt.hashSync(req.body.password,number);
                uObj.email=req.body.email;
                uObj.subscriptionID=req.body.subscriptionID;
                uObj.subscriptionEndDate=req.body.subscriptionEndDate;
                uObj.subscriptionStartDate=req.body.subscriptionStartDate;
                uObj.profilePicture=req.body.profilePicture || "";
                uObj.coverPicture=req.body.coverPicture || "";



                uObj.save().then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        msg:"Data is saved to database successfully"
                    })
                })


            }else{
                res.json({
                    status:400,
                    success:false,
                    msg:"User already exists"
                })
            }
        })
}
module.exports={
    register,
}
