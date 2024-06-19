const express = require('express');
const router = express.Router();
const controller = require('../Controller/masterController');

router.get('/', controller.getMasters);
router.post('/Create-Admin', controller.createAdmin);
router.delete('/Delete-Admin/:id', controller.deleteAdmin);

module.exports = router;
