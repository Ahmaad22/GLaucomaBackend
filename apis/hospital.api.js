const express = require('express');
const { addHospitals, getHospitals } = require('../services/hospital.service');
const router = express.Router(); // Use express.Router() to create a router instance
router.post('/addHospitals', addHospitals); 
router.get('/getHospitals',getHospitals)
module.exports = router;