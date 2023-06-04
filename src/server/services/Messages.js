const Message = require('../models/Messages')

const getMessageById = async (id) => {
    return await Message.findById(id);
};
const createMessage = async (sender, content) => {
    const msg = new Message(Date.now, sender, content);
    return await msg.save();
};

module.exports = { getMessageById, createMessage };
