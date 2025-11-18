import React from 'react';

export default function App() {
  return (
    // These weird classes (min-h-screen, bg-gray-100) are Tailwind!
    // If the background turns gray and text turns blue, it works.
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="text-center p-10 bg-white rounded-xl shadow-lg">
        
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Welcome to Cradlehaven
        </h1>
        
        <p className="text-xl text-gray-600">
          Your maternal care dashboard is coming soon.
        </p>
        
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Get Started
        </button>

      </div>
    </div>
  );
}