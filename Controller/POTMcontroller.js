const ADDPOTM = require('../MODELS/POTM.js');

exports.GETPOTM = async (req, res) => {
  try {
    const potmplayers = await ADDPOTM.find();
    res.render('potm.ejs', { potmplayers });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting the record' });
  }
};
