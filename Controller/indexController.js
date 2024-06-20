const DATALOG = require('../MODELS/loginDB.js');
const TICKETS = require('../MODELS/ADDTickets.js');
exports.getUser = async (req, res) => {
  try {
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    res.render('Master', { Users, Admins });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
exports.signup = async (req, res) => {
  const { Fullname, email, Password, PhoneNumber, day, month, year, Gender } = req.body;
  const DateOfBirth = new Date(year, month - 1, day);

  const newUser = new DATALOG({
    Fullname,
    email,
    Password,
    PhoneNumber,
    DateOfBirth,
    Gender,
    type: 1
  });

  try {
    await newUser.save();
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    res.render('Master', { Users, Admins });
    res.status(200).send(res.render('USADD.ejs'));
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === "admin" && password === "admin") {
      return res.status(200).json({ success: true, type: 2 });
    }

    if (email === "master" && password === "master") {
      return res.status(200).json({ success: true, type: 3 });
    }

    const user = await DATALOG.findOne({ email });

    if (!user || user.Password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }
    res.status(200).json({ success: true, type: user.type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.browseEvents = async (req, res) => {
  try {
    const events = await TICKETS.find();
    events.forEach(event => {
      event.totalTickets = event.cat1 + event.cat2 + event.cat3;
    });
    res.render('browse.ejs', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
