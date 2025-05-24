// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// --- CAMBIOS PARA DETECCIÓN TOTALMENTE DINÁMICA ---
const translations = {};
const detectedLanguages = []; // Array para almacenar los idiomas detectados

// Usa require.context para importar dinámicamente los archivos JSON
// Esto es específico de Webpack (usado por Create React App)
const context = require.context('./translations', false, /\.json$/);

context.keys().forEach((key) => {
    // key será algo como './en.json', './es.json'
    const lang = key.replace('./', '').replace('.json', ''); // Extrae 'en', 'es'

    // Añade el idioma detectado a nuestra lista
    detectedLanguages.push(lang);

    // Carga el contenido del archivo JSON
    translations[lang] = {
        translation: context(key) // Webpack's context(key) importa el contenido del archivo
    };
});

// Si no se detectaron idiomas, o si quieres un fallback muy específico
// puedes añadir una lógica aquí, pero el fallbackLng ya maneja el caso de no encontrar.
if (detectedLanguages.length === 0) {
    console.warn("No translation files found in src/i18n/translations/");
}
// --- FIN DE CAMBIOS ---


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: translations, // Aquí pasamos el objeto 'translations' que hemos construido dinámicamente

        // Aquí usamos la lista de idiomas detectados.
        // i18next automáticamente buscará el mejor match.
        // Si tu navegador es 'es-ES' y solo tienes 'es', lo usará.
        supportedLngs: detectedLanguages, // ¡NUEVA PROPIEDAD! Esto es importante para i18next

        // Idioma por defecto que se usará si no se detecta ningún idioma del navegador o si el detectado no está en supportedLngs
        lng: 'en', // Puedes dejarlo en un idioma por defecto o quitarlo si quieres que LanguageDetector sea el único que establezca el inicial.

        // Idioma de respaldo si no se encuentra una traducción para una clave específica en el idioma actual
        fallbackLng: 'en', // Asegúrate de que este idioma exista en tus archivos JSON.

        interpolation: {
            escapeValue: false // React ya escapa los valores para prevenir XSS
        },
        debug: false // Ponlo en 'true' para ver logs de i18next en la consola durante el desarrollo
    });

export default i18n;