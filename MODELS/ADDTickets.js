const mongoose = require('mongoose');
const ticketsDb = mongoose.createConnection('mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/TICKETS-INFO?retryWrites=true&w=majority&appName=USER-DATA');

const TICKETSSCHEMA = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
    ,
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    cat1: {
        type: Number,
        required: true
    },
    cat1price: {
        type: Number,
        required: true
    },
    cat2: {
        type: Number,
        required: true
    },
    cat2price: {
        type: Number,
        required: true
    },
    cat3: {
        type: Number,
        required: true
    },
    cat3price: {
        type: Number,
        required: true
    },
    
});

const AVAILABLETICKETS = ticketsDb.model("TICKETS-INFO", TICKETSSCHEMA);
module.exports = AVAILABLETICKETS;

