const express = require('express');
const router = express.Router();
const controller = require('../Controller/indexController');

const checkUser = (req, res, next) => {
    if (req.session.userType === 1) {
      next();
    } else {
      res.status(403).send('Forbidden'); 
    }
  };


router.post('/signup', controller.signup);
router.get('/login', (req, res) => res.render('login.ejs'));
router.post('/login', controller.login);
router.post('/logout',controller.logout);
router.get('/index', (req, res) => res.render('index.ejs'));
router.get('/POTM', checkUser,(req, res) => res.render('potm.ejs'));
router.get('/MyAccount', (req, res) => res.render('MyAccount.ejs'));
router.get('/', (req, res) => res.render('index.ejs'));
  // router.get('/BookNow', (req, res) => res.render('BookNow.ejs'));
router.get('/Browse', controller.browseEvents);
router.get('/Store', controller.getProfile);
router.get('/BookNow/:id',controller.getEventData);
  
router.get('/Store', controller.getProfile);
router.post('/addpicture', controller.AddPICTURE);
router.post('/getpicture', controller.GetPICTURE);

router.get('/BookNow/:id', controller.getEventData);

app.get('/profile', (req, res) => {
  if (req.session.isLoggedIn) {
    res.render('MyAccount', {
      user: req.session.user
    });
  } else {
    res.redirect('/login');
  }
});
module.exports = router;
