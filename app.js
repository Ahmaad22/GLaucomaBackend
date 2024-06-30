const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const { userModel } = require('./models/user.model');
const { chatModel } = require('./models/chat.model');
const { messageModel } = require('./models/message.model');
const app = express();
const port = 2500;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ahhmmeeddaallii22:ahmed123@cluster0.gmvaprt.mongodb.net/')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

// Set up routes
app.use('/users', require('./apis/user.api'));
app.use('/chats', require('./apis/chat.api'));
app.use('/hospitals', require('./apis/hospital.api'));
// app.use('/messages', require('./apis/message.api'));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendMessage', async ({ chatName, userEmail, content }) => {
    console.log(userEmail)
    try {
      // Find the user by email
      const user = await userModel.findOne({ email: userEmail });
      if (!user) {
        throw new Error('User not found');
      }

      // Find the chat by name
      const chat = await chatModel.findOne({ name: chatName });
      if (!chat) {
        throw new Error('Chat not found');
      }

      const newMessage = new messageModel({
        chatName,
        userEmail,
        content,
      });

      // Save the message to the database
      await newMessage.save();

      // Emit the message to all users in the chat
      io.emit('newMessage', newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });



  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
