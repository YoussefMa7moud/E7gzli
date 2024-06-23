const Event = require('../MODELS/ADDTickets.js');

exports.getEventData = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const event = await Event.findById(ticketId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.render('BookNow', { event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching event data: ' + error.message });
  }
};

