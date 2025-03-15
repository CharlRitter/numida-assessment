/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
  // purge: process.env.NODE_ENV === 'production',
  corePlugins: {
    preflight: false,
    container: false
  },
  output: './src/tailwind.css'
};
