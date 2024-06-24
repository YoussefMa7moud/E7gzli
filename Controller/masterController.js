const { render } = require('ejs');
const DATALOG = require('../MODELS/loginDB.js');
const ADDPOTM = require('../MODELS/POTM.js')
const STORE=require('../MODELS/Store.js');
const bcrypt = require('bcryptjs');
const path = require('path');

exports.getMasters = async (req, res) => {
  try {
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    const Master = await DATALOG.find({ type: 3 });
    const Product = await STORE.find(); 
    res.render('Master', { Users, Admins, Master, Product }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.createAdmin = async (req, res) => {
  const { Fullname, Password, email, PhoneNumber, Gender, Num } = req.body;
  try {
  const hashedPassword = await bcrypt.hash(Password, 10);
  const newAdmin = new DATALOG({
    Fullname,
    Password: hashedPassword,
    email,
    PhoneNumber,
    Gender,
    type: 2,
    Num
  });

 
    await newAdmin.save();
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    res.render('Master', { Users, Admins });
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const master = await DATALOG.find({ type: 3 });
    if (!master || admins.Password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }
    req.session.userType = 3; 
    res.status(200).json({ success: true, type: admins.type });
    res.status(200).json({ success: true, type: master.type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    await DATALOG.findByIdAndDelete(adminId);
    res.json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting admin: ' + error.message });
  }
};






exports.STORE = async (req, res) => {
  const {bannerColor, teamImage, teamName, teamUsername, historyTitle, historyDescription, productImage, productName, productPrice } = req.body;
  const newProduct = new STORE({
    bannerColor,
    teamImage,
    teamName,
    teamUsername,
    historyDescription,
    productImage,
    productName,
    productPrice
  });

  try {
    await newProduct.save(); 
    const Product = await STORE.find();
    const potmplayers = await ADDPOTM.find();
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    res.render('Master', { Users,Admins,potmplayers,Product }); 
  } catch (error) {
    res.status(400).send('Error adding Product: ' + error.message);
  }
};

exports.ADDPOTM = async (req, res) => {
  const { image, name, club, description, age, nationality, goals, assists, cleansheets, nomineeNO } = req.body;

  try {
    const existingRecord = await ADDPOTM.findOne({ nomineeNO });

    if (existingRecord) {
      await ADDPOTM.updateOne({ nomineeNO }, {
        $set: {
          image,
          name,
          club,
          description,
          age,
          nationality,
          goals,
          assists,
          cleansheets,
          votes:0,
        },
      });
    } else {
      const newpotm = new ADDPOTM({
        image,
        name,
        club,
        description,
        age,
        nationality,
        goals,
        assists,
        cleansheets,
        nomineeNO,
        votes:0,
      });
      await newpotm.save();
    }

    const potmplayers = await ADDPOTM.find();
    const Product = await STORE.find();
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    res.render('Master', { Users, Admins, Product, potmplayers }); 
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the record' });
  }
};





exports.activateuser = async (req, res) => {
  const { _id } = req.body;

  try {
    const updatedUser = await DATALOG.findByIdAndUpdate(_id, { Activated: 1 }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }
    const Users = await DATALOG.find();
    const Admins = await DATALOG.find({ type: 2 });
    const activatedUsers = Users.filter(user => user.Activated === 1);
    const pendingUsers = Users.filter(user => user.Activated === 0);

    res.render('Master', { Users: activatedUsers, Admins });

  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ success: false, error: 'An error occurred while updating the record' });
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
  DATALOG.find(query)
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
