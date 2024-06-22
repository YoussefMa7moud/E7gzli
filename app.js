const express = require('express');
const mongoose = require('mongoose');
const app = express();
const masterRoutes = require('./Routes/masterRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const indexRoutes = require('./Routes/indexRoutes');
const potmRoutes = require('./Routes/POTMRoutes');
const BookNowRoutes=require('./Routes/BookNowRoutes');
const storeRoutes = require('./Routes/StoreRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/BookNow',BookNowRoutes);
app.use('/potm',potmRoutes);
app.use('/master', masterRoutes);
app.use('/admin', adminRoutes);
app.use('/', indexRoutes);
app.use('/', storeRoutes);

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});

mongoose.connect("mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/USER-DATA?retryWrites=true&w=majority&appName=USER-DATA")
  .then(() => {
    console.log('Mongo Connected!');
  })
  .catch(() => {
    console.log('Mongo connection failed');
  });
