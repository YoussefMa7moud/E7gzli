const express = require('express');
const router = express.Router();
const Retticketsdata = require('../Controller/BookNowController');

router.post('/buy-tickets', Retticketsdata.buyticket);

module.exports = router;
