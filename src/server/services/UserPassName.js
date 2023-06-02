const User = require('../models/UserPassName')

const createUserPassName = async (username, password,  displayName, profilePic) => {
    const user = new User({ username: username, password: password, displayName: displayName, profilePic: profilePic });
    return await user.save();
};

// const getUserByUsername = async (username) => {
//     return await User.findById(username);
// };

module.exports = { createUserPassName };
