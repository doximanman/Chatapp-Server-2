const express = require('express');
var router = express.Router();
const ChatController = require('../controllers/Chats');

router.route('/')
    .post(ChatController.isLoggedIn, ChatController.createChat)

module.exports = router;
