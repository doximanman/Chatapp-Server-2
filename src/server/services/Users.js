const User = require('../models/Users')


const getUserByUsername = async (username) => { return await User.findOne({ username: username }); };
const createUserPassName = async (username, password, displayName, profilePic) => {
    const user = new User({ username: username, password: password, displayName: displayName, profilePic: profilePic });
    return await user.save();
};

module.exports = { getUserByUsername, createUserPassName };
