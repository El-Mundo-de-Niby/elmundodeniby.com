/* Archivo principal App.jsx (src/App.jsx) */

import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import ContactPage from './components/pages/ContactPage';
import Chatbot from './components/common/Chatbot';
import { MessageCircle, X } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const navigateTo = (target) => {
    if (["home", "about", "contact"].includes(target)) {
      setCurrentPage(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const section = document.getElementById(target);
          section?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const section = document.getElementById(target);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
    if (target !== 'home' && target !== 'contact') setIsChatbotOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setHeroScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="font-inter min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 transition-colors">
      <Header
        navigateTo={navigateTo}
        transparentHeaderLightText={currentPage === 'home'} // Set to true for homepage
      />
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage heroScrollY={heroScrollY} navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutUsPage setPage={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage setPage={setCurrentPage} />}
      </main>
      {/* Botón flotante de soporte */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Abrir chat de soporte"
        >
          {isChatbotOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* Modal/Overlay del Chatbot */}
      {isChatbotOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[500px] md:w-96 md:h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right scale-100">
          <Chatbot navigateTo={navigateTo} setIsChatbotOpen={setIsChatbotOpen} /> {/* Pass navigateTo and setIsChatbotOpen props */}
        </div>
      )}
      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;