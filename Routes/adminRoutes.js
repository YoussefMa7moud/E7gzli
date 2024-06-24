const express = require('express');
const router = express.Router();
const controller = require('../Controller/adminController');

const checkAdmin = (req, res, next) => {
  if (req.session.userType === 2) {
    next(); 
  } else {
    res.status(403).send('Forbidden'); 
  }
};
router.post('/logout',controller.logout);
router.get('/',checkAdmin,controller.adminPanel);
router.delete('/delete-event/:id',controller.deleteEvent);
router.post('/ADD-TICKETS', controller.addTickets);

module.exports = router;