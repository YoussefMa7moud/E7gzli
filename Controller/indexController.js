const DATALOG = require('../MODELS/loginDB.js');
const TICKETS = require('../MODELS/ADDTickets.js');
const STORE = require('../MODELS/Store.js');

const path = require('path');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
  try {
    if (req.session.userType === 1) {
      const Users = await DATALOG.find({ type: 1 });
      res.render('index', { Users });
    } else if (req.session.userType === 2) {
      const Admins = await DATALOG.find({ type: 2 });
      res.render('admin', { Admins });
    }else if (req.session.userType === 3){
        const masters = await DATALOG.find({ type: 3 });
        res.render('Master', { masters });
      }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.signup = async (req, res) => {
  const { Fullname, email, Password, PhoneNumber, day, month, year, Gender } = req.body;
  const DateOfBirth = new Date(year, month - 1, day);
  try {
  const hashedPassword = await bcrypt.hash(Password, 10);
  const newUser = new DATALOG({
    Fullname,
    email,
    Password: hashedPassword,
    PhoneNumber,
    DateOfBirth,
    Gender,
    type: 1
  });

  
    await newUser.save();
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    res.status(200).send(res.render('USADD.ejs'));
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === "admin" && password === "admin") {
      req.session.isLoggedIn = true;
      req.session.userType = 2; 
      return res.status(200).json({ success: true, type: 2 });
    }
    if (email === "master" && password === "master") {
      req.session.isLoggedIn = true;
      req.session.userType = 3; 
      return res.status(200).json({ success: true, type: 3 });
    }
    if (email === "m" && password === "m") {
      req.session.isLoggedIn = true;
      req.session.userType = 7; 
      return res.status(200).json({ success: true, type: 3 });
    }
    const user = await DATALOG.findOne({ email });

    if (!user || user.Password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user._id,
      Fullname: user.Fullname,
      email: user.email,
      type: user.type 
    };
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


exports.getEventData = async (req, res) => {
  try {
    const ticketId =  req.params.id;
    const event = await TICKETS.findById(ticketId);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const event2 = await TICKETS.find(); 
    res.render('BookNow', { event, event2 }); 
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching event data: ' + error.message });
  }
};


/* Store */
exports.getProfile = async (req, res) => {
  try {
      const team = await STORE.find();
      res.render('Store', { team });
  } catch (error) {
      res.status(500).send('Server error');
  }
};


exports.AddPICTURE = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }

  const imgFile = req.files.img;
  const validExtensions = ['.png', '.jpeg', '.jpg'];
  const fileExtension = path.extname(imgFile.name).toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
      return res.status(400).send('Invalid file type.');
  }

  const fileName = req.body.un + fileExtension;
  const uploadPath = path.join(__dirname, '../public/materials/', fileName);

  imgFile.mv(uploadPath, function (err) {
      if (err) {
          return res.status(500).send(err);
      }

      const pic = new Employees({
          UserName: req.body.un,
          Password: req.body.pw,
          Image: fileName,
          Type: req.body.type
      });

      pic.save()
          .then(() => {
              res.redirect('/master');
          })
          .catch(err => {
              console.log(err);
              res.status(500).send('Error saving employee data.');
          });
  });
};

exports.GetPICTURE = (req, res) => {
  var query = { UserName: req.body.un, Password: req.body.pw };
  STORE.findOne(query)
      .then(result => {
          if (!result) {
              return res.status(404).send('User not found.');
          }
          req.session.user = result;
          res.redirect('/master');
      })
      .catch(err => {
          console.log(err);
          res.status(500).send('Error retrieving user data.');
      });
};
