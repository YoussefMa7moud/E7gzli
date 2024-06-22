const express = require('express');
const router = express.Router();
const storeController = require('../Controller/StoreController');

router.get('/', storeController.getProfile);

module.exports = router;