const Chat = require('../models/Chats')
const Message = require('../models/Messages')
const UserService = require('../services/Users')


const isChatExist = async (username1, username2) => {
    const chatOp1 = await Chat.find({ users: [username1, username2] });
    const chatOp2 = await Chat.find({ users: [username2, username1] });
    console.log(chatOp1.length != 0 || chatOp2.length != 0);
    return (chatOp1.length != 0 || chatOp2.length != 0);
};

const createChat = async (sender, receiver) => {
    if (await UserService.getUserByUsername(receiver) == null) {
        // no such user
        return 0;
    }
    if (isChatExist(sender, receiver)) {
        // chat between the 2 users are already exist
        return 1;
    }
    else {
        // otherwise create new chat
        const chat = new Chat({ users: [sender, receiver], messages: null });
        return await chat.save();
    }
};

module.exports = { createChat };
