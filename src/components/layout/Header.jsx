// File: components/layout/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Sun, Moon, X, Bell, Menu, LogOut, User, Settings, UserCircle, ShoppingBag, ChevronDown, ShoppingCart, Code, Server, Power, CreditCard, Info, CheckCheck, Shield, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';


// Datos de ejemplo para notificaciones
const initialNotifications = [
  { id: 1, title: 'Bot Deployed!', message: 'Your new bot "Moderador Pro" is now online.', timestamp: new Date(Date.now() - 3600000 * 1), isRead: false, link: '/profile/bots/userbot001/configure/home', type: 'bot_status' },
  { id: 2, title: 'Subscription Renewal', message: 'Your plan for "DJ Melodía" will renew in 3 days.', timestamp: new Date(Date.now() - 3600000 * 5), isRead: false, link: '/profile/bots/userbot002/configure/plan', type: 'billing' },
  { id: 3, title: 'New Feature Added', message: 'Check out the new "Economy" module available for custom bots.', timestamp: new Date(Date.now() - 3600000 * 24 * 2), isRead: true, link: '/create-bot', type: 'update' },
  { id: 4, title: 'Maintenance Alert', message: 'Scheduled maintenance on Sunday at 03:00 AM UTC.', timestamp: new Date(Date.now() - 3600000 * 24 * 3), isRead: true, link: '#', type: 'security' },
];

const notificationIcons = {
  bot_status: <Power size={16} className="text-green-500" />,
  billing: <CreditCard size={16} className="text-orange-500" />,
  update: <Info size={16} className="text-blue-500" />,
  report: <CheckCheck size={16} className="text-purple-500" />,
  security: <Shield size={16} className="text-red-500" />,
  default: <Mail size={16} className="text-gray-500" />,
};


