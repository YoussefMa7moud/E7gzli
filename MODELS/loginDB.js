const mongoose = require('mongoose');
const { type } = require('os');

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
    },
    Activated:{
        type:Number,
        required:false,
        default:0
    },
    cardHolderName:{
        type:String,
        required:false,
    },
    cardNumber:{
        type: String,
        required:false,
    },
    cvv:{
        type:String,
        required:false,
    }
});

const collection = mongoose.model("EMAIL-PASSWORD-TYPE", loginSchema);
module.exports = collection;
