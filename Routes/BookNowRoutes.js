const express = require('express');
const router = express.Router();
const Retticketsdata = require('../Controller/BookNowController');

router.get('/get-event-data/:id', Retticketsdata.getEventData);

module.exports = router;
