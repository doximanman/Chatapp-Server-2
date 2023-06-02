const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserPassName = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    displayName: {
        type: String
    },
    profilePic: {
        type: String
    }
});

module.exports = mongoose.model('UserPassName', UserPassName);