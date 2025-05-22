// Archivo: components/pages/AboutUsPage.jsx
import React, { useEffect, useState } from 'react';
import { ChevronRight, Lightbulb, Users, Award, Home } from 'lucide-react';
import FadeInOnScroll from '../common/FadeInOnScroll';

const AboutUsPage = ({ setPage }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const simulatedContent = `
      <div class="space-y-8 md:space-y-12">
        <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">Nuestra Historia</h2>
        <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          El Mundo de Niby nació de una pasión compartida por la tecnología y el diseño...
        </p>
        <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight pt-12">Nuestra Visión</h2>
        <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Visualizamos un futuro donde la tecnología es una herramienta accesible y poderosa para todos...
        </p>
        <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight pt-12">Nuestro Equipo</h2>
        <div class="flex flex-col md:flex-row items-center md:space-x-8 mt-8">
          <div class="md:w-1/2 mb-6 md:mb-0">
            <img src="https://placehold.co/800x1000/cccccc/333333?text=Diego+Rodríguez" alt="Diego Rodríguez" class="rounded-2xl shadow-xl w-full h-auto object-cover" />
          </div>
          <div class="md:w-1/2 text-left">
            <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">CEO y Fundador</p>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">Diego Rodríguez (dewstouh)</h3>
            <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              ¡Hola! Soy Diego Rodríguez, conocido en la comunidad online como "dewstouh"...
            </p>
          </div>
        </div>
        <div class="mt-16 md:mt-24 text-center">
          <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 leading-tight">Aprende con "Coding with Dew"</h2>
          <div class="relative w-full max-w-2xl mx-auto h-64 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg flex items-center justify-center overflow-hidden mb-8">
            <img src="https://placehold.co/1280x720/e0e0e0/333333?text=Video+de+YouTube" alt="Placeholder de Video" class="w-full h-full object-cover" />
            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <a href="https://youtube.com/codingwithdew" target="_blank" rel="noopener noreferrer" class="inline-flex items-center bg-gray-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors shadow-lg hover:scale-105 transform">
                Visitar Coding with Dew <svg class="ml-2" width="20" height="20" fill="none"><path d="M5 12l5-5 5 5" stroke="currentColor" strokeWidth="2"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-16 md:mt-24 text-center">
          <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">Nuestra Filosofía</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
              <div class="mb-4 text-gray-700 dark:text-gray-300"><svg width="40" height="40"><Lightbulb /></svg></div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Innovación Constante</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Buscamos siempre las soluciones más creativas y tecnológicamente avanzadas.
              </p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
              <div class="mb-4 text-gray-700 dark:text-gray-300"><svg width="40" height="40"><Users /></svg></div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Colaboración Cercana</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Trabajamos mano a mano contigo para entender tu visión y materializarla.
              </p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
              <div class="mb-4 text-gray-700 dark:text-gray-300"><svg width="40" height="40"><Award /></svg></div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Calidad y Eficiencia</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Entregamos bots robustos y optimizados para el mejor rendimiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
    setContent(simulatedContent);
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"><p>Cargando contenido...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-red-500"><p>{error}</p></div>;

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInOnScroll>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12 leading-tight">
            Sobre El Mundo de Niby
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </FadeInOnScroll>
        <FadeInOnScroll delay={200}>
          <div className="text-center mt-12">
            <button
              onClick={() => setPage('home')}
              className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-full text-md font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Volver a Inicio <Home className="ml-2" size={18} />
            </button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default AboutUsPage;
