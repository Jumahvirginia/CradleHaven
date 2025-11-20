// --- Imports ---
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './routes/patient.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

dotenv.config(); // Loads environment variables from .env file

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

app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Cradlehaven server is running on http://localhost:${PORT}`);
});


