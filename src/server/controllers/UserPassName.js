const userPassNameService = require('../services/UserPassName');

const createUserPassName = async (req, res) => {
    res.json(await userPassNameService.createUserPassName(req.body.username, req.body.password, req.body.displayName, req.body.profilePic));
};




module.exports = { createUserPassName };
