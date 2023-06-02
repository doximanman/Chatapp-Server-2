const mongoose = require('mongoose');
const User = require("./User")

const Schema = mongoose.Schema;

const Message = new Schema({
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

module.exports = mongoose.model('Message', Message);