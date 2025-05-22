/* Archivo principal App.jsx (src/App.jsx) */

import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import ContactPage from './components/pages/ContactPage';
import Chatbot from './components/common/Chatbot';

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
      <Header darkMode={darkMode} setDarkMode={setDarkMode} navigateTo={navigateTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage heroScrollY={heroScrollY} navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutUsPage setPage={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage setPage={setCurrentPage} />}
      </main>
      {isChatbotOpen && <Chatbot navigateTo={navigateTo} setIsChatbotOpen={setIsChatbotOpen} />}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        {isChatbotOpen ? 'X' : '💬'}
      </button>
      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;