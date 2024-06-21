const mongoose = require('mongoose');
const storeDb = mongoose.createConnection('mongodb+srv://youssef2207740:Pi1p2TXCiVVEIT39@user-data.blnfrn5.mongodb.net/Products?retryWrites=true&w=majority&appName=USER-DATA');
const storeSchema = new mongoose.Schema({
    bannerColor: {
        type: String,
        required: true
    },
    teamImage: {
        type: String,
        required: false
    },
    teamName: {
        type: String,
        required: true
    },
    teamUsername: {
        type: String,
        required: true
    },
    historyDescription: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: false
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    }

});
const STORE = storeDb.model("Products", storeSchema);
module.exports =STORE;