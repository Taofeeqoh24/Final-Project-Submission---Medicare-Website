//import
const express = require('express');
const { loginDoctor } = require('../controllers/doctorControllers');
const router = express.Router();

//doctor login
router.post('/login', loginDoctor);

module.exports = router;