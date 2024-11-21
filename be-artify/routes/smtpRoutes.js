const Route=require("express").Router()
const SMTPController = require('../smtpCalls/bidWinnerMail'); 


Route.post("/winnerMail", SMTPController.sendMail);

module.exports = Route;
