const Users = require('../services/Users');
const jwt = require("jsonwebtoken")
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

const createToken = async (req, res) => {
    res.status(200);
    const user = await Users.getUserByUsernameAndPassword(req.body.username, req.body.password);
    if (!user) {
        return res.status(404).json({ error: ["Incorrect username and/or password"] });
    }
    const payload = { "username": user.username }
    const token = jwt.sign(payload, key, { algorithm: 'HS256' });
    res.status(201).send(token);
    res.end();
};

module.exports = { createToken };
