const userPassService = require('../services/UserPass');

const createUserPass = async (req, res) => {
    res.json(await userPassService.createUserPass(req.body.username, req.body.password));
};

const getUserByUsername = async (req, res) => {
    const user = await userService.getUserByUsername(req.params.username);
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(article);
};

const getUsers = async (req, res) => {
    res.json(await userService.getUsers());
};


module.exports = { createUserPass, getUsers, getUserByUsername };
