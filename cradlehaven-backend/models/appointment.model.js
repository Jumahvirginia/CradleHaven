import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// This schema defines the "shape" of an appointment
const AppointmentSchema = new mongoose.Schema({
  // This is the most important part: the link to the patient.
  // We are storing the Patient's unique ID here.
  patient: {
    type: Schema.Types.ObjectId,
    // This 'ref' tells Mongoose: "This ID refers to a document in the 'Patient' collection."
    ref: 'Patient', 
    required: true // An appointment MUST be linked to a patient
  },
  
  // --- Appointment Details ---
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  
  // This is for your 'Track appointment status' feature
  status: {
    type: String,
    required: true,
    // 'enum' means the value MUST be one of these strings
    // This prevents bad data (like "Canceled" with a typo)
    enum: ['Scheduled', 'Confirmed', 'Completed', 'Missed'],
    default: 'Scheduled' // New appointments are 'Scheduled' by default
  },
  
  // Notes for this specific appointment
  notes: {
    type: String,
    trim: true,
    default: ''
  }

}, {
  // This will add 'createdAt' and 'updatedAt' for the appointment
  timestamps: true 
});

// The Model is the tool we use to interact with the 'appointments' collection
const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;