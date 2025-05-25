// File: src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Asegúrate de importar useLocation si lo usas directamente aquí
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import ContactPage from './components/pages/ContactPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ShopPage from './components/pages/ShopPage';
import BotDetailPage from './components/pages/shop/BotDetailPage';
import CreateBotPage from './components/pages/CreateBotPage';
import ProtectedRoute from './components/auth/ProtectedRoute'; // Importar ProtectedRoute
import { handleSuccessfulLogin, handleLogout, checkLoginStatus } from './components/utils/auth';
import Chatbot from './components/layout/Chatbot';
import { MessageCircle, X } from 'lucide-react';
import ScrollToTop from './components/common/ScrollToTop';
import NotFoundPage from './components/pages/NotFoundPage';
import ProfileSettingsPage from './components/pages/ProfileSettingsPage';
import ServiceDetailPage from './components/pages/home/ServiceDetailPage';
import CartPage from './components/pages/CartPage';
import BotConfigurationPage from './components/pages/profile/bot/BotConfigurationPage';
import BotStatsPage from './components/pages/profile/bot/BotStatsPage';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);

  const getInitialDarkMode = () => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme');
      return savedMode === 'dark';
    }
    return false;
  };
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  // const location = useLocation(); // No es necesario aquí si LoginPage lo maneja

  const onLoginSuccess = (rawUserData, from) => { // rawUserData viene de performLogin o handleGoogleAuthSuccess
    handleSuccessfulLogin(setIsLoggedIn, setCurrentUser, rawUserData); // Esta función ahora procesa el nombre internamente
    navigate(from || '/', { replace: true });
  };

  const onRegisterSuccess = (rawUserData) => { // rawUserData viene de performRegister
    handleSuccessfulLogin(setIsLoggedIn, setCurrentUser, rawUserData); // Esta función ahora procesa el nombre internamente
    navigate('/');
  };

  const handleUpdateProfile = (updatedProfile) => {
    setCurrentUser(prev => ({ ...prev, ...updatedProfile }));
  };

  const handleDeleteAccount = () => {
    handleLogout(setIsLoggedIn, setCurrentUser, navigate);
  };

  useEffect(() => {
    checkLoginStatus(setIsLoggedIn, setCurrentUser);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
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
        onLogout={() => handleLogout(setIsLoggedIn, setCurrentUser, navigate)}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage heroScrollY={heroScrollY} />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:botId" element={<BotDetailPage />} />
          <Route
            path="/create-bot"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<CreateBotPage />} />
            }
          />
          
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} /> {/* Nueva Ruta Dinámica */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage onRegisterSuccess={onRegisterSuccess} />} />
          
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={
                  <ProfileSettingsPage
                    currentUser={currentUser}
                    onUpdateProfile={handleUpdateProfile}
                    onDeleteAccount={handleDeleteAccount}
                    onLogout={() => handleLogout(setIsLoggedIn, setCurrentUser, navigate)}
                  />
                }
              />
            }
          />
          <Route
            path="/profile/bots/:botId/configure"
            element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<BotConfigurationPage />} />}
          />
          <Route
            path="/profile/bots/:botId/stats"
            element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<BotStatsPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Chatbot y Footer sin cambios */}
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
          <Chatbot setIsChatbotOpen={setIsChatbotOpen} />
        </div>
      )}
      <Footer />
    </div>
  );
};

// AppWrapper no necesita cambios
const AppWrapper = () => (
  <Router>
    <ScrollToTop />
    <App />
  </Router>
);

export default AppWrapper;