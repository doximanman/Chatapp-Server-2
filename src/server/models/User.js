const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    Username: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    },
    DisplayName: {
        type: String,
        require: true
    },
    Picture: {
        type: Image,
        require: true
    }

});
module.exports = mongoose.model('User', User);
