const ChatService = require('../services/Chats');
const UserService = require('../services/Users');
// Use a library to perform the cryptographic operations
const jwt = require("jsonwebtoken")
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"


// Ensure that the user sent a valid token
const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        // const tokenObject = JSON.parse(token);
        // const extractedToken = tokenObject.token;
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key, { algorithm: 'HS256' });
            // Token validation was successful. Continue to the actual function (index)
            res.locals.username = data.username;
            return next()
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else
        return res.status(403).send('Token required');
}

const getUserByUsername = async (req, res) => {
    const user = await UserService.getUserByUsername(req.params.username);
    if (!user) {
        return res.status(404).json({ errors: ['User not exist'] });
    }
    res.json({ username: user.username, displayName: user.displayName, profilePic: user.profilePic })
};

const createChat = async (req, res) => {
    if (res.locals.username === req.body.username) {
        return res.status(404).json({ errors: ["Cannot create a chat with yourself"] });
    }
    const newChat = await ChatService.createChat(res.locals.username, req.body.username);
    if (newChat == 0) {
        return res.status(404).json({ errors: ['No such user'] });
    }
    else if (newChat == 1) {
        return res.status(404).json({ errors: ['Chat already exist'] });
    }
    const user = await UserService.getUserByUsername(req.body.username);
    res.json({id: newChat._id, user: {username: user.username, displayName: user.displayName, profilePic: user.profilePic}});
}

const getChats = async (req, res) => {
    const chats = await ChatService.getChats(res.locals.username);
    res.json(chats);
};

module.exports = { createChat, isLoggedIn, getChats };
