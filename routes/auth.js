//import
const express = require('express');
const { registerPatient } = require('../controllers/authControllers');
const { loginPatient } = require('../controllers/authControllers');
const router = express.Router();

//user registration
router.post('/register', registerPatient);
router.post('/login', loginPatient);

module.exports = router;