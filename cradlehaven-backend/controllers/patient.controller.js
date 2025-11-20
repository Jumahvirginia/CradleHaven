// We first import the "Patient" model we just created.
// This is how we'll talk to the 'patients' collection in our database.
import Patient from '../models/patient.model.js';

// --- 1. Get All Patients ---
// This function will find every patient in the database.
export const getAllPatients = async (req, res) => {
  try {
    // Patient.find() is a Mongoose command that means "find all documents".
    const patients = await Patient.find();
    // Send the list of patients back as a JSON response
    res.status(200).json(patients);
  } catch (error) {
    // If anything goes wrong, send a 500 error
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// --- 2. Create a New Patient ---
// This function will handle registering a new patient.
export const createPatient = async (req, res) => {
  try {
    // We get the data from the request body (this will come from your React form)
    const { fullName, phoneNumber, lmp, notes } = req.body;

    // A quick check to make sure we have the required data
    if (!fullName || !phoneNumber || !lmp) {
      return res.status(400).json({ message: 'Please provide fullName, phoneNumber, and lmp' });
    }

    // We create a new patient document in memory
    const newPatient = new Patient({
      fullName,
      phoneNumber,
      lmp,
      notes
    });

    // We save the patient to the database
    // The .save() command triggers our 'pre-save' hook to calculate the EDD!
    const savedPatient = await newPatient.save();
    
    // We send back the new patient's data with a "201 Created" status
    res.status(201).json(savedPatient); 

  } catch (error) {
    // This 'if' statement handles the error if the phone number is a duplicate
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Phone number is already registered.' });
    }
    // For all other errors
    res.status(500).json({ message: 'Error creating patient', error: error.message });
  }
};

// --- 3. Get a Single Patient by ID ---
// This function will find one specific patient using their ID
export const getPatientById = async (req, res) => {
  try {
    // req.params.id comes from the URL (e.g., /api/patients/12345)
    const patient = await Patient.findById(req.params.id);
    
    // If no patient is found with that ID
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    // If we find the patient, send them back
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};

// We will add Update and Delete functions later. This is perfect for now.