const express = require("express");
const { dbConnection } = require("./dbConnection/db");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
const appUrl = process.env.APP_URL;
const appPort = process.env.APP_PORT;

// app middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("Hello From Server!");
});

app.use("/api/auth", userRoutes);

app.listen(appPort, async () => {
  console.log(`App URL : ${appUrl}`);
  await dbConnection();
});