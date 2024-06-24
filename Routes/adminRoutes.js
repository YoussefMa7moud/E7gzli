const express = require('express');
const router = express.Router();
const controller = require('../Controller/adminController');



router.use(async(req, res, next) => {
  console.log('Session:', req.session);
  if (req.session.isLoggedIn && req.session.type === 2) {
    next();
  } else {
    res.status(403).send('Forbidden'); 
  }
});


router.get('/',controller.adminPanel);
// router.post('/logout',controller.logout);
router.delete('/delete-event/:id',controller.deleteEvent);
router.post('/ADD-TICKETS', controller.addTickets);
router.post('/addpicture', controller.AddPICTURE);
router.post('/getpicture', controller.GetPICTURE);

module.exports = router;