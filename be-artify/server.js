const express=require("express");
const bodyparser=require("body-parser");

const app=express();
const dbConnection=require("./dbConnection/dbConn");
const cors=require('cors');
const userRoute = require("./routes/userRoutes");
const subscriptionRoute=require("./routes/subscriptionRoutes");
const productRoutes = require("./routes/productRoutes");

const Port=8000;

app.use(cors())
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json({ limit:'500mb'}))

app.use(subscriptionRoute)
app.use(userRoute)
app.use(productRoutes);


app.listen(Port,()=>{
    console.log("App is running on Port 8000 !")
})