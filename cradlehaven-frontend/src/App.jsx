import React from 'react';
// This line below is what was failing. It needs to find the file above.
import RegisterPatient from './components/RegisterPatient';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <nav className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-blue-600">Cradlehaven</h1>
      </nav>
      <main className="p-8">
        <RegisterPatient />
      </main>
    </div>
  );
}