import React, { useState } from 'react';
import { registerPatient } from '../api/patientService';

export default function RegisterPatient() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    lmp: '',
    notes: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Registering...' });
    try {
      await registerPatient(formData);
      setStatus({ type: 'success', message: 'Patient registered successfully!' });
      setFormData({ fullName: '', phoneNumber: '', lmp: '', notes: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Registration failed' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Register New Patient</h2>
      {status.message && (
        <div className={`p-3 mb-4 rounded ${status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
        <label className="block text-gray-700 text-sm">Last Menstrual Period</label>
        <input type="date" name="lmp" value={formData.lmp} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">Register Patient</button>
      </form>
    </div>
  );
}