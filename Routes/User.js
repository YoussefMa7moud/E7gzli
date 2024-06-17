const express = require('express');
const app = express();
const mongoose = require('mongoose');
const DATALOG = require("./MODELS/loginDB.js");
const TICKETS= require("./MODELS/ADDTickets.js")
const route=express.Router();
var bodyParser = require('body-parser');
route.get('/', (req, res) => {
  res.render('index');
});

route.get('/login', (req, res) => {
    res.render('login.ejs');
  });

route.post('/login/addData', async (req, res) => {
    try {
        const loginDB = await DATALOG.create(req.body);
        res.status(200).json(loginDB);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

route.get('/index', (req, res) => {
    res.render('index.ejs');
  });

route.get('/Browse', (req, res) => {
    res.render('browse.ejs');
  });

route.get('/Store', (req, res) => {
    res.render('store.ejs');
  });

route.get('/BookNow', (req, res) => {
    res.render('BookNow.ejs');
  });
route.get('/POTM', (req, res) => {
    res.render('potm.ejs');
  });

route.get('/MyAccount', (req, res) => {
    res.render('MyAccount.ejs');
  });
  module.exports=route;