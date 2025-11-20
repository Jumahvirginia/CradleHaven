import mongoose from 'mongoose';

// A Schema defines the "shape" of a document in MongoDB
const PatientSchema = new mongoose.Schema({
  // --- Basic Information ---
  fullName: {
    type: String,
    required: [true, 'Patient full name is required'],
    trim: true // Removes whitespace from the beginning and end
  },
  
  // --- Contact Information ---
  phoneNumber: {
    type: String,
    required: [true, 'Patient phone number is required'],
    trim: true,
    // A 'unique' index ensures no two patients have the same phone number
    unique: true 
  },
  
  // --- Medical Information ---
  // "Last Menstrual Period" - crucial for tracking pregnancy
  lmp: {
    type: Date,
    required: [true, 'LMP is required for EDD calculation']
  },
  
  // "Estimated Date of Delivery"
  // We will calculate this from the LMP.
  estimatedDeliveryDate: {
    type: Date
  },

  // --- App-Specific ---
  // Notes for the healthcare worker
  notes: {
    type: String,
    trim: true,
    default: '' // Default to an empty string
  }

}, {
  // --- Options ---
  // timestamps: true automatically adds 'createdAt' and 'updatedAt' fields
  // This is great for tracking when a patient was registered or updated.
  timestamps: true 
});

// --- Pre-save Hook for EDD Calculation ---
// This function will automatically run *before* a new patient is saved
PatientSchema.pre('save', function(next) {
  // 'this' refers to the patient document being saved
  if (this.isModified('lmp') && this.lmp) {
    // A standard calculation for EDD is LMP + 280 days
    const edd = new Date(this.lmp.getTime());
    edd.setDate(edd.getDate() + 280);
    this.estimatedDeliveryDate = edd;
  }
  next(); // Continue with the save operation
});

// The Model is the tool we use to interact with the 'patients' collection
const Patient = mongoose.model('Patient', PatientSchema);

export default Patient;