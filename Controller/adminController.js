const TICKETS = require('../MODELS/ADDTickets.js');


exports.adminPanel = async (req, res) => {
  try {
    const events = await TICKETS.find();
    events.forEach(event => {
      event.totalTickets = event.cat1 + event.cat2 + event.cat3;
    });
    res.render('Admin.ejs', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await TICKETS.findByIdAndDelete(req.params.id);
    res.json({ success: true });
    }
     catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admins = await DATALOG.find({ type: 2 });
    if (!admins || admins.Password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }
    req.session.userType = 2; 
    res.status(200).json({ success: true, type: admins.type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
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
