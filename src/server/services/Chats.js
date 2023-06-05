const Chat = require('../models/Chats')
const MessageService = require('../services/Messages')
const UserService = require('../services/Users')

const isChatExist = async (username1, username2) => {
    const chatOp1 = await Chat.find({ users: [username1, username2] });
    const chatOp2 = await Chat.find({ users: [username2, username1] });
    return chatOp1.length !== 0 || chatOp2.length !== 0;
};

const createChat = async (sender, receiver) => {
    if (await UserService.getUserByUsername(receiver) == null) {
        // no such user
        return 0;
    }
    else {
        // otherwise create new chat
        const chat = new Chat({ users: [sender, receiver], messages: [] });
        return await chat.save();
    }
};

const getUserDetailes = async (username) => {
    const user = await UserService.getUserByUsername(username);
    return { username: username, displayName: user.displayName, profilePic: user.profilePic };
};

const getChats = async (username) => {
    const allChats = await Chat.find({});
    let chats = [];
    for (const chat of allChats) {
        if (chat.users[0] === username) {
            chats.push({ id: chat._id, user: await getUserDetailes(chat.users[1]), lastMessage: chat.messages.length !== 0 ? [chat.messages.length - 1] : null });
        }
        else if (chat.users[1] === username) {
            chats.push({ id: chat._id, user: await getUserDetailes(chat.users[0]), lastMessage: chat.messages !== 0 ? [chat.messages.length - 1] : null });
        }
    };
    return chats;
};

const getChatById = async (id) => {
    const chatById = await Chat.findOne({ _id: id });
    if (chatById === null) {
        return null;
    }
    return { id: id, users: [await getUserDetailes(chatById.users[0]), await getUserDetailes(chatById.users[1])], messages: chatById.messages }
};

const deleteChatById = async (id) => {
    const chatById = await Chat.findOne({ _id: id });
    if (chatById === null) {
        return 0;
    }
    await Chat.deleteOne({ _id: id });
    return 1;
};

const addMessageToChat = async (sender, chatId, content) => {
    const chatById = await Chat.findOne({ _id: chatId });
    if (chatById === null) {
        return null;
    }
    const newMessage = await MessageService.createMessage(sender, content);
    await Chat.updateOne(
        { _id: chatId },
        { $set: { messages: [...chatById.messages, newMessage._id] } }
    );
    const senderDetailes = await getUserDetailes(sender);
    return { id: newMessage._id, created: newMessage.created, sender: senderDetailes, content: content };
};

const getMessagesByChatId = async (chatId) => {
    const chatById = await Chat.findOne({ _id: chatId });
    if (chatById === null) {
        return null;
    }
    let messages = [];
    for (const messageId of chatById.messages) {
        const message = await MessageService.getMessageById(messageId);
        messages.push({ id: messageId, created: message.created, sender: { username: message.sender }, content: message.content });
    }
    return messages;
};

module.exports = { createChat, getChats, getChatById, deleteChatById, addMessageToChat, getMessagesByChatId };
