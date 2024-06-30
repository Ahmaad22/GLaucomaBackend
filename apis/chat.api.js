const express = require('express');
const { getChats } = require('../services/chat.service');
const router = express.Router(); // Use express.Router() to create a router instance


// Define routes
router.get('/getChats', getChats); 

module.exports = router;