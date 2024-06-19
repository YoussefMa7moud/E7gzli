const express = require('express');
const router = express.Router();
const controller = require('../controller/masterController');

router.get('/', controller.getMasters);
router.post('/Creat-Admin', controller.createAdmin);
router.delete('/Delete-Admin/:id', controller.deleteAdmin);

module.exports = router;
