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
        return res.status(400).json({ errors: ["Thou shalt not talk with thy self"] });
    }
    const newChat = await ChatService.createChat(res.locals.username, req.body.username);
    if (newChat === 0) {
        return res.status(404).json({ errors: ['No such user'] });
    }
    const user = await UserService.getUserByUsername(req.body.username);
    res.json({ id: newChat._id, user: { username: user.username, displayName: user.displayName, profilePic: user.profilePic } });
}

const getChats = async (req, res) => {
    const chats = await ChatService.getChats(res.locals.username);
    res.json(chats);
};

const getChatById = async (req, res) => {
    const chat = await ChatService.getChatById(res.locals.username, req.params.id);
    if (chat === 0) {
        return res.status(404).json({ errors: ["Chat not found"] });
    }
    if (chat === 1) {
        return res.status(401).json({ errors: ["Unauthorized"] });
    }
    res.json(chat);
};

const deleteChatById = async (req, res) => {
    const deleteCode = await ChatService.deleteChatById(res.locals.username, req.params.id);
    if (deleteCode === 0) {
        return res.status(404).json({ errors: ["Chat not found"] });
    }
    if (deleteCode === 1) {
        return res.status(401).json({ errors: ["Unauthorized"] });
    }
    return res.status(204).json();
};

const addMessageToChat = async (req, res) => {
    const newMessage = await ChatService.addMessageToChat(res.locals.username, req.params.id, req.body.msg);
    if (newMessage === 0) {
        return res.status(404).json({ errors: ["Chat not found"] });
    }
    if (newMessage === 1) {
        return res.status(401).json({ errors: ["Unauthorized"] });
    }
    res.json(newMessage);
};

const getMessagesByChatId = async (req, res) => {
    const messages = await ChatService.getMessagesByChatId(res.locals.username, req.params.id);
    if (messages === 0) {
        return res.status(404).json({ errors: ["Chat not found"] });
    }
    if (messages === 1) {
        return res.status(401).json({ errors: ["Unauthorized"] });
    }
    res.json(messages);
};

module.exports = { createChat, isLoggedIn, getChats, getChatById, deleteChatById, addMessageToChat, getMessagesByChatId };
