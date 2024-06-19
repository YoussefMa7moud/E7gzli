const express = require('express');
const router = express.Router();
const controller = require('../Controller/adminController');

router.get('/', controller.adminPanel);
router.delete('/delete-event/:id', controller.deleteEvent);
router.post('/ADD-TICKETS', controller.addTickets);

module.exports = router;
