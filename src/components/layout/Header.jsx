import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, Sun, Moon, X, Menu } from 'lucide-react';

const Header = ({ navigateTo, transparentHeaderLightText = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme');
      if (savedMode) {
        return savedMode === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper functions for desktop header text colors (when transparent)
  const getTransparentTextColor = () => {
    if (transparentHeaderLightText) {
      return 'text-white';
    }
    return darkMode ? 'text-white' : 'text-gray-900';
  };

  const getTransparentLinkColor = () => {
    if (transparentHeaderLightText) {
      return 'text-gray-300';
    }
    return darkMode ? 'text-gray-300' : 'text-gray-600';
  };

  const getTransparentLinkHoverColor = () => {
    if (transparentHeaderLightText) {
      return 'hover:text-white';
    }
    return darkMode ? 'hover:text-white' : 'hover:text-gray-900';
  };

  // Helper function for mobile menu text colors (always contrasts with menu background)
  const getMobileMenuTextColor = () => {
    return darkMode ? 'text-gray-100' : 'text-gray-900';
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white/70 backdrop-blur-md dark:bg-gray-900/70 shadow-md'
      : 'bg-transparent'
      }`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Nombre de la empresa */}
        <a href="#" onClick={() => navigateTo('home')} className={`text-3xl font-bold rounded-md py-2 pl-4 transition-colors ${isScrolled
          ? 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
          : getTransparentTextColor()
          }`}>
          El Mundo de Niby
        </a>

        {/* Navegación a la derecha del logo (Desktop) */}
        <div className="hidden md:flex space-x-8 items-center ml-16">
          <a href="#" onClick={() => navigateTo('home')} className={`font-bold transition-colors rounded-md px-3 py-2 text-lg ${isScrolled
            ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
            : `${getTransparentLinkColor()} ${getTransparentLinkHoverColor()}`
            }`}>
            Inicio
          </a>
          <a href="#" onClick={() => navigateTo('servicios-section')} className={`font-bold transition-colors rounded-md px-3 py-2 text-lg ${isScrolled
            ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
            : `${getTransparentLinkColor()} ${getTransparentLinkHoverColor()}`
            }`}>
            Servicios
          </a>
          <a href="#" onClick={() => navigateTo('contact')} className={`font-bold transition-colors rounded-md px-3 py-2 text-lg ${isScrolled
            ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
            : `${getTransparentLinkColor()} ${getTransparentLinkHoverColor()}`
            }`}>
            Contacto
          </a>
          <a href="#" onClick={() => navigateTo('about')} className={`font-bold transition-colors rounded-md px-3 py-2 text-lg ${isScrolled
            ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
            : `${getTransparentLinkColor()} ${getTransparentLinkHoverColor()}`
            }`}>
            Sobre Nosotros
          </a>
        </div>

        {/* Botones de acción y modo oscuro (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center ml-auto">
          <button className="inline-flex items-center bg-gray-200 text-gray-900 px-5 py-3 rounded-full text-base font-semibold hover:bg-gray-300 transition-colors shadow-lg dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500">
            <UserPlus size={20} className="mr-2" /> Registrarse
          </button>
          <button className="inline-flex items-center bg-gray-900 text-white px-5 py-3 rounded-full text-base font-semibold hover:bg-gray-700 transition-colors shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600">
            <LogIn size={20} className="mr-2" /> Iniciar Sesión
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full transition-colors ${isScrolled
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              : `${getTransparentTextColor()} hover:bg-gray-200/50 dark:hover:bg-gray-700/50`
              }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={26} /> : <Moon size={26} />}
          </button>
        </div>

        {/* Mobile menu toggle and dark mode button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full transition-colors ${isScrolled
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              : `${getTransparentTextColor()} hover:bg-gray-200/50 dark:hover:bg-gray-700/50`
              }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={26} /> : <Moon size={26} />}
          </button>
          <button onClick={toggleMenu} className={`p-2 rounded-md transition-colors ${isScrolled
            ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800'
            : getTransparentTextColor() + ' focus:outline-none hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
            }`}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full
          ${darkMode ? 'bg-gray-900' : 'bg-white'}
          border-t border-gray-100 dark:border-gray-700 py-4 px-4 shadow-lg`}>
          <nav className="flex flex-col space-y-2">
            <a href="#" onClick={() => navigateTo('home')} className={`font-bold py-2 px-3 rounded-md transition-colors text-lg ${getMobileMenuTextColor()} hover:bg-gray-100 dark:hover:bg-gray-800`}>
              Inicio
            </a>
            <a href="#" onClick={() => navigateTo('servicios-section')} className={`font-bold py-2 px-3 rounded-md transition-colors text-lg ${getMobileMenuTextColor()} hover:bg-gray-100 dark:hover:bg-gray-800`}>
              Servicios
            </a>
            <a href="#" onClick={() => navigateTo('contact')} className={`font-bold py-2 px-3 rounded-md transition-colors text-lg ${getMobileMenuTextColor()} hover:bg-gray-100 dark:hover:bg-gray-800`}>
              Contacto
            </a>
            <a href="#" onClick={() => navigateTo('about')} className={`font-bold py-2 px-3 rounded-md transition-colors text-lg ${getMobileMenuTextColor()} hover:bg-gray-100 dark:hover:bg-gray-800`}>
              Sobre Nosotros
            </a>
            {/* Botón Registrarse con background */}
            <button className={`flex items-center justify-center font-medium py-2 px-3 rounded-md transition-colors text-base mt-4 // Added mt-4 for spacing
              ${darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600' // Dark mode colors for button
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300' // Light mode colors for button
              }`}>
              <UserPlus size={22} className="mr-2" /> Registrarse
            </button>
            {/* Botón Iniciar Sesión (manteniendo el estilo de enlace para diferenciarlos) */}
            <button className={`flex items-center justify-center font-medium py-2 px-3 rounded-md transition-colors text-base
              ${getMobileMenuTextColor()} hover:bg-gray-100 dark:hover:bg-gray-800`}>
              <LogIn size={22} className="mr-2" /> Iniciar Sesión
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;