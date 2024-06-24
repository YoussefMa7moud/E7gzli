const mongoose = require('mongoose');
const postmessage = mongoose.createConnection('mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/FeedBack?retryWrites=true&w=majority&appName=USER-DATA');

const messageSchema  = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

const Message  = postmessage.model("Message", messageSchema);

module.exports = Message;
