const TICKETS = require('../MODELS/ADDTickets.js');


exports.adminPanel = async (req, res) => {
  try {
    const events = await TICKETS.find();
    events.forEach(event => {
      event.totalTickets = event.cat1 + event.cat2 + event.cat3;
    });
    res.render('admin.ejs', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventid = req.params.id;
    const deletedEvent = await TICKETS.findByIdAndDelete(eventid);
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting event: ' + error.message });
  }
};



exports.addTickets = async (req, res) => {
  try {
    const newTicket = new TICKETS(req.body);
    await newTicket.save();
    res.status(200).send(res.render('ADDED.ejs'));
  } catch (error) {
    res.status(500).send(error.message);
  }
};
