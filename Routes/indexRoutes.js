const express = require('express');
const router = express.Router();
const controller = require('../Controller/indexController');
const bodyParser = require('body-parser');

router.post('/signup', controller.signup);
router.get('/login', (req, res) => res.render('login.ejs'));
router.post('/login', controller.login);
router.post('/logout',controller.logout);
router.get('/index', (req, res) => res.render('index.ejs'));
router.get('/POTM',(req, res) => res.render('potm.ejs'));
router.get('/MyAccount',(req, res) => res.render('MyAccount.ejs'));
router.get('/FeedBack', controller.getFeedback);
router.delete('/FeedBack/Delete-Message/:id', controller.deletemessage);
router.get('/', (req, res) => res.render('index.ejs'));
  // router.get('/BookNow', (req, res) => res.render('BookNow.ejs'));
router.get('/Browse', controller.browseEvents, (req, res) => res.render('Browse.ejs'));
router.get('/Store', controller.getProfile);
router.get('/BookNow/:id',controller.getEventData);
router.post('/BuyTicket/:id', controller.buyticket);
  
router.get('/Store', controller.getProfile);
router.post('/addpicture', controller.AddPICTURE);
router.post('/getpicture', controller.GetPICTURE);

router.post('/send-message', controller.sendMessage);
module.exports = router;
