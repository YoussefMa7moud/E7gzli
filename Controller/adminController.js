const TICKETS = require('../MODELS/ADDTickets.js');


exports.adminPanel = async (req, res) => {
  try {
    if (req.session.isLoggedIn && req.session.userType === 2) {
      const events = await TICKETS.find();
      events.forEach(event => {
        event.totalTickets = event.cat1 + event.cat2 + event.cat3;
      });
      res.render('Admin.ejs', { events });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    if (req.session.isLoggedIn && req.session.userType === 2) {
      await TICKETS.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

exports.logout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ success: false, message: 'Failed to logout' });
      }
      res.clearCookie('session-id'); 
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ success: false, message: 'Server error during logout' });
  }
};


exports.addTickets = async (req, res) => {
  try {
    if (req.session.isLoggedIn && req.session.userType === 2) {
      const newTicket = new TICKETS(req.body);
      await newTicket.save();
      res.status(200).render('ADDED.ejs');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};