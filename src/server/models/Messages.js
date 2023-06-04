const mongoose = require('mongoose');
const User = require("./Users")

const Schema = mongoose.Schema;

const Messages = new Schema({
    id: {
        type: Int32
    },
    created: {
        type: String
    },
    sender: {
        type: User
    },
    content: {
        type: String
    }
});

module.exports = mongoose.model('Messages', Messages);