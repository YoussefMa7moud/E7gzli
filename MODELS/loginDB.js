const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
});

const collection = mongoose.model("EMAIL-PASSWORD-TYPE", loginSchema);
module.exports = collection;
