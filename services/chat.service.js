const { userModel } = require("../models/user.model");
const { chatModel } = require("../models/chat.model");
const { messageModel } = require("../models/message.model");

const getChats = async (request, response) => {
  try {
    const email = request.headers.email; // Retrieve email from headers
    console.log("Fetching chats for email:", email);

    // Find the user based on email
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Find all chats where the user's _id is included in the users array
    let chats = await chatModel
      .find({ users: user._id })
      .populate('users', '-password');

    console.log("Found chats:", chats.map(chat => chat.name));

    // Populate messages for each chat
    for (let chat of chats) {
      const messages = await messageModel
        .find({ chatName: chat.name })
        
      chat.messages = messages;
    }

    response.json({ chats });
  } catch (error) {
    console.error("Error occurred during getChats:", error);
    response.status(500).json({ error: 'An error occurred while fetching chats' });
  }
};

module.exports = { getChats };
