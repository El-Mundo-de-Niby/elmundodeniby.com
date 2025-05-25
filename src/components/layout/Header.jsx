// File: components/layout/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { LogIn, UserPlus, Sun, Moon, X, Menu, LogOut, User, Settings, UserCircle } from 'lucide-react';
const Header = ({ transparentHeaderLightText = false, transparentHeaderDarkText = false, isLoggedIn, currentUser, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate(); // Import useNavigate from react-router-dom

  // Setup theme correctly before anything renders
  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedMode ? savedMode === 'dark' : prefersDark;
    setDarkMode(initialMode);

    if (initialMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode, isMounted]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for clicking outside the profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target) &&
        profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const getTransparentTextColor = () => {
    return darkMode ? 'text-white' : 'text-gray-900';
  };

  const getTransparentLinkColor = () => {
    return darkMode ? 'text-gray-300' : 'text-gray-600';
  };

  const getTransparentLinkHoverColor = () => {
    return darkMode ? 'hover:text-white' : 'hover:text-gray-900';
  };

  const getMobileMenuTextColor = () => {
    return darkMode ? 'text-gray-100' : 'text-gray-900';
  };

  if (!isMounted) return null;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white/70 backdrop-blur-md dark:bg-gray-900/70 shadow-md'
      : 'bg-transparent'
      }`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
        key='Home' 
        to='/' 
        className={`text-3xl font-bold rounded-md py-2 transition-colors ${isScrolled
          ? 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
          : getTransparentTextColor()
          }`}>
          El Mundo de Niby
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center ml-16">
          {[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' }, // Assuming a /services route
            { name: 'Contact', path: '/contact' },
            { name: 'About Us', path: '/about' }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path} // Use 'to' prop for Link
              className={`font-bold transition-colors rounded-md px-3 py-2 text-lg ${isScrolled
                ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                : `${getTransparentLinkColor()} ${getTransparentLinkHoverColor()}`
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Login/User Info, Register, and Dark Mode Toggle */}
        <div className="hidden md:flex space-x-6 items-center ml-auto">
          {isLoggedIn ? (
            <div className="relative">
              <button
                ref={profileButtonRef}
                onClick={toggleProfileMenu}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200
                  ${isScrolled
                    ? 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                    : `${getTransparentTextColor()} hover:bg-gray-200/50 dark:hover:bg-gray-700/50`
                  }
                  ${isProfileMenuOpen ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}
                `}
              >
                {/* Profile Image Display */}
                {currentUser && currentUser.photo ? (
                  <img
                    src={currentUser.photo}
                    alt={currentUser.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=0D8ABC&color=fff`;
                    }}
                  />
                ) : (
                  <User size={20} className="text-gray-500 dark:text-gray-400" />
                )}
                {/* Display User Name */}
                <span className="font-semibold whitespace-nowrap">{decodeURIComponent(escape(currentUser?.name))}</span>
              </button>

              {/* Profile Dropdown Menu - Apple-style with refined spacing and text handling */}
              {isProfileMenuOpen && (
                <div
                  ref={profileMenuRef}
                  className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl py-2
                    ${darkMode ? 'bg-gray-700/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'}
                    ring-1 ring-gray-900/10 dark:ring-white/10
                    transform origin-top-right
                    transition-all duration-300 ease-out
                    ${isProfileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
                  `}
                  role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1"
                >
                  {/* Email display - Added overflow-hidden and text-ellipsis */}
                  <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    Signed in as <span className="font-medium text-gray-900 dark:text-gray-100">{currentUser?.email || 'user@example.com'}</span>
                  </div>
                  {/* Profile Link */}
                  <a  onClick={() => { navigate('profile'); setIsProfileMenuOpen(false); }} className={`flex items-center px-4 py-2 text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg mx-2 transition-colors duration-150`} role="menuitem" tabIndex="-1" id="user-menu-item-0">
                    <UserCircle size={20} className="mr-3" /> Profile
                  </a>
                  {/* Settings Link */}
                  <a  onClick={() => { navigate('settings'); setIsProfileMenuOpen(false); }} className={`flex items-center px-4 py-2 text-base ${darkMode ? 'text-gray-200' : 'text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg mx-2 transition-colors duration-150`} role="menuitem" tabIndex="-1" id="user-menu-item-1">
                    <Settings size={20} className="mr-3" /> Settings
                  </a>
                  <div className="border-t border-gray-200 dark:border-gray-600 my-2 mx-2"></div>
                  {/* Logout Button */}
                  <button
                    onClick={() => { onLogout(navigate); setIsProfileMenuOpen(false); }}
                    className={`flex items-center w-full text-left px-4 py-2 text-base text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-300 rounded-lg mx-2 transition-colors duration-150`} role="menuitem" tabIndex="-1" id="user-menu-item-2"
                  >
                    <LogOut size={20} className="mr-3" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate('register')}
                className="inline-flex items-center bg-gray-200 text-gray-900 px-5 py-3 rounded-full text-base font-semibold hover:bg-gray-300 transition-colors shadow-lg dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
              >
                <UserPlus size={20} className="mr-2" /> Register
              </button>
              <button
                onClick={() => navigate('login')}
                className="inline-flex items-center bg-gray-900 text-white px-5 py-3 rounded-full text-base font-semibold hover:bg-gray-700 transition-colors shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <LogIn size={20} className="mr-2" /> Log In
              </button>
            </>
          )}

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

        {/* Mobile Menu Toggle and Dark Mode Toggle */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full
          ${darkMode ? 'bg-gray-900' : 'bg-white'}
          border-t border-gray-100 dark:border-gray-700 py-4 px-4 shadow-lg`}>
          <nav className="flex flex-col space-y-2">
            {/* Mobile Navigation Links */}
            {['home', 'servicios-section', 'contact', 'about'].map((section, i) => (
              <a
                key={section}
                
                onClick={() => { navigate(section); setIsMenuOpen(false); }}
                className={`font-bold py-2 px-3 rounded-md transition-colors text-lg ${getMobileMenuTextColor()} hover:bg-gray-100 dark:hover:bg-gray-800`}
              >
                {['Home', 'Services', 'Contact', 'About Us'][i]}
              </a>
            ))}
            {isLoggedIn ? (
              <>
                {/* User Info in Mobile Menu Header */}
                <div className={`flex items-center font-medium py-2 px-3 rounded-md transition-colors text-base ${getMobileMenuTextColor()} mt-4`}>
                  {currentUser && currentUser.photo ? (
                    <img
                      src={currentUser.photo}
                      alt={currentUser.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover mr-2 border border-gray-300 dark:border-gray-600"
                      referrerpolicy="no-referrer"
                    />
                  ) : (
                    <User size={22} className="mr-2" />
                  )}
                  {currentUser?.name || 'User'}
                </div>
                {/* Mobile Profile Menu Options */}
                <a  onClick={() => { navigate('profile'); setIsMenuOpen(false); }} className={`flex items-center font-medium py-2 px-3 rounded-md transition-colors text-base ${getMobileMenuTextColor()} hover:bg-gray-100 dark:hover:bg-gray-800`}>
                  <UserCircle size={22} className="mr-2" /> Profile
                </a>
                <a  onClick={() => { navigate('settings'); setIsMenuOpen(false); }} className={`flex items-center font-medium py-2 px-3 rounded-md transition-colors text-base ${getMobileMenuTextColor()} hover:bg-gray-100 dark:hover:bg-gray-800`}>
                  <Settings size={22} className="mr-2" /> Settings
                </a>
                <button
                  onClick={() => { onLogout(navigate); setIsMenuOpen(false); }}
                  className={`flex items-center justify-center font-medium py-2 px-3 rounded-md transition-colors text-base
                    ${darkMode
                      ? 'bg-red-700 text-white hover:bg-red-600'
                      : 'bg-red-600 text-white hover:bg-red-700'}`}
                >
                  <LogOut size={22} className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                {/* Mobile Register Button */}
                <button
                  onClick={() => { navigate('register'); setIsMenuOpen(false); }}
                  className={`flex items-center justify-center font-medium py-2 px-3 rounded-md transition-colors text-base mt-4
                    ${darkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
                >
                  <UserPlus size={22} className="mr-2" /> Register
                </button>
                {/* Mobile Log In Button */}
                <button
                  onClick={() => { navigate('login'); setIsMenuOpen(false); }}
                  className={`flex items-center justify-center font-medium py-2 px-3 rounded-md transition-colors text-base
                    ${getMobileMenuTextColor()} hover:bg-gray-100 dark:hover:bg-gray-800`}
                >
                  <LogIn size={22} className="mr-2" /> Log In
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;