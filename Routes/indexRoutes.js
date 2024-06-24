const express = require('express');
const router = express.Router();
const controller = require('../Controller/indexController');


const checkUser = (req, res, next) => {
    if (req.session.isLoggedIn && req.session.userType === 1) {
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
router.get('/MyAccount',(req, res) => res.render('MyAccount.ejs'));
router.get('/FeedBack', controller.getFeedback);
router.get('/', (req, res) => res.render('index.ejs'));
  // router.get('/BookNow', (req, res) => res.render('BookNow.ejs'));
router.get('/Browse', controller.browseEvents, (req, res) => res.render('Browse.ejs'));
router.get('/Store', controller.getProfile);
router.get('/BookNow/:id',checkUser,controller.getEventData);
  
router.get('/Store', controller.getProfile);
router.post('/addpicture', controller.AddPICTURE);
router.post('/getpicture', controller.GetPICTURE);

router.post('/send-message', controller.sendMessage);
module.exports = router;
