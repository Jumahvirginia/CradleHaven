const Patient = require('../models/patient.model');
const Appointment = require('../models/appointment.model');

// @route   GET /api/dashboard/stats
// @desc    Get counts AND today's appointment list
exports.getDashboardStats = async (req, res) => {
  try {
    // Define "Today"
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // 1. Count total patients
    const totalPatients = await Patient.countDocuments();

    // 2. Count today's appointments
    const appointmentsToday = await Appointment.countDocuments({
      appointmentDate: { $gte: startOfDay, $lte: endOfDay }
    });

    // 3. Count missed appointments
    const missedAppointments = await Appointment.countDocuments({
      status: 'Missed'
    });

    // 4. GET THE ACTUAL LIST FOR TODAY (New Feature)
    const todaysSchedule = await Appointment.find({
      appointmentDate: { $gte: startOfDay, $lte: endOfDay }
    })
    .populate('patient', 'fullName phoneNumber') // Get patient names
    .sort({ appointmentDate: 1 }); // Earliest time first

    // Send it all back
    res.status(200).json({
      totalPatients,
      appointmentsToday,
      missedAppointments,
      todaysSchedule // Sending the list array
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

// --- Status Updates ---

// Update appointment status (e.g., "Scheduled" -> "Completed")
export const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await api.put(`/appointments/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};