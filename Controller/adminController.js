const TICKETS = require('../MODELS/ADDTickets.js');
const DATALOG = require('../MODELS/loginDB.js');

exports.adminPanel = async (req, res) => {
  try {
    if (req.session.isLoggedIn && req.session.type === 2) {
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
    if (req.session.isLoggedIn && req.session.type === 2) {
      await TICKETS.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.addTickets = async (req, res) => {
  try {
    if (req.session.isLoggedIn && req.session.type === 2) {
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