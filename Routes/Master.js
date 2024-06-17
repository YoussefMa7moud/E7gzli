const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DATALOG = require("./MODELS/loginDB.js");
const TICKETS= require("./MODELS/ADDTickets.js")
const route=express.Router();
var bodyParser = require('body-parser');
route.get('/Master', (req, res) => {
  res.render('Master.ejs');
});
module.exports=route;