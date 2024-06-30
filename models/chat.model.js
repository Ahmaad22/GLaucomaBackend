const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    name: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user', // Reference to the 'user' model
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message', // Reference to the 'user' model
        }
    ]
});

const chatModel = mongoose.model("chat", chatSchema);
module.exports.chatModel = chatModel;