const Header = ({ darkMode, toggleDarkMode }) => {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate();

  // Estados para notificaciones
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationsMenuRef = useRef(null);
  const notificationsButtonRef = useRef(null);

  // Calcular notificaciones no leídas
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.isRead).length);
  }, [notifications]);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      // Solo actualiza isScrolled si el body NO está en position:fixed
      // (porque window.scrollY será engañoso en ese caso)
      // Sin embargo, para este problema, es mejor cambiar la lógica del fondo del header.
      // Dejaremos este useEffect como está por ahora, ya que el cambio principal es en la clase del header.
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Chequeo inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileButtonRef.current && !profileButtonRef.current.contains(event.target) &&
        profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationsButtonRef.current && !notificationsButtonRef.current.contains(event.target) &&
        notificationsMenuRef.current && !notificationsMenuRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const body = document.body;
    const html = document.documentElement;
    if (isMenuOpen) {
      const originalBodyOverflow = body.style.overflow;
      const originalHtmlOverflow = html.style.overflow;
      const originalBodyPosition = body.style.position;
      const originalBodyTop = body.style.top;
      const originalBodyWidth = body.style.width;
      const currentScrollY = window.scrollY;
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${currentScrollY}px`;
      body.style.width = '100%';
      return () => {
        body.style.overflow = originalBodyOverflow;
        html.style.overflow = originalHtmlOverflow;
        body.style.position = originalBodyPosition;
        body.style.top = originalBodyTop;
        body.style.width = originalBodyWidth;
        window.scrollTo(0, currentScrollY);
      };
    }
  }, [isMenuOpen]);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleNotificationsMenu = () => setIsNotificationsOpen(!isNotificationsOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Shop', path: '/shop' },
    { name: 'Create Bot', path: '/create-bot' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
    // En una app real, harías una llamada a la API aquí
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    // En una app real, harías una llamada a la API aquí
  };

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id);
    setIsNotificationsOpen(false); // Cerrar panel
    if (notification.link && notification.link !== '#') {
      navigate(notification.link);
    }
  };

  const headerBaseClass = "transition-colors duration-300 ease-in-out";
  // Removed getDynamicColor as it was replaced by more specific dynamic variables

  const scrolledHeaderBg = darkMode ? "bg-gray-900/80 backdrop-blur-lg shadow-lg" : "bg-white/80 backdrop-blur-lg shadow-lg";
  const transparentHeaderBg = "bg-transparent";

  const dynamicTextColor = isScrolled || !darkMode ? "text-gray-700 dark:text-gray-300" : "text-white";
  const dynamicHoverTextColor = isScrolled || !darkMode ? "hover:text-blue-600 dark:hover:text-blue-400" : "hover:text-gray-200";
  const dynamicHoverBgColor = isScrolled || !darkMode ? "hover:bg-gray-100 dark:hover:bg-gray-800" : "hover:bg-white/10";

  const dynamicIconColor = isScrolled || !darkMode ? "text-gray-600 dark:text-gray-400" : "text-gray-300";
  const dynamicIconHoverColor = isScrolled || !darkMode ? "hover:text-blue-600 dark:hover:text-blue-400" : "hover:text-white";


  if (!isMounted) {
    // Simplified initial header before mount to prevent flash of unstyled content
    // Ensuring it has a background from the start based on darkMode
    return <header className={`fixed top-0 left-0 w-full z-50 h-[72px] ${headerBaseClass} ${darkMode ? 'bg-gray-900' : 'bg-white'}`}></header>;
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: "easeOut" } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${headerBaseClass} ${isScrolled  ? scrolledHeaderBg : transparentHeaderBg}`}>
      <nav className={`${isScrolled || isMenuOpen ? "bg-white" : "bg-transparent"} container mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center h-[72px]`}>
        <Link
          to='/'
          className={`text-2xl font-bold ${isScrolled || !darkMode ? 'text-gray-900 dark:text-gray-100' : 'text-white'}`}
        >
          El Mundo de Niby
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-bold text-base px-3 py-2 rounded-md ${dynamicTextColor} ${dynamicHoverTextColor} ${dynamicHoverBgColor}`}
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
              className={`p-2 rounded-full ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
            >
              <ShoppingCart size={20} />
            </button>
          )}

          {/* Botón de Notificaciones */}
          {isLoggedIn && (
            <div className="relative">
              <button ref={notificationsButtonRef} onClick={toggleNotificationsMenu} aria-label="Notifications" title="Notifications"
                className={`p-2.5 rounded-full relative ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}>
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className={`absolute top-1.5 right-1.5 flex h-2.5 w-2.5`}>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                )}
              </button>
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    ref={notificationsMenuRef}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className={`absolute right-0 mt-3 w-80 sm:w-[360px] rounded-xl shadow-2xl 
                                  ${darkMode ? 'bg-gray-800/90 border border-gray-700/70' : 'bg-white/90 border border-gray-200/80'}
                                  backdrop-blur-md overflow-hidden`} // Removed headerBaseClass here, was redundant
                    role="menu">
                    <div className="flex justify-between items-center px-4 pt-3 pb-2 border-b border-gray-200 dark:border-gray-700/70">
                      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
                      {notifications.length > 0 && unreadCount > 0 && (
                        <button onClick={markAllAsRead}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
                          Mark all as read
                        </button>
                      )}
                    </div>
                    {notifications.length === 0 ? (
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-10 px-4">You're all caught up!</p>
                    ) : (
                      <div className="max-h-[340px] overflow-y-auto custom-scrollbar">
                        {notifications.map(notif => (
                          <div key={notif.id} onClick={() => handleNotificationClick(notif)}
                            className={`px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-700/50 last:border-b-0
                                        ${darkMode ? 'hover:bg-gray-700/60' : 'hover:bg-gray-50'} transition-colors group`}>
                            <div className="flex items-start space-x-3">
                              <div className="mt-0.5 flex-shrink-0">
                                {!notif.isRead ?
                                  <span className="w-2 h-2 bg-blue-500 rounded-full block mt-1"></span> :
                                  <span className="w-2 h-2 bg-transparent rounded-full block mt-1"></span>
                                }
                              </div>
                              <div className={`flex-grow ${notif.isRead ? 'opacity-70' : ''}`}>
                                <div className="flex items-center justify-between">
                                  <p className={`text-sm font-semibold ${notif.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>{notif.title}</p>
                                  <div className="ml-2 flex-shrink-0">
                                    {notificationIcons[notif.type] || notificationIcons.default}
                                  </div>
                                </div>
                                <p className={`text-xs text-gray-500 dark:text-gray-400 ${notif.isRead ? '' : 'dark:text-gray-300'} line-clamp-2`}>{notif.message}</p>
                                <p className="text-[0.7rem] text-gray-400 dark:text-gray-500 mt-1">
                                  {new Date(notif.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-700/70 bg-gray-50/50 dark:bg-gray-800/50">
                      <Link to="/notifications" onClick={() => setIsNotificationsOpen(false)}
                        className="block w-full text-center px-4 py-2.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {/* Fin Botón de Notificaciones */}

          {isLoggedIn ? (
            <div className="relative">
              <button
                ref={profileButtonRef}
                onClick={toggleProfileMenu} // Changed to toggleProfileMenu for consistency
                className={`flex items-center space-x-2 pl-2 pr-1.5 py-1.5 rounded-full ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
              >
                {currentUser?.photo ? (
                  <img
                    src={currentUser.photo}
                    alt="User"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-gray-400 dark:border-gray-600"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'U')}&background=0D8ABC&color=fff&size=28`; }}
                  />
                ) : (
                  <UserCircle size={24} className={`${dynamicIconColor}`} />
                )}
                <span className={`text-sm font-medium hidden sm:inline ${dynamicTextColor}`}>
                  {currentUser?.name ? decodeURIComponent(escape(currentUser.name)) : "Account"}
                </span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''} ${dynamicIconColor}`} />
              </button>

              {/* Using AnimatePresence for profile dropdown for consistency */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    ref={profileMenuRef}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className={`absolute right-0 mt-2 w-60 rounded-lg shadow-xl py-1
                                  ${darkMode ? 'bg-gray-800/95 border border-gray-700/50' : 'bg-white/95 border border-gray-200/70'}
                                  backdrop-blur-sm`} // Removed headerBaseClass here
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
                                          transition-colors duration-150 ease-in-out rounded-md mx-1 my-0.5`} // Simplified classes
                          role="menuitem"
                        >
                          <item.icon size={16} className="mr-2 text-gray-500 dark:text-gray-400" /> {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mx-1"></div>
                    <button
                      onClick={() => { logout(); setIsProfileMenuOpen(false); }}
                      className={`flex items-center w-[calc(100%-0.5rem)] mx-1 my-0.5 text-left px-3.5 py-2 text-sm rounded-md
                                    ${darkMode ? 'text-red-400 hover:bg-red-500/20 hover:text-red-300' : 'text-red-600 hover:bg-red-500/10'}
                                    transition-colors duration-150 ease-in-out`} // Simplified classes
                      role="menuitem"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <button onClick={() => navigate('login')} className={`font-medium text-sm px-4 py-1.5 rounded-full ${dynamicTextColor} ${dynamicHoverTextColor} ${dynamicHoverBgColor}`}>
                Log In
              </button>
              <button onClick={() => navigate('register')}
                className={`font-medium text-sm px-4 py-1.5 rounded-full border-2 
                              ${isScrolled || !darkMode
                    ? 'text-blue-600 border-blue-500 hover:bg-blue-500/10 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400/10'
                    : 'text-white border-white/80 hover:bg-white/10'
                  } transition-colors duration-300 ease-in-out`}> {/* Added base transition */}
                Register
              </button>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title="Toggle theme"
            className={`p-2 rounded-full ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
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
              className={`p-2 rounded-full ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
            >
              <ShoppingCart size={22} />
            </button>
          )}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title="Toggle theme"
            className={`p-2 rounded-full ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button onClick={toggleMenu} // Changed to use toggleMenu
            className={`p-2 rounded-md ${dynamicIconColor} ${dynamicIconHoverColor} ${dynamicHoverBgColor}`}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Using AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div // दिस इज़ द ओवरले (This is the overlay)
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden fixed inset-0 top-[72px] z-40
                          ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'}
                          backdrop-blur-md`}
              onClick={toggleMenu}
            >
              <motion.nav // दिस इज़ द एक्चुअल मेन्यू पैनल (This is the actual menu panel)
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                // MODIFIED LINE: Using absolute positioning to fill the parent overlay
                className={`absolute top-0 left-0 bottom-0 w-[75vw] max-w-xs flex flex-col p-4 shadow-xl
                          ${darkMode ? 'bg-gray-900' : 'bg-white'} 
                          overflow-y-auto`} // overflow-y-auto for internal scrolling of menu items
                onClick={(e) => e.stopPropagation()}
              >
              {navItems.map((item) => (
                <Link
                  key={`mobile-${item.name}`}
                  to={item.path}
                  onClick={toggleMenu} // Close menu on item click
                  className={`font-semibold text-lg py-3.5 px-3 rounded-lg
                                ${darkMode ? 'text-gray-200 hover:bg-gray-700/70' : 'text-gray-700 hover:bg-gray-100'}
                                transition-colors duration-150 ease-in-out`}
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
                            src={currentUser.photo} alt={currentUser?.name ? decodeURIComponent(escape(currentUser.name)) : 'User'}
                            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-300 dark:border-gray-600"
                            referrerPolicy="no-referrer"
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'U')}&background=0D8ABC&color=fff&size=40`; }}
                          />
                        ) : (
                          <UserCircle size={40} className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        )}
                        <div>
                          <p className={`text-base font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{currentUser?.name ? decodeURIComponent(escape(currentUser.name)) : 'User Account'}</p>
                          <p className={`text-sm text-gray-500 dark:text-gray-400 truncate`}>{currentUser?.email}</p>
                        </div>
                      </div>
                      <Link to='/profile' onClick={toggleMenu} className={`flex items-center font-semibold py-3.5 px-3 rounded-lg ${headerBaseClass} ${darkMode ? 'text-gray-200 hover:bg-gray-700/70' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <UserCircle size={20} className="mr-3 text-gray-500 dark:text-gray-400" /> Profile
                      </Link>
                      <Link to='/profile/settings' onClick={toggleMenu} className={`flex items-center font-semibold py-3.5 px-3 rounded-lg ${headerBaseClass} ${darkMode ? 'text-gray-200 hover:bg-gray-700/70' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <Settings size={20} className="mr-3 text-gray-500 dark:text-gray-400" /> Settings
                      </Link>
                      <button onClick={() => { logout(); toggleMenu(); }} className={`w-full flex items-center text-left font-semibold py-3.5 px-3 rounded-lg ${headerBaseClass} ${darkMode ? 'text-red-400 hover:bg-red-500/20' : 'text-red-600 hover:bg-red-500/10'}`}>
                        <LogOut size={20} className="mr-3" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to='/login' onClick={toggleMenu} className={`block w-full text-center font-semibold py-3 px-3 rounded-lg ${headerBaseClass} ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>Log In</Link>
                      <Link to='/register' onClick={toggleMenu} className={`block w-full text-center font-semibold py-3 px-3 rounded-lg border-2 ${headerBaseClass} ${darkMode ? 'text-blue-400 border-blue-400 hover:bg-blue-400/10' : 'text-blue-600 border-blue-500 hover:bg-blue-500/10'}`}>Register</Link>
                    </>
                  )}
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
};

export default Header;