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

router.get('/',checkAdmin,controller.adminPanel);
router.delete('/delete-event/:id', checkAdmin, controller.deleteEvent);
router.post('/ADD-TICKETS', checkAdmin, controller.addTickets);

module.exports = router;