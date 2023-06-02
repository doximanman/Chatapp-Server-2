const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserPass = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('UserPass', UserPass);