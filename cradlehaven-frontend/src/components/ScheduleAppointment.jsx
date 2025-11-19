import React, { useState, useEffect } from 'react';
import { getAllPatients, createAppointment } from '../api/patientService';

export default function ScheduleAppointment() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentDate: '',
    notes: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  // Load patients for the dropdown when the component mounts
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error loading patients", error);
      }
    };
    loadPatients();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Scheduling...' });

    try {
      await createAppointment({
        patient: formData.patientId, // Backend expects 'patient' (the ID)
        appointmentDate: formData.appointmentDate,
        notes: formData.notes
      });
      setStatus({ type: 'success', message: 'Appointment scheduled!' });
      setFormData({ ...formData, appointmentDate: '', notes: '' }); // Keep patient selected
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Scheduling failed' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Schedule Appointment</h2>

      {status.message && (
        <div className={`p-3 mb-4 rounded ${status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Patient Dropdown */}
        <div>
          <label className="block text-gray-700 mb-1">Select Patient</label>
          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="">-- Choose a Patient --</option>
            {patients.map(patient => (
              <option key={patient._id} value={patient._id}>
                {patient.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-gray-700 mb-1">Date & Time</label>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-gray-700 mb-1">Reason / Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}