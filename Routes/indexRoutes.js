const express = require('express');
const router = express.Router();
const controller = require('../Controller/indexController');


router.post('/signup', controller.signup);
router.get('/login', (req, res) => res.render('login.ejs'));
router.post('/login', controller.login);
router.get('/index', (req, res) => res.render('index.ejs'));
router.get('/POTM', (req, res) => res.render('potm.ejs'));
router.get('/MyAccount', (req, res) => res.render('MyAccount.ejs'));
router.get('/', (req, res) => res.render('index.ejs'));
router.get('/Browse', controller.browseEvents,(req, res) => res.render('Browse.ejs'));
router.get('/Store', controller.getProfile);
router.get('/BookNow/:id', controller.getEventData);
module.exports = router;
