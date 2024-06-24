const express = require('express');
const router = express.Router();
const controller = require('../Controller/adminController');

const checkAdmin = (req, res, next) => {
  if (req.session.isLoggedIn && req.session.userType === 2) {
    next(); 
  } else {
    res.status(403).send('Forbidden'); 
  }
};

router.post('/login',controller.login);
router.get('/',checkAdmin,controller.adminPanel);
router.post('/logout',controller.logout);
router.delete('/delete-event/:id',controller.deleteEvent);
router.post('/ADD-TICKETS', controller.addTickets);
router.post('/addpicture', controller.AddPICTURE);
router.post('/getpicture', controller.GetPICTURE);

module.exports = router;