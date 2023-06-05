const User = require('../models/Users')

const getUserByUsername = async (username) => { return await User.findOne({ username: username }); };
const getUserByUsernameAndPassword = async (username, password) => {
    return await User.findOne({ username: username, password: password });
};

const createUser = async (username, password, displayName, profilePic) => {
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const usernameRegExp = /^[a-zA-Z0-9-_!.]{4,20}$/;
    const userWithUsername = await getUserByUsername(username);
    if (userWithUsername !== null) {
        return "Username already exist, please choose another one.";
    }
    if (username === null || !usernameRegExp.test(username)) {
        return "Username must contain 4-20 characters, can include letters, digits and _-!.";
    }
    if (password === null || !passwordRegExp.test(password)) {
        return "The passwors must contain 8-20 characters, at least one uppercase and lowercase leters, special character and digit.";
    }
    if (displayName === null) {
        return "Please enter display name.";
    } else if (displayName === username) {
        return "Please don't use your real name for the displayed name.";
    }
    if (profilePic === null) {
        return "Please upload profile picture";
    }
    const user = new User({ username: username, password: password, displayName: displayName, profilePic: profilePic });
    return await user.save();
};

module.exports = { getUserByUsername, createUser, getUserByUsernameAndPassword };
