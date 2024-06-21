const mongoose = require('mongoose');
const ticketsDb = mongoose.createConnection('mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/POTM?retryWrites=true&w=majority&appName=USER-DATA');

const POTMSCHEMA = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    }
    ,
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    goals: {
        type: Number,
        required: true
    },
    assists: {
        type: Number,
        required: true
    },
    cleansheets: {
        type: Number,
        required: true
    },
    nomineeNO: {
        type: Number,
        required: true
    },
    votes:{
        type: Number,
        required:true
    }
    
});

const POTMNOM = ticketsDb.model("POTM-INFO", POTMSCHEMA);
module.exports = POTMNOM;

