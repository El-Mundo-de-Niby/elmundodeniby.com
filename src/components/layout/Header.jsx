// File: components/layout/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Sun, Moon, X, Menu, LogOut, User, Settings, UserCircle, ShoppingBag, ChevronDown, ShoppingCart } from 'lucide-react';

const Header = ({ isLoggedIn, currentUser, onLogout, darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target) &&
        profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Shop', path: '/shop' },
    { name: 'Create Bot', path: '/create-bot' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const headerBaseClass = "transition-colors duration-300 ease-in-out";
  const scrolledHeaderBg = darkMode ? "bg-gray-900/80 backdrop-blur-lg shadow-lg" : "bg-white/80 backdrop-blur-lg shadow-lg";
  const transparentHeaderBg = "bg-transparent";

  // Determinar colores basados en scroll y darkMode
  // Estos se aplican a elementos que deben cambiar de color pero no necesariamente de fondo
  const dynamicTextColor = isScrolled || !darkMode ? "text-gray-700 dark:text-gray-300" : "text-white";
  const dynamicHoverTextColor = isScrolled || !darkMode ? "hover:text-blue-600 dark:hover:text-blue-400" : "hover:text-gray-200";
  const dynamicHoverBgColor = isScrolled || !darkMode ? "hover:bg-gray-100 dark:hover:bg-gray-800" : "hover:bg-white/10";

  const dynamicIconColor = isScrolled || !darkMode ? "text-gray-600 dark:text-gray-400" : "text-gray-300";
  const dynamicIconHoverColor = isScrolled || !darkMode ? "hover:text-blue-600 dark:hover:text-blue-400" : "hover:text-white";


  if (!isMounted) {
    return <header className={`fixed top-0 left-0 w-full z-50 h-[72px] ${headerBaseClass} ${darkMode ? 'bg-gray-900' : 'bg-white'}`}></header>;
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${headerBaseClass} ${isScrolled ? scrolledHeaderBg : transparentHeaderBg}`}>
      <nav className="container mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center h-[72px]">
        <Link
          to='/'
          className={`text-2xl font-bold ${headerBaseClass} ${isScrolled || !darkMode ? 'text-gray-900 dark:text-gray-100' : 'text-white'}`}
        >
          El Mundo de Niby
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-bold text-base px-3 py-2 rounded-md ${headerBaseClass} ${dynamicTextColor} ${dynamicHoverTextColor} ${dynamicHoverBgColor}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn && (
            <button
              onClick={() => navigate('/cart')}
              aria-label="Shopping Cart"
              title="Shopping Cart"
              className={`p-2 rounded-full ${headerBaseClass} ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
            >
              <ShoppingCart size={20} />
            </button>
          )}

          {isLoggedIn ? (
            <div className="relative">
              <button
                ref={profileButtonRef}
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`flex items-center space-x-2 pl-2 pr-1.5 py-1.5 rounded-full ${headerBaseClass} ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
              >
                {currentUser?.photo ? (
                  <img
                    src={currentUser.photo}
                    alt="User"
                    referrerpolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-gray-400 dark:border-gray-600"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'U')}&background=0D8ABC&color=fff&size=28`; }}
                  />
                ) : (
                  <UserCircle size={24} className={`${dynamicIconColor}`} />
                )}
                {/* Nombre de usuario añadido aquí */}
                <span className={`text-sm font-medium hidden sm:inline ${dynamicTextColor}`}>
                  {decodeURIComponent(escape(currentUser?.name)) || "Account"}
                </span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''} ${dynamicIconColor}`} />
              </button>

              <div
                ref={profileMenuRef}
                className={`absolute right-0 mt-2 w-60 rounded-lg shadow-xl py-1
                            ${darkMode ? 'bg-gray-800/95 border border-gray-700/50' : 'bg-white/95 border border-gray-200/70'}
                            backdrop-blur-sm ${headerBaseClass}
                            transform origin-top-right transition-all duration-150 ease-out
                            ${isProfileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                role="menu"
              >
                <div className="px-3.5 py-2.5 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate" title={currentUser?.email}>
                    {currentUser?.email}
                  </p>
                </div>
                <div className="py-1">
                  {[
                    { label: 'Profile', path: '/profile', icon: UserCircle },
                    { label: 'Settings', path: '/profile/settings', icon: Settings }
                  ].map(item => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`flex items-center w-full px-3.5 py-2 text-sm 
                                  ${darkMode ? 'text-gray-300 hover:bg-gray-700/70 hover:text-white' : 'text-gray-700 hover:bg-gray-100'}
                                  ${headerBaseClass} rounded-md mx-1 my-0.5`}
                      role="menuitem"
                    >
                      <item.icon size={16} className="mr-2 text-gray-500 dark:text-gray-400" /> {item.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 mx-1"></div>
                <button
                  onClick={() => { onLogout(navigate); setIsProfileMenuOpen(false); }}
                  className={`flex items-center w-[calc(100%-0.5rem)] mx-1 my-0.5 text-left px-3.5 py-2 text-sm rounded-md
                              ${darkMode ? 'text-red-400 hover:bg-red-500/20 hover:text-red-300' : 'text-red-600 hover:bg-red-500/10'}
                              ${headerBaseClass}`}
                  role="menuitem"
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button onClick={() => navigate('login')} className={`font-medium text-sm px-4 py-1.5 rounded-full ${headerBaseClass} ${dynamicTextColor} ${dynamicHoverTextColor} ${dynamicHoverBgColor}`}>
                Log In
              </button>
              <button onClick={() => navigate('register')}
                className={`font-medium text-sm px-4 py-1.5 rounded-full border-2 
                            ${isScrolled || !darkMode
                    ? 'text-blue-600 border-blue-500 hover:bg-blue-500/10 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400/10'
                    : 'text-white border-white/80 hover:bg-white/10'
                  } ${headerBaseClass}`}>
                Register
              </button>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title="Toggle theme"
            className={`p-2 rounded-full ${headerBaseClass} ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          {isLoggedIn && (
            <button
              onClick={() => navigate('/cart')}
              aria-label="Shopping Cart"
              title="Shopping Cart"
              className={`p-2 rounded-full ${headerBaseClass} ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
            >
              <ShoppingCart size={22} />
            </button>
          )}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title="Toggle theme"
            className={`p-2 rounded-full ${headerBaseClass} ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-md ${headerBaseClass} ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden fixed inset-0 top-[72px] z-40
                        ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'}
                        backdrop-blur-md 
                        ${headerBaseClass} transition-opacity duration-300 ease-in-out`}
          onClick={() => setIsMenuOpen(false)}
        >
          <nav
            className="h-full flex flex-col p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <Link
                key={`mobile-${item.name}`}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-semibold text-lg py-3.5 px-3 rounded-lg ${headerBaseClass}
                            ${darkMode ? 'text-gray-200 hover:bg-gray-700/70' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 space-y-2">
              {isLoggedIn ? (
                <>
                  <div className={`flex items-center px-3 py-2.5 mb-1`}>
                    {currentUser?.photo ? (
                      <img
                        src={currentUser.photo} alt={decodeURIComponent(escape(currentUser?.name)) || 'User'}
                        className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-300 dark:border-gray-600"
                        referrerpolicy="no-referrer"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'U')}&background=0D8ABC&color=fff&size=40`; }}
                      />
                    ) : (
                      <UserCircle size={40} className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                    <div>
                      <p className={`text-base font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{decodeURIComponent(escape(currentUser?.name)) || 'User Account'}</p>
                      <p className={`text-sm text-gray-500 dark:text-gray-400 truncate`}>{currentUser?.email}</p>
                    </div>
                  </div>
                  <Link to='/profile' onClick={() => setIsMenuOpen(false)} className={`flex items-center font-semibold py-3.5 px-3 rounded-lg ${headerBaseClass} ${darkMode ? 'text-gray-200 hover:bg-gray-700/70' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <UserCircle size={20} className="mr-3 text-gray-500 dark:text-gray-400" /> Profile
                  </Link>
                  <Link to='/profile/settings' onClick={() => setIsMenuOpen(false)} className={`flex items-center font-semibold py-3.5 px-3 rounded-lg ${headerBaseClass} ${darkMode ? 'text-gray-200 hover:bg-gray-700/70' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <Settings size={20} className="mr-3 text-gray-500 dark:text-gray-400" /> Settings
                  </Link>
                  <button onClick={() => { onLogout(navigate); setIsMenuOpen(false); }} className={`w-full flex items-center text-left font-semibold py-3.5 px-3 rounded-lg ${headerBaseClass} ${darkMode ? 'text-red-400 hover:bg-red-500/20' : 'text-red-600 hover:bg-red-500/10'}`}>
                    <LogOut size={20} className="mr-3" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to='/login' onClick={() => setIsMenuOpen(false)} className={`block w-full text-center font-semibold py-3 px-3 rounded-lg ${headerBaseClass} ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Log In</Link>
                  <Link to='/register' onClick={() => setIsMenuOpen(false)} className={`block w-full text-center font-semibold py-3 px-3 rounded-lg border-2 ${headerBaseClass} ${darkMode ? 'text-blue-400 border-blue-400 hover:bg-blue-400/10' : 'text-blue-600 border-blue-500 hover:bg-blue-500/10'}`}>Register</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;