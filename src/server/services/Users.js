const Users = require('../models/Users')


const getUserByUsername = async (username) => { return await Users.findOne({ username: username }); };
const createUserPassName = async (username, password, displayName, profilePic) => {
    const user = new Users({ username: username, password: password, displayName: displayName, profilePic: profilePic });
    return await user.save();
};

// const getUserByUsername = async (username) => {
//     return await User.findById(username);
// };

module.exports = { getUserByUsername, createUserPassName };
