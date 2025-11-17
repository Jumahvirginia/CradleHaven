const Appointment = require('../models/appointment.model');
const Patient = require('../models/patient.model');

// --- 1. Get All Appointments ---
// @route   GET /api/appointments
// @desc    Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    // This .find() command will get all appointments
    // .populate('patient') is the magic! It will replace the
    // patient ID with the actual patient's data (name, phone, etc.)
    const appointments = await Appointment.find().populate('patient');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// --- 2. Create a New Appointment ---
// @route   POST /api/appointments
// @desc    Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patient, appointmentDate, notes } = req.body;

    // Check for required fields
    if (!patient || !appointmentDate) {
      return res.status(400).json({ message: 'Patient ID and appointment date are required' });
    }

    // Check if the patient actually exists
    const patientExists = await Patient.findById(patient);
    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Create the new appointment
    const newAppointment = new Appointment({
      patient,
      appointmentDate,
      notes
      // 'status' will be 'Scheduled' by default (we set this in the model)
    });

    // Save it to the database
    const savedAppointment = await newAppointment.save();
    
    // Send back the new appointment data
    res.status(201).json(savedAppointment);

  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

// --- 3. Update an Appointment's Status ---
// @route   PUT /api/appointments/:id
// @desc    Update the status of an appointment (e.g., to "Completed")
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body; // We only want to update the status

    // The 'status' must be one of the ones we allowed in our model
    if (!['Scheduled', 'Confirmed', 'Completed', 'Missed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find the appointment by its ID and update it
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true, runValidators: true } // 'new: true' sends back the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);

  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment status', error: error.message });
  }
};