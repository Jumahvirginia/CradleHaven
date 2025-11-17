const express = require('express');
const router = express.Router();

// We import the "brain" (the controller) we just made
const appointmentController = require('../controllers/appointment.controller');

// --- Define Appointment Routes ---
// This file connects a URL path to a controller function.

// @route   POST /api/appointments
// @desc    Create a new appointment
//
// When the server gets a POST request to '/api/appointments',
// it will run the 'createAppointment' function.
router.post('/', appointmentController.createAppointment);

// @route   GET /api/appointments
// @desc    Get all appointments
//
// When the server gets a GET request to '/api/appointments',
// it will run the 'getAllAppointments' function.
router.get('/', appointmentController.getAllAppointments);

// @route   PUT /api/appointments/:id
// @desc    Update an appointment's status (e.g., "Completed")
//
// When the server gets a PUT request to '/api/appointments/12345',
// it will run the 'updateAppointmentStatus' function.
router.put('/:id', appointmentController.updateAppointmentStatus);

// We will add DELETE later.

module.exports = router; // This makes the file usable by our main server.js