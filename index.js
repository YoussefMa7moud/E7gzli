const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

const masterRoutes = require('./Routes/masterRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const indexRoutes = require('./Routes/indexRoutes');
const potmRoutes = require('./Routes/POTMRoutes');
// const voteRoutes = require('./Routes/voteRoutes');


app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/USER-DATA?retryWrites=true&w=majority&appName=USER-DATA",
    collectionName: 'sessions'
  }),
  cookie: { secure: false } 
}));


app.set('view engine', 'ejs');
app.use(express.static('public'));

// app.use('/BookNow',BookNowRoutes);
app.use('/potm',potmRoutes);
app.use('/master', masterRoutes);
app.use('/admin', adminRoutes);
app.use('/', indexRoutes);
// app.use('/vote', voteRoutes);
// app.use('/', storeRoutes);



const port =3002||process.env.PORT;

app.listen(port, () => {
  console.log('Server is running on port 3002 or in Render');
});

mongoose.connect("mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/USER-DATA?retryWrites=true&w=majority&appName=USER-DATA")
  .then(() => {
    console.log('Mongo Connected!');
  })
  .catch(() => {
    console.log('Mongo connection failed');
  });
