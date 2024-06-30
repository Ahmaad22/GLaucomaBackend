const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    content: String,
    userEmail: {
        type: String,
        required: true, // Ensure the email is required
    },
    chatName: {
        type: String,
        required: true, // Ensure the chat name is required
    },
    createdAt: {
        type: Date,
        default: () => Date.now() + 2 * 60 * 60 * 1000, // Current date + 2 hours
    },
});

const messageModel = mongoose.model("message", messageSchema);
module.exports.messageModel = messageModel;
