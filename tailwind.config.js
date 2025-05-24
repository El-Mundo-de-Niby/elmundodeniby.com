// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Manrope será la fuente sans-serif por defecto para Tailwind
        sans: ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        // Define aquí tus clases personalizadas de letter-spacing
        // Puedes usar el nombre que quieras.
        // Revolut usa un kerning bastante ajustado, especialmente en sus títulos grandes.
        // Aquí te doy algunas opciones, el '-0.075em' o '-0.1em' podrían ser más realistas
        // para el efecto "apretado" de Revolut, dependiendo del tamaño de la fuente.
        'tight-lg': '-0.075em', // Un espaciado negativo moderado para pantallas grandes
        'tight-xl': '-0.1em',   // Un espaciado negativo más fuerte para pantallas XL
        'custom-neg-05rem': '-0.50rem', // Si realmente quieres usar tu valor de -0.50rem
        // ¡Cuidado, es un valor muy grande y puede superponer las letras!
      },
      
    },
  },
  plugins: [],
}