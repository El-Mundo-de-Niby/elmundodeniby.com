// Archivo: components/pages/ContactPage.jsx
import React, { useState } from 'react';
import { MessageSquare, Calendar, ChevronRight, Home } from 'lucide-react';
import FadeInOnScroll from '../common/FadeInOnScroll';

const ContactPage = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'meeting'

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInOnScroll>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12 leading-tight">
            Hablemos de tu Proyecto
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center mb-10 leading-relaxed">
            ¿Tienes una idea para un bot de Discord? ¿Necesitas ayuda con tu comunidad
            online o quieres discutir un proyecto? Estamos aquí para ayudarte.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={200}>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
            {/* Tabs */}
            <div className="flex justify-center mb-8 border-b border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('form')}
                className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 ${activeTab === 'form'
                    ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-700 dark:border-gray-300' // Darker border for active tab
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  } flex items-center`}
              >
                <MessageSquare size={20} className="mr-2" /> Formulario de Contacto
              </button>
              <button
                onClick={() => setActiveTab('meeting')}
                className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 ${activeTab === 'meeting'
                    ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-700 dark:border-gray-300' // Darker border for active tab
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  } flex items-center`}
              >
                <Calendar size={20} className="mr-2" /> Reservar una Reunión
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'form' && (
              <div className="space-y-6">
                <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
                  Rellena el formulario con los detalles de tu proyecto o pregunta. Te responderemos a la brevedad.
                </p>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Asunto</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Asunto de tu mensaje"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Enviar Mensaje
                </button>
              </div>
            )}

            {activeTab === 'meeting' && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Para reservar una reunión, por favor, contáctanos directamente por email o a través del formulario de contacto y coordinaremos una cita.
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  ¡Esperamos hablar contigo pronto!
                </p>
              </div>
            )}
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={300}>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Únete a Nuestra Comunidad</h3>
            <p className="text-md text-gray-700 dark:text-gray-300 mb-6">
              Conéctate con otros usuarios, haz preguntas y mantente al día con las novedades.
            </p>
            <a
              href="https://discord.gg/elmundodeniby" // Updated Discord link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors shadow-lg hover:scale-105 transform"
            >
              Entrar al Servidor de Discord <ChevronRight className="ml-2" size={20} />
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">¡Te esperamos!</p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={400}>
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

export default ContactPage;

// Estilos reutilizables sugeridos:
// .form-label = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
// .form-input = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
// .btn-primary = "inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
// .tab-btn = "py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 flex items-center"
// .tab-active = "text-gray-900 dark:text-gray-100 border-b-2 border-gray-700 dark:border-gray-300"