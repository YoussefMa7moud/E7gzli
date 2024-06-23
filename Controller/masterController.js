const DATALOG = require('../MODELS/loginDB.js');
const ADDPOTM = require('../MODELS/POTM.js')
const STORE=require('../MODELS/Store.js');
const bcrypt = require('bcryptjs');

exports.getMasters = async (req, res) => {
  try {
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    res.render('Master', { Users, Admins });
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
    const admins = await DATALOG.find({ type: 2 });
    if (!admins || admins.Password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
    }
    res.status(200).json({ success: true, type: admins.type });
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
    const existingRecord = await DATALOG.findOne({ _id });

    if (existingRecord) {
      const updateResult = await DATALOG.updateOne({ _id }, { $set: { Activated: 1 } });

      if (updateResult.ok === 1) {
        return res.status(200).json({ success: true, message: 'Record updated successfully' });
      } else {
        return res.status(500).json({ success: false, error: 'Failed to update record' });
      }
    } else {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }
  } catch (error) {
    console.error('Error updating record:', error);
    return res.status(500).json({ success: false, error: 'An error occurred while saving the record' });
  }
};



