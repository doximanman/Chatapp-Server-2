const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Message = new Schema({
    id: {
        type: Int32
    },
    users: {
        type: Array
    },
    messages: {
        type: Array
    }
});

module.exports = mongoose.model('Chats', Chats);