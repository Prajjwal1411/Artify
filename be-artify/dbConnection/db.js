const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnection() {
    const connectionUrl = process.env.MONGODB_CONNECTION_URL;

    try {
        await mongoose.connect(connectionUrl);
        console.log("Database Connected!");
    } catch(e) {
        console.error(e);
    }
}

module.exports = { dbConnection }