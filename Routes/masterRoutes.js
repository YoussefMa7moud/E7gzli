const express = require('express');
const router = express.Router();
const controller = require('../Controller/masterController');

router.use(async(req, res, next) => {
  console.log('Session:', req.session);
  if (req.session.isLoggedIn && req.session.type === 3) {
    next();
  } else {
    res.status(403).send('Forbidden'); 
  }
});


router.get('/',controller.getMasters);
router.post('/STORE', controller.STORE);
router.post('/Creat-admin', controller.createAdmin);
router.post('/ADD-POTM',controller.ADDPOTM);
router.delete('/delete-event/:id', controller.deleteAdmin);
router.delete('/Delete-Admin/:id', controller.deleteAdmin);
router.delete('/Delete-product/:id', controller.deleteproduct);
router.post('/Update-Activation', controller.activateuser);
router.post('/logout',controller.logout);
router.post('/addpicture', controller.AddPICTURE);
router.post('/getpicture', controller.GetPICTURE);


module.exports = router;
