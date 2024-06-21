const express = require('express');
const router = express.Router();
const controller = require('../Controller/POTMcontroller');
router.get('/', controller.GETPOTM);
module.exports = router;
