const Users = require('../services/Users');

const createUserPassName = async (req, res) => {
    const existUser = await Users.getUserByUsername(req.body.username);
    if (existUser) {
        return res.status(404).json({ errors: ['User already exist'] });
    }
    res.json(await Users.createUserPassName(req.body.username, req.body.password, req.body.displayName, req.body.profilePic));
};

const getUserByUsername = async (req, res) => {
    const user = await Users.getUserByUsername(req.params.username);
    if (!user) {
        return res.status(404).json({ errors: ['User not exist'] });
    }
    res.json({username: user.username, displayName: user.displayName, profilePic: user.profilePic})
};

module.exports = { createUserPassName, getUserByUsername };
