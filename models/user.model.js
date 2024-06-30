const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    picture: String,
    role: String,
    description:String,
    city:String,
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'chat'
        }
    ],
});

const userModel = mongoose.model('user', userSchema);
module.exports.userModel = userModel;