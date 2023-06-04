const express = require('express');
var router = express.Router();
const ChatController = require('../controllers/Chats');

router.route('/')
    .post(ChatController.isLoggedIn, ChatController.createChat)
    .get(ChatController.isLoggedIn, ChatController.getChats)
router.route('/:id')
    .get(ChatController.isLoggedIn, ChatController.getChatById)
module.exports = router;
