const UserPass = require('../models/UserPass')

const createUserPass = async (username, password) => {
    const userPass = new UserPass({ username: username, password: password });
    return await userPass.save();
};

const getUsers = async () => {
    return await UserPass.find({});
};

const getUserPassByUsername = async (username) => {
    return await UserPass.findById(username);
};

module.exports = { createUserPass, getUsers, getUserPassByUsername };
