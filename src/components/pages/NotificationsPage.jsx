// src/components/pages/NotificationsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FadeInOnScroll from '../common/FadeInOnScroll';
import { Bell, CheckCheck, Eye, X, Home, Package, Tag, Filter, Trash2, Power, CreditCard, Info, Shield, PartyPopper, Loader2, ArrowLeft } from 'lucide-react'; // Y otros iconos de notificación que tengas

// Reutilizar y expandir los datos y los iconos del Header
const initialNotificationsData = [
    { id: 1, title: 'New Bot Deployed!', message: 'Your custom bot "Community Helper" is now online and ready for action on your server. Initial configuration has been set up.', timestamp: new Date(Date.now() - 3600000 * 1), isRead: false, link: '/profile/bots/userbot001/configure/home', type: 'bot_status' },
    { id: 2, title: 'Subscription Expiring Soon', message: 'Your plan for "DJ Melodía" renews in 3 days on 2025-05-29. Ensure your payment method is up to date to avoid service interruption.', timestamp: new Date(Date.now() - 3600000 * 5), isRead: false, link: '/profile/bots/userbot002/configure/plan', type: 'billing' },
    { id: 3, title: 'Feature Update: Advanced Logs', message: 'We\'ve added new filtering options and real-time updates to your bot logs. Check them out now!', timestamp: new Date(Date.now() - 3600000 * 24 * 2), isRead: true, link: '/profile/bots/userbot001/configure/logs', type: 'update' },
    { id: 4, title: 'Weekly Bot Digest', message: 'Your bots maintained an average uptime of 99.9% this week. Total commands processed: 15,230.', timestamp: new Date(Date.now() - 3600000 * 24 * 3), isRead: true, link: '#', type: 'report' },
    { id: 5, title: 'Security Alert: New Login', message: 'A new login to your El Mundo de Niby account was detected from a new device in Madrid, Spain.', timestamp: new Date(Date.now() - 3600000 * 24 * 0.5), isRead: false, link: '/profile/settings', type: 'security' },
    { id: 6, title: 'Order Completed: PED-20250520-XYZ', message: 'Your order for "Advanced Music Module" has been processed and deployed to your bot "MusicMaster".', timestamp: new Date(Date.now() - 3600000 * 24 * 4), isRead: true, link: '/profile/orders', type: 'order' },
    { id: 7, title: 'Welcome to El Mundo de Niby!', message: 'Thanks for joining us. Configure your first bot or explore our shop.', timestamp: new Date(Date.now() - 3600000 * 24 * 7), isRead: true, link: '/create-bot', type: 'welcome' },
];

const notificationTypeDetails = {
    bot_status: { icon: Power, color: 'green-500' },
    billing: { icon: CreditCard, color: 'orange-500' },
    update: { icon: Info, color: 'blue-500' },
    report: { icon: CheckCheck, color: 'purple-500' },
    security: { icon: Shield, color: 'red-500' },
    order: { icon: Package, color: 'teal-500' },
    welcome: { icon: PartyPopper, color: 'pink-500' }, // Necesitas PartyPopper de lucide-react
    default: { icon: Bell, color: 'gray-500' },
};


const NotificationsPage = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'unread'
    const [loading, setLoading] = useState(true);

    // Simular carga de notificaciones
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            // En una app real, esto vendría de una API y se sincronizaría con el estado global
            setNotifications(initialNotificationsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
            setLoading(false);
        }, 500);
    }, []);

    const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

    const markNotificationAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
        );
        // API call to mark as read
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        // API call
    };

    const handleDeleteNotification = (notificationId) => {
        // En una app real, también llamada a API para borrar
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
    };

    const handleDeleteAllRead = () => {
        if (window.confirm("Are you sure you want to delete all read notifications? This action cannot be undone.")) {
            setNotifications(prev => prev.filter(n => !n.isRead));
            // API call
        }
    };


    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            markNotificationAsRead(notification.id);
        }
        if (notification.link && notification.link !== '#') {
            navigate(notification.link);
        }
    };

    const filteredNotifications = useMemo(() => {
        if (filter === 'unread') {
            return notifications.filter(n => !n.isRead);
        }
        return notifications;
    }, [notifications, filter]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-950"><Loader2 className="h-10 w-10 animate-spin text-blue-500" /></div>;
    }

    return (
        <section className="py-24 md:pt-32 md:pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
            <FadeInOnScroll className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="mb-10">
                    <Link to="/" className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline group mb-1">
                        <ArrowLeft size={16} className="mr-1.5 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center">
                        <Bell size={32} className="mr-3 text-blue-500 dark:text-blue-400" />
                        All Notifications
                    </h1>
                </div>

                {/* Barra de Filtros y Acciones */}
                <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700/60 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</span>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-3 py-1.5 text-xs border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        >
                            <option value="all">All ({notifications.length})</option>
                            <option value="unread">Unread ({unreadCount})</option>
                        </select>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={markAllAsRead}
                            disabled={unreadCount === 0}
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/20 hover:bg-blue-200 dark:hover:bg-blue-500/30 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <CheckCheck size={14} className="mr-1 inline" /> Mark all as read
                        </button>
                        <button
                            onClick={handleDeleteAllRead}
                            disabled={notifications.filter(n => n.isRead).length === 0}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/30 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Trash2 size={14} className="mr-1 inline" /> Delete all read
                        </button>
                    </div>
                </div>

                {/* Lista de Notificaciones */}
                <div className="space-y-3">
                    {filteredNotifications.length === 0 ? (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow border dark:border-gray-700/60">
                            <Bell size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" strokeWidth={1.5} />
                            <p className="text-gray-600 dark:text-gray-400">
                                {filter === 'unread' ? "No unread notifications." : "You don't have any notifications yet."}
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map(notif => {
                            const NIcon = notificationTypeDetails[notif.type]?.icon || notificationTypeDetails.default.icon;
                            const iconColor = notificationTypeDetails[notif.type]?.color || notificationTypeDetails.default.color;
                            return (
                                <FadeInOnScroll key={notif.id} className="block">
                                    <div
                                        onClick={() => handleNotificationClick(notif)}
                                        className={`p-4 rounded-lg shadow-sm border transition-all duration-200 cursor-pointer
                                    ${notif.isRead
                                                ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:shadow-md'
                                                : 'bg-blue-50 dark:bg-blue-900/30 border-blue-500/30 dark:border-blue-600/50 ring-1 ring-blue-500/50 dark:ring-blue-500/40 hover:shadow-blue-500/20'
                                            }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`mt-1 flex-shrink-0 p-1.5 bg-${iconColor.split('-')[0]}-100 dark:bg-${iconColor.split('-')[0]}-500/20 rounded-full`}>
                                                <NIcon size={16} className={`text-${iconColor}`} />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <h4 className={`text-sm font-semibold ${notif.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>{notif.title}</h4>
                                                    {!notif.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1" title="Unread"></span>}
                                                </div>
                                                <p className={`text-xs mt-0.5 ${notif.isRead ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-200'} line-clamp-2`}>
                                                    {notif.message}
                                                </p>
                                                <p className="text-[0.7rem] text-gray-400 dark:text-gray-500 mt-1.5">
                                                    {new Date(notif.timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDeleteNotification(notif.id); }}
                                                className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 ml-2 flex-shrink-0"
                                                title="Delete notification"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </FadeInOnScroll>
                            );
                        })
                    )}
                </div>
                {/* TODO: Paginación o botón "Cargar más" si es necesario */}
            </FadeInOnScroll>
        </section>
    );
};

export default NotificationsPage;