const userPassService = require('../services/UserPass');

const createUserPass = async (req, res) => {
    res.json(await userPassService.createUser(req.body.username));
};

const getUserByUsername = async (req, res) => {
    const user = await userService.getUserByUsername(req.params.usernaem);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(article);
};

const getUsers = async (req, res) => {
    res.json(await userService.getUsers());
};


module.exports = { createUser, getUsers, getUserByUsername };
