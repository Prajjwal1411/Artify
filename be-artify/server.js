const express=require("express");
const bodyparser=require("body-parser");

const app=express();
const dbConnection=require("./dbConnection/dbConn");
const cors=require('cors');
const Route = require("./routes/userRoutes");
const Port=8000;

app.use(cors())
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json({ limit:'500mb'}))

app.use(Route)


app.listen(Port,()=>{
    console.log("App is running on Port 8000 !")
})