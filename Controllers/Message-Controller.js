const Notification = require('../Models/Notification');

const messageController = {
  createMessage: async (userId, messageContent) => {
    
    const notification = new Notification({
      userId,
      message: `New message: ${messageContent}`,
    });

    await notification.save();
  },
};

module.exports = messageController;
