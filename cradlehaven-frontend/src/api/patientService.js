import api from './axiosConfig';

// --- Patient API Calls ---

export const registerPatient = async (patientData) => {
  try {
    const response = await api.post('/patients', patientData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

export const getAllPatients = async () => {
  try {
    const response = await api.get('/patients');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// --- Appointment API Calls ---

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};



//  Get appointments (Updated to accept filters)
export const getAllAppointments = async (filters = {}) => {
  try {
    // Convert the filters object (e.g., { status: 'Missed' }) into a URL query string
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/appointments?${params}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// --- Dashboard API Calls ---

export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// Update appointment status (e.g., "Scheduled" -> "Completed")
export const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await api.put(`/appointments/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};