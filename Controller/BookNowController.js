// const DATALOG = require('../MODELS/loginDB.js');

// exports.buyticket= async(req, res)=> {
//     const { cardHolderName, cardNumber, cvv } = req.body;

//     try {
//         let userData = await DATALOG.getUserByCardDetails(cardHolderName, cardNumber, cvv);

//         if (userData) {
//             await DATALOG.updateUserData(userData.id, { cardHolderName, cardNumber, cvv });
//             res.status(200).json({ message: 'User data updated successfully.' });
//         } else {
//             userData = await DATALOG.addUserData({ cardHolderName, cardNumber, cvv });
//             res.status(201).json({ message: 'User data added successfully.', userData });
//         }
//     } catch (err) {
//         console.error('Error processing request:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

