const Users = require('../services/Users');
const jwt = require("jsonwebtoken")
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

const createToken = async (req, res) => {
    res.status(200);
    const user = await Users.getUserByUsername(req.body.username);
    if (!user) {
        return res.status(404).json({ error: ["User doesn't exist"] });
    }
    const payload = { "username": user.username }
    const token = jwt.sign(payload, key, { algorithm: 'HS256' });
    res.status(201).json({ token });
    res.end();
};

module.exports = { createToken };
