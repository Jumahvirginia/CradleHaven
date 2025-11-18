import api from './axiosConfig';

// --- Patient API Calls ---

// 1. Register a new patient
// This function sends the form data to the backend
export const registerPatient = async (patientData) => {
  try {
    const response = await api.post('/patients', patientData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

// 2. Get all patients
export const getAllPatients = async () => {
  try {
    const response = await api.get('/patients');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};