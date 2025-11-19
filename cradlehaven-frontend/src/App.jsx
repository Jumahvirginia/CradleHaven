import React, { useState } from 'react';
import RegisterPatient from './components/RegisterPatient';
import PatientList from './components/PatientList';
import AppointmentList from './components/AppointmentList';
import Dashboard from './components/Dashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation styling: Emerald text, underline for active tab
  const getTabClass = (tabName) => 
    `transition-colors pb-1 px-2 font-medium ${activeTab === tabName ? 'text-emerald-800 border-b-2 border-emerald-600' : 'text-emerald-600 hover:text-emerald-800'}`;

  return (
    // THE FIX: Using 'bg-mama-light' for the whole page background
    <div className="min-h-screen bg-mama-light font-sans text-gray-900">
      
      {/* --- Navbar --- */}
      {/* Using a slightly transparent white or light emerald for the nav */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Logo Area */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-sm">
              CH
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-900 leading-none">Cradlehaven</h1>
              <p className="text-xs text-emerald-600 font-medium">Maternal Care System</p>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex gap-6 text-sm">
            <button onClick={() => setActiveTab('dashboard')} className={getTabClass('dashboard')}>
              Dashboard
            </button>
            <button onClick={() => setActiveTab('register')} className={getTabClass('register')}>
              Register
            </button>
            <button onClick={() => setActiveTab('list')} className={getTabClass('list')}>
              Patients
            </button>
            <button onClick={() => setActiveTab('schedule')} className={getTabClass('schedule')}>
              Schedule
            </button>
          </div>
        </div>
      </nav>

      {/* --- Main Content Area --- */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
          {activeTab === 'register' && <RegisterPatient />}
          {activeTab === 'list' && <PatientList />}
          {activeTab === 'schedule' && <AppointmentList />}
        </div>
      </main>
    </div>
  );
}