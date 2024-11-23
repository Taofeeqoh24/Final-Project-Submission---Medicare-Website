const express = require('express');
const { updateProfile } = require('../controllers/patientController');
const { bookAppointment } = require('../controllers/patientController');
const { viewAppointments } = require('../controllers/patientController');
const router = express.Router();

// Route to update patient profile
router.get('/profile', updateProfile);

// Route to book an appointment
router.post('/patient/appointments', bookAppointment);

// Route to view appointments
router.get('/appointments', viewAppointments);

module.exports = router;