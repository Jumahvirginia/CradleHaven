import axios from 'axios';

// Create an instance of axios with your backend URL
const api = axios.create({
  // This points to your Express server
  baseURL: 'http://localhost:5001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;