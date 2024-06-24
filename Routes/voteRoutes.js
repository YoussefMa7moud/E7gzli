const express = require('express');
const router = express.Router();
const voteController = require('../Controller/voteController');

router.post('/', voteController.votePlayer);

module.exports = router;
