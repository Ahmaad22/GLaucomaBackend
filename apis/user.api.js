const express = require('express');
const router = express.Router(); // Use express.Router() to create a router instance

const { signUp, signIn, updateUserName, updateEmail, updatePassword, sendVerification, getDoctors} = require('../services/user.service'); // Import the signUp function from the service

// Define routes
router.post('/signUp', signUp); 
router.post('/signIn', signIn); 
router.put('/updateUserName', updateUserName); 
router.put('/updateEmail', updateEmail); 
router.put('/updatePassword', updatePassword); 
router.post('/sendVerification',sendVerification)
router.get('/getDoctors',getDoctors)

module.exports = router;
