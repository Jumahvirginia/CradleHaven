// --- Imports ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from .env file

// --- App Initialization ---
const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors()); 
app.use(express.json());

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas.");
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1); 
  });

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('Welcome to the Cradlehaven API!');
});

// Import your patient routes
const patientRoutes = require('./routes/patient.routes');

// Tell Express to use the patient routes
app.use('/api/patients', patientRoutes);


// Import your new appointment routes
const appointmentRoutes = require('./routes/appointment.routes');

 
// Tell Express to use the appointment routes
// Any URL starting with /api/appointments will be handled by appointmentRoutes
app.use('/api/appointments', appointmentRoutes);


// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Cradlehaven server is running on http://localhost:${PORT}`);
});
// ... existing imports ...

// Import the new route
const dashboardRoutes = require('./routes/dashboard.routes'); 

// ... inside app.use() section ...
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dashboard', dashboardRoutes); 


