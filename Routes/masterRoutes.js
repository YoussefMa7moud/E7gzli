const express = require('express');
const router = express.Router();
const controller = require('../Controller/masterController');

const checkMaster = (req, res, next) => {
  if (req.session.userType === 3) {
    next();
  } else {
    res.status(403).send('Forbidden'); 
  }
};


router.get('/',controller.getMasters);
router.post('/STORE', controller.STORE);
router.post('/Creat-admin', controller.createAdmin);
router.post('/ADD-POTM',controller.ADDPOTM);
router.delete('/delete-event/:id', controller.deleteAdmin);
router.delete('/Delete-Admin/:id', controller.deleteAdmin);
router.post('/Update-Activation', controller.activateuser);

module.exports = router;
