const DATALOG = require('../MODELS/loginDB.js');

exports.getMasters = async (req, res) => {
  try {
    const Admins = await DATALOG.find({ type: 2 });
    res.render('Master', { Admins });
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
    const admins = await DATALOG.find({ type: 2 });
    res.render('Master', { Admins: admins });
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
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
