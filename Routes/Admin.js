const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DATALOG = require("./MODELS/loginDB.js");
const TICKETS= require("./MODELS/ADDTickets.js")
const route=express.Router();
var bodyParser = require('body-parser');
route.post('/ADMIN/ADD-TICKETS', async (req, res) => {
  try {
      const ADDTickets = await TICKETS.create(req.body);
      res.status(200).json(ADDTickets);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.get('/Admin', (req, res) => {
res.render('Admin.ejs');});
module.exports=route;