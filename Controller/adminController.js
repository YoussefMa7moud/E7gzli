const TICKETS = require('../MODELS/ADDTickets.js');
const DATALOG = require('../MODELS/loginDB.js');

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
    const admins = await DATALOG.find({ email: email, type: 2 });

    if (admins.Password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }

    // const isPasswordValid = await bcrypt.compare(password, admin.Password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    // }

    req.session.isLoggedIn = true;
    req.session.type = 2; 
    req.session.admins = {
      id: admin._id,
      email: admin.email,
      type: admin.type
    };

    res.status(200).json({ success: true, type: admin.type });
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
      res.render('index');
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