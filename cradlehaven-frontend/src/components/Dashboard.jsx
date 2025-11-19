import React, { useEffect, useState } from 'react';
import { getDashboardStats, updateAppointmentStatus } from '../api/patientService';
import { Users, Calendar, AlertTriangle, Activity, Plus, CheckCircle, Clock, Phone, FileText } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    missedAppointments: 0,
    todaysSchedule: [] // This array holds the list for the widget
  });
  const [loading, setLoading] = useState(true);

  // Function to fetch data from backend
  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load dashboard stats", error);
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchStats();
  }, []);

  // Handle the "Check In" button click
  const handleCheckIn = async (id) => {
    if(window.confirm("Mark this patient as checked in/completed?")) {
      try {
        await updateAppointmentStatus(id, 'Completed'); // Update status in DB
        fetchStats(); // Refresh the dashboard to show the new status
      } catch (error) {
        alert("Failed to update status");
      }
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-emerald-700">
      <Activity className="animate-spin mr-2" /> Loading Dashboard...
    </div>
  );

  // Helper component for the top 3 stats cards
  const StatCard = ({ title, value, icon: Icon, iconBgColor, iconTextColor, borderColor }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-40 border-l-4 ${borderColor}`}>
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${iconBgColor} ${iconTextColor}`}>
          <Icon size={28} />
        </div>
        <span className="text-4xl font-bold text-gray-800">{value}</span>
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-gray-500">{title}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* --- Header --- */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-emerald-900">Good Morning, Nurse</h2>
          <p className="text-emerald-700 mt-1">Here is what's happening today at Cradlehaven.</p>
        </div>
        <button 
          onClick={() => onNavigate('schedule')}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all hover:-translate-y-0.5"
        >
          <Plus size={20} />
          Quick Schedule
        </button>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          iconBgColor="bg-emerald-50"
          iconTextColor="text-emerald-600"
          borderColor="border-emerald-500"
        />
        <StatCard
          title="Appointments Today"
          value={stats.appointmentsToday}
          icon={Calendar}
          iconBgColor="bg-blue-50"
          iconTextColor="text-blue-600"
          borderColor="border-blue-500"
        />
        <StatCard
          title="Missed Visits"
          value={stats.missedAppointments}
          icon={AlertTriangle}
          iconBgColor="bg-red-50"
          iconTextColor="text-red-600"
          borderColor="border-red-500"
        />
      </div>

      {/* --- Today's Schedule Widget --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Clock size={20} className="text-emerald-600"/> Today's Schedule
          </h3>
          <span className="text-sm text-gray-500 font-medium bg-white px-3 py-1 rounded-full border border-gray-200">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* If list is empty */}
        {stats.todaysSchedule && stats.todaysSchedule.length === 0 ? (
          <div className="p-12 text-center text-gray-400 flex flex-col items-center">
            <Calendar size={48} className="mb-4 opacity-20 text-emerald-600" />
            <p className="text-lg font-medium text-gray-500">No appointments scheduled for today.</p>
            <button onClick={() => onNavigate('schedule')} className="text-emerald-600 font-bold mt-2 hover:underline">
              Schedule one now &rarr;
            </button>
          </div>
        ) : (
          /* If list has items */
          <div className="divide-y divide-gray-50">
            {stats.todaysSchedule && stats.todaysSchedule.map((apt) => (
              <div key={apt._id} className="p-5 flex items-center justify-between hover:bg-emerald-50/30 transition duration-150">
                <div className="flex items-center gap-5">
                  {/* Time Pill */}
                  <div className="bg-blue-50 text-blue-700 p-3 rounded-xl font-bold text-sm min-w-[90px] text-center shadow-sm border border-blue-100">
                    {new Date(apt.appointmentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  
                  {/* Patient Info */}
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{apt.patient ? apt.patient.fullName : 'Unknown Patient'}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Phone size={14}/> {apt.patient ? apt.patient.phoneNumber : 'N/A'}</span>
                      {apt.notes && <span className="flex items-center gap-1 italic text-gray-400 border-l pl-3 ml-2"><FileText size={14}/> "{apt.notes}"</span>}
                    </div>
                  </div>
                </div>

                {/* Action Button / Status Badge */}
                {apt.status === 'Scheduled' ? (
                  <button 
                    onClick={() => handleCheckIn(apt._id)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-100 text-emerald-700 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                  >
                    <CheckCircle size={18} />
                    Check In
                  </button>
                ) : (
                  <span className={`px-4 py-2 rounded-full text-sm font-bold border ${
                    apt.status === 'Completed' 
                      ? 'bg-gray-50 text-gray-500 border-gray-200' 
                      : 'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {apt.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}