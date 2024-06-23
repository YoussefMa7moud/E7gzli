const express = require('express');
const router = express.Router();
const Retticketsdata = require('../Controller/BookNowController');


router.get('/BookNow/:id', Retticketsdata.getEventData);

module.exports = router;
router.get('/BookNow/:id', Retticketsdata.getEventData);