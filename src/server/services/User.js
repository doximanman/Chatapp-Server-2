const User = require('../models/User')

// const createUser = async (username, displayName, profilePic) => {
//     const user = new User({ username: username, displayName: displayName, profilePic: profilePic });
//     return await user.save();
// };

// const getUsers = async () => {
//     return await User.find({});
// };

const getUserByUsername = async (username) => {
    return await User.findById(username);
};

module.exports = { getUserByUsername };
