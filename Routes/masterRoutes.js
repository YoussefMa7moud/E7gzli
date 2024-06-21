const express = require('express');
const router = express.Router();
const controller = require('../Controller/masterController');

router.get('/', controller.getMasters);
router.post('/Creat-Admin', controller.createAdmin);
router.post('/ADD-POTM', controller.ADDPOTM);
router.delete('/Delete-Admin/:id', controller.deleteAdmin);

module.exports = router;
