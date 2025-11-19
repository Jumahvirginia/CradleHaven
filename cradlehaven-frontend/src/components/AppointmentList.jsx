import React, { useState, useEffect } from 'react';
import { getAllAppointments, updateAppointmentStatus } from '../api/patientService';
import { Calendar, Clock, Phone, FileText, CheckCircle, XCircle, Filter, Plus, Activity, X } from 'lucide-react';
import ScheduleAppointment from './ScheduleAppointment';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (filterDate) filters.date = filterDate;
      if (filterStatus) filters.status = filterStatus;
      
      const data = await getAllAppointments(filters);
      setAppointments(data);
    } catch (error) {
      console.error("Failed to load appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filterDate, filterStatus, showForm]);

  const handleStatusUpdate = async (id, newStatus) => {
    if(!window.confirm(`Mark this appointment as ${newStatus}?`)) return;
    try {
      await updateAppointmentStatus(id, newStatus);
      fetchAppointments();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Missed': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* --- Header & Controls --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-mama-DEFAULT">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Calendar className="text-mama-DEFAULT" size={28} /> 
              Appointment Hub
            </h2>
            <p className="text-sm text-gray-500 mt-1 ml-10">Manage schedule and track patient visits</p>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold shadow-sm transition ${
              showForm 
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                : 'bg-mama-DEFAULT text-white hover:bg-mama-dark'
            }`}
          >
            {showForm ? <><X size={20}/> Cancel</> : <><Plus size={20}/> New Appointment</>}
          </button>
        </div>

        {/* Toggle: Form vs Filters */}
        {showForm ? (
          <div className="animate-fade-in bg-gray-50 p-6 rounded-xl border border-gray-200">
             <ScheduleAppointment /> 
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 font-medium mr-2">
              <Filter size={18} /> Filters:
            </div>
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-mama-DEFAULT outline-none text-gray-600"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-mama-DEFAULT outline-none bg-white text-gray-600"
            >
              <option value="">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
            </select>
            {(filterDate || filterStatus) && (
               <button 
                 onClick={() => {setFilterDate(''); setFilterStatus('')}}
                 className="text-sm text-red-500 hover:underline ml-auto flex items-center gap-1"
               >
                 <X size={14} /> Clear
               </button>
            )}
          </div>
        )}
      </div>

      {/* --- The List --- */}
      {!showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center p-12 text-mama-DEFAULT flex flex-col items-center justify-center">
               <Activity className="animate-spin mb-3" size={32} /> 
               <span>Loading schedule...</span>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center p-12 text-gray-400 flex flex-col items-center">
              <Calendar size={48} className="mb-3 opacity-20" />
              <p>No appointments found matching your filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {appointments.map((apt) => (
                <div key={apt._id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-emerald-50/30 transition group">
                  
                  {/* Info Section */}
                  <div className="flex items-start gap-5 mb-4 md:mb-0">
                    {/* Date Badge */}
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600 font-bold text-center min-w-[80px] border border-blue-100">
                      <div className="text-xs uppercase tracking-wide">{new Date(apt.appointmentDate).toLocaleDateString(undefined, {month:'short'})}</div>
                      <div className="text-2xl leading-none mt-1">{new Date(apt.appointmentDate).getDate()}</div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 text-lg flex items-center gap-3">
                        {apt.patient ? apt.patient.fullName : 'Unknown Patient'}
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </h4>
                      
                      <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-x-6 gap-y-2">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-gray-400"/> 
                          {new Date(apt.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone size={14} className="text-gray-400"/> 
                          {apt.patient ? apt.patient.phoneNumber : 'N/A'}
                        </span>
                      </div>
                      
                      {apt.notes && (
                        <div className="flex items-start gap-1.5 mt-2 text-gray-500 text-sm">
                          <FileText size={14} className="text-gray-400 mt-0.5 shrink-0"/>
                          <span className="italic">"{apt.notes}"</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Section */}
                  {apt.status === 'Scheduled' && (
                    <div className="flex gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleStatusUpdate(apt._id, 'Completed')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-600 hover:text-white hover:border-emerald-600 text-sm font-bold transition-all"
                        title="Mark as Completed"
                      >
                        <CheckCircle size={16} /> Complete
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(apt._id, 'Missed')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 text-sm font-bold transition-all"
                        title="Mark as Missed"
                      >
                        <XCircle size={16} /> Missed
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}