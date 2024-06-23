const DATALOG = require('../MODELS/loginDB.js');

exports.buyticket = async (req, res) => {
  const { cardHolderName, cardNumber, cvv } = req.body;

  try {

    const { _id } = req.body;
    const existingRecord = await DATALOG.findOne({ _id });

    if (existingRecord) {
      await DATALOG.updateOne({ _id }, {
        $set: {
          cardHolderName,
          cardNumber,
          cvv
        },
      });
    } else {
      const newTicket = new DATALOG({
        cardHolderName,
        cardNumber,
        cvv
      });
      await newTicket.save();
    }

    const tick = await DATALOG.find();
    res.render('CONFIRMPURCHES', { tick });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the record' });
  }
};
