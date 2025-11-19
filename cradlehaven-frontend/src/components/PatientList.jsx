import React, { useEffect, useState } from 'react';
import { getAllPatients } from '../api/patientService';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // This runs once when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (err) {
        setError('Failed to load patients.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <div className="text-center p-4">Loading patients...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-600 p-6 border-b">Patient Directory</h2>
      
      {patients.length === 0 ? (
        <p className="p-6 text-gray-500">No patients registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600 border-b">Full Name</th>
                <th className="p-4 text-sm font-semibold text-gray-600 border-b">Phone</th>
                <th className="p-4 text-sm font-semibold text-gray-600 border-b">Est. Delivery</th>
                <th className="p-4 text-sm font-semibold text-gray-600 border-b">Notes</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 border-b font-medium text-gray-900">{patient.fullName}</td>
                  <td className="p-4 border-b text-gray-600">{patient.phoneNumber}</td>
                  <td className="p-4 border-b text-blue-600">
                    {/* Format the date nicely */}
                    {new Date(patient.estimatedDeliveryDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b text-gray-500 text-sm truncate max-w-xs">
                    {patient.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}