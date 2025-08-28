/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Project type colors
    'bg-blue-100', 'text-blue-800',
    'bg-green-100', 'text-green-800', 
    'bg-yellow-100', 'text-yellow-800',
    'bg-red-100', 'text-red-800',
    'bg-gray-100', 'text-gray-800',
    // Hover effects
    'transition-transform', 'duration-200', 'hover:scale-105',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#25D366',
          500: '#20B858',
          600: '#1BA74E',
          700: '#169644',
          800: '#11843A',
          900: '#0C7230',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}