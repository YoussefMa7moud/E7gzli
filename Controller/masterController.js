const DATALOG = require('../MODELS/loginDB.js');
const ADDPOTM = require('../MODELS/POTM.js')


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

  const newAdmin = new DATALOG({
    Fullname,
    Password,
    email,
    PhoneNumber,
    Gender,
    type: 2,
    Num
  });

  try {
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






exports.ADDPOTM = async (req, res) => {
  const {image, name, club, description, age, nationality, goals, assists, cleansheets, nomineeNO } = req.body;
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
  });

  try {
    await newpotm.save(); 
    const potmplayers = await ADDPOTM.find();
    const Users = await DATALOG.find({ type: 1 });
    const Admins = await DATALOG.find({ type: 2 });
    res.render('Master', { Users,Admins,potmplayers }); 
  } catch (error) {
    res.status(400).send('Error adding player: ' + error.message);
  }
};
