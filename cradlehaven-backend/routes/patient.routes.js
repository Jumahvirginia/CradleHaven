const express = require('express');
const router = express.Router();

// We import the "brain" (the controller)
const patientController = require('../controllers/patient.controller');

// --- Define Patient Routes ---
// This file connects a URL path to a controller function.

// @route   POST /api/patients
// @desc    Register a new patient
//
// When the server gets a POST request to '/api/patients',
// it will run the 'createPatient' function from our controller.
router.post('/', patientController.createPatient);

// @route   GET /api/patients
// @desc    Get all registered patients
//
// When the server gets a GET request to '/api/patients',
// it will run the 'getAllPatients' function.
router.get('/', patientController.getAllPatients);

// @route   GET /api/patients/:id
// @desc    Get a single patient by ID
//
// When the server gets a GET request to '/api/patients/12345' (or any ID),
// it will run the 'getPatientById' function.
router.get('/:id', patientController.getPatientById);

// We will add PUT (update) and DELETE routes here later

module.exports = router; // This makes the file usable by our main server.js