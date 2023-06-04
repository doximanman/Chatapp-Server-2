const express = require('express');
var router = express.Router();
const ChatController = require('../controllers/Chats');

router.route('/')
    .post(ChatController.isLoggedIn, ChatController.createChat)
    .get(ChatController.isLoggedIn, ChatController.getChats)
router.route('/:id')
    .get(ChatController.isLoggedIn, ChatController.getChatById)
    .delete(ChatController.isLoggedIn, ChatController.deleteChatById)
router.route('/:id/Messages')
    .post(ChatController.isLoggedIn, ChatController.addMessageToChat)
    .get(ChatController.isLoggedIn, ChatController.getMessagesByChatId)

module.exports = router;
