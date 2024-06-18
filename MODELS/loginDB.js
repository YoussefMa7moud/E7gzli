const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    Fullname:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    PhoneNumber:{
        type:Number,
        required: true
    },
    DateOfBirth:{
        type: Date,
        required: false
    },
    Gender:{
        type:String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },

    Num: {
        type: Number,
        required: false
    }
});

const collection = mongoose.model("EMAIL-PASSWORD-TYPE", loginSchema);
module.exports = collection;
