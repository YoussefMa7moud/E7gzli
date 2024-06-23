const express = require('express');
const router = express.Router();
const controller = require('../Controller/indexController');

router.get('/',controller.browseEvents);

module.exports = router;