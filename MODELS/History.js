const mongoose = require('mongoose');
const HistoryDb = mongoose.createConnection('mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/HISTORY?retryWrites=true&w=majority&appName=USER-DATA');
const HistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  cat3Quantity: {
    type: Number,
    required: false,
  },
  cat2Quantity: {
    type: Number,
    required: false,
  },
  cat1Quantity: {
    type: Number,
    required: false,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});
const History= HistoryDb.model("HISTORY", HistorySchema);
module.exports = History;

