// File: src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import ContactPage from './components/pages/ContactPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
// Asegúrate de importar las funciones de autenticación relevantes
import { handleSuccessfulLogin, handleLogout, checkLoginStatus } from './components/utils/auth';
import Chatbot from './components/layout/Chatbot';
import { MessageCircle, X } from 'lucide-react';
import ScrollToTop from './components/common/ScrollToTop';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // useNavigate hook para la navegación programática
  const navigate = useNavigate();

  // Define onLoginSuccess y onRegisterSuccess como funciones que utilizan handleSuccessfulLogin
  const onLoginSuccess = (userData) => {
    handleSuccessfulLogin(setIsLoggedIn, setCurrentUser, userData);
    navigate('/'); // Redirigir a la home después del login
  };

  // onRegisterSuccess debe ser similar a onLoginSuccess para manejar los datos del usuario después del registro
  const onRegisterSuccess = (userData) => {
    handleSuccessfulLogin(setIsLoggedIn, setCurrentUser, userData);
    navigate('/'); // Redirigir a la home después del registro
  };

  useEffect(() => {
    checkLoginStatus(setIsLoggedIn, setCurrentUser);
  }, []);


  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    // Manejo inicial del modo oscuro (al cargar la app)
    const savedMode = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedMode ? savedMode === 'dark' : prefersDark;
    setDarkMode(initialMode);

    if (initialMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []); // Se ejecuta una vez al montar

  useEffect(() => {
    // Actualiza la clase 'dark' en el <html> cuando darkMode cambia
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Guarda la preferencia del usuario
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Guarda la preferencia del usuario
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setHeroScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        heroScrollY={heroScrollY}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={() => handleLogout(setIsLoggedIn, setCurrentUser, navigate)} // Pasa la función 'navigate' directamente
      />
      <main className="flex-grow">
        {/* Usamos Routes y Route para definir las rutas */}
        <Routes>
          <Route path="/" element={<HomePage heroScrollY={heroScrollY} />} /> 
          <Route path="/about" element={<AboutUsPage />} /> 
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} /> 
          <Route path="/register" element={<RegisterPage onRegisterSuccess={onRegisterSuccess} />} /> 
          {/* Añadir aquí las rutas para /services y /specialties si son páginas separadas */}
          <Route path="/services" element={<p className="text-center text-xl mt-20 dark:text-white">Services Page (Coming Soon)</p>} />
          <Route path="/specialties" element={<p className="text-center text-xl mt-20 dark:text-white">Specialties Page (Coming Soon)</p>} />

          {/* Ruta para 404 Not Found */}
          <Route path="*" element={<p className="text-center text-xl mt-20 dark:text-white">404: Page Not Found</p>} />
        </Routes>
      </main>

      {/* Botón flotante de soporte */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="bg-gray-900 text-white p-4 rounded-full shadow-lg
            hover:bg-gray-700
            transform hover:scale-110
            transition duration-300
            focus:outline-none
            dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Abrir chat de soporte"
        >
          {isChatbotOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* Modal/Overlay del Chatbot */}
      {isChatbotOpen && (
        <div className="
          fixed bottom-20 right-6 z-50
          w-80 md:w-96
          h-[calc(100vh-120px)]
          max-h-[600px]
          bg-white dark:bg-gray-800 rounded-lg shadow-2xl
          flex flex-col
          transition-all duration-300 ease-in-out transform origin-bottom
        ">
        
          <Chatbot onClose={() => setIsChatbotOpen(false)} />
        </div>
      )}
     
      <Footer />
    </div>
  );
};

// <Router> debe envolver todo el componente App para que los hooks de enrutamiento funcionen
const AppWrapper = () => (
  <Router>
    <ScrollToTop />
    <App />
  </Router>
);

export default AppWrapper;