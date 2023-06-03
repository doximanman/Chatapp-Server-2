const userPassNameService = require('../services/UserPassName');


const createUserPassName = async (req, res) => {
    const existUser = await userPassNameService.getUserByUsername(req.body.username);
    if (existUser) {
        return res.status(404).json({ errors: ['User already exist'] });
    }
    res.json(await userPassNameService.createUserPassName(req.body.username, req.body.password, req.body.displayName, req.body.profilePic));
};

const getUserByUsername = async (req, res) => {
    const user = await userPassNameService.getUserByUsername(req.params.username);
    if (!user) {
        return res.status(404).json({ errors: ['User not exist'] });
    }
    res.json({username: user.username, displayName: user.displayName, profilePic: user.profilePic})
};


module.exports = { createUserPassName, getUserByUsername };
