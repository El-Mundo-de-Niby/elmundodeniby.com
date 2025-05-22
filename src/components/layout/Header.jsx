// Archivo: components/layout/Header.jsx
import React from 'react';
import {
    Home, Briefcase, Sparkles, Users, Info, Mail, Menu, X, Sun, Moon
} from 'lucide-react';

const Header = ({ darkMode, setDarkMode, navigateTo, isMenuOpen, setIsMenuOpen }) => {
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                      <a href="#" onClick={() => navigateTo('home')} className="text-2xl font-bold text-gray-900 dark:text-gray-100 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        El Mundo de Niby
                      </a>
                      <div className="hidden md:flex space-x-6 items-center">
                        <a href="#" onClick={() => navigateTo('home')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <Home size={20} className="mr-1" /> Inicio
                        </a>
                        <a href="#" onClick={() => navigateTo('servicios-section')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <Briefcase size={20} className="mr-1" /> Servicios
                        </a>
                        <a href="#" onClick={() => navigateTo('especialidades-section')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <Sparkles size={20} className="mr-1" /> Nuestros Bots
                        </a>
                        <a href="#" onClick={() => navigateTo('clientes-section')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <Users size={20} className="mr-1" /> Clientes
                        </a>
                        <a href="#" onClick={() => navigateTo('about')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <Info size={20} className="mr-1" /> Sobre Nosotros
                        </a>
                        <a href="#" onClick={() => navigateTo('contact')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                          <Mail size={20} className="mr-1" /> Contacto
                        </a>
                        <button
                          onClick={() => setDarkMode(!darkMode)}
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          aria-label="Toggle dark mode"
                        >
                          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                      </div>
                      <div className="md:hidden flex items-center space-x-2">
                        <button
                          onClick={() => setDarkMode(!darkMode)}
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          aria-label="Toggle dark mode"
                        >
                          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                        <button onClick={toggleMenu} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                      </div>
                    </nav>
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 py-4 px-4">
                    <nav className="flex flex-col space-y-2">
                        <a onClick={() => navigateTo('home')} className="mobile-link"><Home size={20} className="mr-2" /> Inicio</a>
                        <a onClick={() => navigateTo('servicios-section')} className="mobile-link"><Briefcase size={20} className="mr-2" /> Servicios</a>
                        <a onClick={() => navigateTo('especialidades-section')} className="mobile-link"><Sparkles size={20} className="mr-2" /> Nuestros Bots</a>
                        <a onClick={() => navigateTo('clientes-section')} className="mobile-link"><Users size={20} className="mr-2" /> Clientes</a>
                        <a onClick={() => navigateTo('about')} className="mobile-link"><Info size={20} className="mr-2" /> Sobre Nosotros</a>
                        <a onClick={() => navigateTo('contact')} className="mobile-link"><Mail size={20} className="mr-2" /> Contacto</a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;