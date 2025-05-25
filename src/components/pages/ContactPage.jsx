// File: components/pages/ContactPage.jsx
import React, { useState } from 'react';
import { MessageSquare, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import FadeInOnScroll from '../common/FadeInOnScroll';

const ContactPage = () => { 
  const navigate = useNavigate(); // Inicializa useNavigate

  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans"> {/* Reduced vertical padding */}
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInOnScroll>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8 leading-tight"> {/* Reduced mb */}
            Let's Talk Your Ideas
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed"> {/* Reduced mb */}
            Do you have an idea for a Discord bot? Do you need help with your online
            community or want to discuss a project? We are here to help.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={200}>
          <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl shadow-xl"> {/* Reduced padding here (p-5 instead of p-10) */}
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm"
                  placeholder="Tell us about your project or question..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:scale-105 transform dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-blue-800"
                >
                  Send Message <MessageSquare className="ml-3" size={24} />
                </button>
              </div>
            </form>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={400}>
          <div className="text-center mt-10"> {/* Reduced mt slightly */}
            <button
              onClick={() => navigate('/')} // Usa navigate para ir a la ruta raíz
              className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-full text-md font-semibold hover:bg-gray-700 transition duration-300 shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Back to Home <Home className="ml-2" size={18} />
            </button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default ContactPage;

// Suggested reusable styles (updated for compactness):
// .form-label = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
// .form-input = "w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm"
// .btn-primary = "inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg