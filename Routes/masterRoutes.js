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
router.post('/STORE', checkMaster, controller.STORE);
router.post('/create-admin', checkMaster, controller.createAdmin);
router.post('/ADDPOTM', checkMaster, controller.ADDPOTM);
router.delete('/delete-admin/:id', checkMaster, controller.deleteAdmin);
router.post('/Update-Activation', controller.activateuser);

module.exports = router;
