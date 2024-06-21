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
router.get('/Store', (req, res) => res.render('store.ejs'));
router.get('/BookNow', (req, res) => res.render('BookNow.ejs'));
router.get('/Browse', controller.browseEvents);

module.exports = router;