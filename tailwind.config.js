/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Esto le dice a Tailwind que escanee tus archivos React
  ],
  darkMode: 'class', // Habilita el modo oscuro basado en la clase 'dark' en el HTML
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Asegura que la fuente Inter esté disponible
      },
    },
  },
  plugins: [],
}