/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define a custom MAMA green from your screenshot for consistency
        mama: {
          light: '#e6ffe6', // A very light, soothing green for backgrounds
          DEFAULT: '#38a169', // A vibrant, clear green for accents
          dark: '#2f855a', // A deeper green for primary actions/text
        },
        // Re-aligning other common colors to fit the green theme if needed
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Keep original gray for text readability
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Keeping alert colors
        red: {
          100: '#fee2e2',
          500: '#ef4444',
          700: '#b91c1c',
        },
        blue: { // For 'Appointments Today' card
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        amber: { // For overdue alerts
          100: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        }
      },
    },
  },
  plugins: [],
}