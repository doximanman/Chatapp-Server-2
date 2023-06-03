const UserPassName = require('../models/UserPassName')


const getUserByUsername = async (username) => { return await UserPassName.findOne({ username: username }); };
const createUserPassName = async (username, password, displayName, profilePic) => {
    const userPassName = new UserPassName({ username: username, password: password, displayName: displayName, profilePic: profilePic });
    return await userPassName.save();
};

// const getUserByUsername = async (username) => {
//     return await User.findById(username);
// };

module.exports = { getUserByUsername, createUserPassName };
