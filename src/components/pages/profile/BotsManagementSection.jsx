// src/components/pages/profile/BotsManagementSection.jsx
import React, { useState, useEffect } from 'react';
import { Bot,  Zap, Settings, BarChart2, Power, Trash2, ShieldCheck, Music, MessageSquare as ChatIcon, PlusCircle, Server, Eye, Edit3 } from 'lucide-react';
import FadeInOnScroll from '../../common/FadeInOnScroll';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Datos de ejemplo para los bots del usuario
const userBotsData = [
    {
        id: 'userbot001',
        name: 'Super Moderador Pro',
        avatarUrl: 'https://picsum.photos/seed/supermod/100',
        status: 'Online', // Online, Offline, Needs Attention
        serverName: 'Comunidad Gaming X',
        serverCount: 1,
        type: 'Moderation Suite', // Coincide con los módulos o tipos de la tienda/creación
        plan: 'Premium Hosting', // O "Self-Hosted"
        renewalDate: '2025-06-15', // Si tiene hosting
    },
    {
        id: 'userbot002',
        name: 'DJ Melodía',
        avatarUrl: 'https://picsum.photos/seed/djmelodia/100',
        status: 'Offline',
        serverName: 'El Rincón Musical',
        serverCount: 1,
        type: 'Music Module',
        plan: 'Self-Hosted',
    },
    {
        id: 'userbot003',
        name: 'Asistente Personalizado',
        avatarUrl: 'https://picsum.photos/seed/customassist/100',
        status: 'Online',
        serverName: 'Mi Servidor Privado',
        serverCount: 1,
        type: 'Custom (Utility, Fun)',
        plan: 'Basic Hosting',
        renewalDate: '2025-07-01',
    },
    {
        id: 'userbot004',
        name: 'Bot de Pruebas Alfa',
        avatarUrl: null, // Para probar el fallback
        status: 'Needs Attention',
        serverName: 'Development Server',
        serverCount: 1,
        type: 'Custom (Economy)',
        plan: 'Self-Hosted',
    },
];

const StatusIndicator = ({ status }) => {
    let bgColor = 'bg-gray-400'; // Default (e.g., Offline)
    if (status === 'Online') bgColor = 'bg-green-500';
    else if (status === 'Needs Attention') bgColor = 'bg-yellow-500';
    else if (status === 'Error') bgColor = 'bg-red-500';

    return <span className={`w-3 h-3 ${bgColor} rounded-full inline-block mr-2 ring-2 ring-offset-1 dark:ring-offset-gray-800 ring-white/50`} title={status}></span>;
};


const BotsManagementSection = () => {
    const [userBots, setUserBots] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simular carga de datos
        setTimeout(() => {
            setUserBots(userBotsData);
            setLoading(false);
        }, 1000);
    }, []);

    const handleAction = (botId, action) => {
        if (action === 'configure') {
            navigate(`/profile/bots/${botId}/configure`); // NAVEGAR A LA PÁGINA DE CONFIGURACIÓN
        } else if (action === 'stats') { // NUEVA CONDICIÓN
            navigate(`/profile/bots/${botId}/stats`);
        } else {
            toast.success(`Action: ${action} on Bot ID: ${botId} (Not Implemented)`);
          }
      };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[300px]">
                <svg className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="ml-3 text-lg font-medium text-gray-700 dark:text-gray-300">Loading your bots...</p>
            </div>
        );
    }

    return (
        <FadeInOnScroll className="w-full">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    My Bots Dashboard
                </h2>
                <button
                    onClick={() => navigate('/create-bot')}
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                >
                    <PlusCircle size={18} className="mr-2" /> Create New Bot
                </button>
            </div>

            {userBots.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow border dark:border-gray-700">
                    <Bot size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No Bots Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        You haven't created or purchased any bots yet.
                    </p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-colors"
                    >
                        Explore Bot Shop
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {userBots.map((bot, index) => (
                        <FadeInOnScroll key={bot.id} delay={index * 50} className="block">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-5 hover:shadow-blue-500/20 dark:hover:shadow-blue-400/30 transition-shadow duration-300">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <img
                                        src={bot.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name.substring(0, 2))}&background=random&color=fff&size=64`}
                                        alt={bot.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 flex-shrink-0"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-0.5">{bot.name}</h3>
                                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            <StatusIndicator status={bot.status} />
                                            <span>{bot.status}</span>
                                            <span className="mx-1.5">&bull;</span>
                                            <Server size={12} className="mr-1" /> On: {bot.serverName}
                                        </div>
                                        <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium">{bot.type}</span>
                                    </div>
                                    <div className="flex flex-col sm:items-end mt-3 sm:mt-0 w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
                                        <button onClick={() => handleAction(bot.id, 'configure')} className="w-full sm:w-auto text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-1.5 px-3 rounded-md flex items-center justify-center transition-colors">
                                            <Settings size={14} className="mr-1.5" /> Configure
                                        </button>
                                        <button onClick={() => handleAction(bot.id, 'stats')} className="w-full sm:w-auto text-xs bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800/70 text-blue-700 dark:text-blue-300 font-semibold py-1.5 px-3 rounded-md flex items-center justify-center transition-colors">
                                            <BarChart2 size={14} className="mr-1.5" /> Stats
                                        </button>
                                        {/* Placeholder para otras acciones */}
                                    </div>
                                </div>
                                {bot.plan.toLowerCase().includes('hosting') && bot.renewalDate && (
                                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                                        Hosting Plan: <span className="font-medium text-gray-700 dark:text-gray-300">{bot.plan}</span>
                                        {bot.renewalDate && (
                                            <span> &bull; Renews: <span className="font-medium text-gray-700 dark:text-gray-300">{bot.renewalDate}</span></span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </FadeInOnScroll>
                    ))}
                </div>
            )}
        </FadeInOnScroll>
    );
};

export default BotsManagementSection;