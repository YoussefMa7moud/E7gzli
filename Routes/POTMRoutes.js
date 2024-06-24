const express = require('express');
const router = express.Router();
const controller = require('../Controller/POTMcontroller');
const controller1 = require('../Controller/indexController');

router.get('/', controller.GETPOTM);
router.post('/login', controller1.login);
module.exports = router;
