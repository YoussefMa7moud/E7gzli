const express = require('express');
const app = express();
const mongoose = require('mongoose');



app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get('/', (req, res) => {
  res.render('index');
});


app.get('/login', (req, res) => {
    res.render('login.ejs');
  });

  app.get('/index', (req, res) => {
    res.render('index.ejs');
  });

  app.get('/Browse', (req, res) => {
    res.render('browse.ejs');
  });

  app.get('/Store', (req, res) => {
    res.render('store.ejs');
  });

  app.get('/BookNow', (req, res) => {
    res.render('BookNow.ejs');
  });

  app.get('/Admin', (req, res) => {
    res.render('Admin.ejs');
  });

  app.get('/Master', (req, res) => {
    res.render('Master.ejs');
  });


  app.get('/POTM', (req, res) => {
    res.render('potm.ejs');
  });

  app.get('/MyAccount', (req, res) => {
    res.render('MyAccount.ejs');
  });


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


mongoose.connect("mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/USER-DATA?retryWrites=true&w=majority&appName=USER-DATA")
.then(() => {
  console.log('Mongo Connected!');
})
.catch(() => {
  console.log('connection failed');
})

