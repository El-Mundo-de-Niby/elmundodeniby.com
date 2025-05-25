// src/components/pages/profile/BotStatsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import FadeInOnScroll from '../../../common/FadeInOnScroll';
import { ArrowLeft, Server, Users, Loader2, AlertCircle, Home, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Datos de ejemplo de los bots del usuario con estadísticas de crecimiento de servidores
// En una aplicación real, estos datos vendrían de tu backend.
const userBotsDataWithStats = [
    {
        id: 'userbot001',
        name: 'Super Moderador Pro',
        avatarUrl: 'https://picsum.photos/seed/supermod/100',
        type: 'Moderation Suite',
        servers: [
            { id: 'srv1a', name: 'Comunidad Gaming X', memberCount: 1250, iconUrl: 'https://picsum.photos/seed/srv1ico/40' },
            { id: 'srv2a', name: 'Artistas Unidos', memberCount: 340, iconUrl: 'https://picsum.photos/seed/srv2ico/40' },
            { id: 'srv3a', name: 'Debates Filosóficos', memberCount: 780, iconUrl: 'https://picsum.photos/seed/srv3ico/40' },
        ],
        serverGrowthData: [
            { date: '2024-01-01', count: 5 }, { date: '2024-02-01', count: 8 },
            { date: '2024-03-01', count: 12 }, { date: '2024-04-01', count: 10 },
            { date: '2024-05-01', count: 15 }, { date: '2024-06-01', count: 20 },
            { date: '2024-07-01', count: 22 }, { date: '2024-08-01', count: 25 },
        ]
    },
    {
        id: 'userbot002',
        name: 'DJ Melodía',
        avatarUrl: 'https://picsum.photos/seed/djmelodia/100',
        type: 'Music Module',
        servers: [
            { id: 'srv4b', name: 'El Rincón Musical', memberCount: 2500, iconUrl: 'https://picsum.photos/seed/srv4ico/40' },
            { id: 'srv5b', name: 'Chill Beats Radio', memberCount: 850, iconUrl: 'https://picsum.photos/seed/srv5ico/40' },
        ],
        serverGrowthData: [
            { date: '2024-03-15', count: 50 }, { date: '2024-04-15', count: 65 },
            { date: '2024-05-15', count: 80 }, { date: '2024-06-15', count: 75 },
            { date: '2024-07-15', count: 90 },
        ]
    },
    {
        id: 'userbot003',
        name: 'Asistente Personalizado',
        avatarUrl: 'https://picsum.photos/seed/customassist/100',
        type: 'Custom (Utility, Fun)',
        servers: [
            { id: 'srv6c', name: 'Mi Servidor Privado', memberCount: 50, iconUrl: 'https://picsum.photos/seed/srv6ico/40' },
        ],
        serverGrowthData: [
            { date: '2025-01-01', count: 1 }, { date: '2025-02-01', count: 2 },
            { date: '2025-03-01', count: 3 }, { date: '2025-04-01', count: 5 },
            { date: '2025-05-01', count: 7 },
        ]
    },
    {
        id: 'userbot004',
        name: 'Bot de Pruebas Alfa',
        avatarUrl: null,
        type: 'Custom (Economy)',
        servers: [ // Asegúrate de que los bots tengan datos de 'servers' aunque 'serverGrowthData' esté vacío
            { id: 'srv7d', name: 'Development Server', memberCount: 15, iconUrl: 'https://picsum.photos/seed/srv7ico/40' },
        ],
        serverGrowthData: [] // Bot sin datos de crecimiento para probar ese caso
    },
];


const BotStatsPage = () => {
    const { botId } = useParams(); // Hook 1
    const navigate = useNavigate(); // Hook 2
    const [bot, setBot] = useState(null); // Hook 3
    const [loading, setLoading] = useState(true); // Hook 4
    const [error, setError] = useState(null); // Hook 5

    // Hook para el modo oscuro, se declara ANTES de cualquier retorno condicional
    const [isDarkMode, setIsDarkMode] = useState( // Hook 6
        () => {
            if (typeof window !== 'undefined') {
                return document.documentElement.classList.contains('dark');
            }
            return false; // Default para SSR o si window no está disponible
        }
    );

    useEffect(() => { // Hook 7 (para observar cambios de tema)
        if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);


    useEffect(() => { // Hook 8 (para cargar datos del bot)
        setLoading(true);
        setError(null);
        console.log(`BotStatsPage useEffect: Fetching data for botId "${botId}"`);
        const timer = setTimeout(() => {
            try {
                const foundBot = userBotsDataWithStats.find(b => b.id === botId);
                if (foundBot) {
                    setBot(foundBot);
                    console.log(`BotStatsPage: Bot "${foundBot.name}" data loaded:`, foundBot);
                } else {
                    setError(`Bot statistics for ID "${botId}" not found.`);
                    console.warn(`BotStatsPage: Bot not found for id: "${botId}"`);
                }
            } catch (e) {
                console.error("BotStatsPage: Error processing bot data", e);
                setError("An unexpected error occurred while loading bot statistics.");
            } finally {
                setLoading(false);
                console.log("BotStatsPage: Loading finished.");
            }
        }, 800); // Simular carga
        return () => clearTimeout(timer);
    }, [botId]);

    // Estados de Carga y Error
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-950 p-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 dark:text-blue-400" />
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading Bot Statistics...</p>
            </div>
        );
    }

    if (error || !bot) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-50 dark:bg-gray-950">
                <AlertCircle size={60} className="text-red-500 dark:text-red-400 mb-5" strokeWidth={1.5} />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">Statistics Unavailable</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                    {error || `Could not load statistics for bot ID "${botId}". The bot may not exist or data is missing.`}
                </p>
                <Link to="/profile/bots" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                    <ArrowLeft size={18} className="mr-2" /> Back to My Bots
                </Link>
            </div>
        );
    }

    // Preparar datos para el gráfico de líneas solo si bot y bot.serverGrowthData existen
    const formattedGrowthData = bot.serverGrowthData?.map(item => ({
        ...item,
        displayDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    })) || [];

    // Colores del gráfico basados en isDarkMode (ya estaban definidos)
    const chartStrokeColor = isDarkMode ? "#60a5fa" : "#2563eb";
    const axisStrokeColor = isDarkMode ? "#6b7280" : "#4b5563";
    const tooltipBg = isDarkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(249, 250, 251, 0.95)';
    const tooltipBorder = isDarkMode ? '#4b5563' : '#d1d5db';
    const tooltipText = isDarkMode ? '#d1d5db' : '#374151';

    return (
        <section className="py-24 md:pt-32 md:pb-20 bg-gray-50 dark:bg-gray-950 min-h-screen font-sans">
            <FadeInOnScroll className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                {/* Encabezado de la Página */}
                <div className="mb-12">
                    <button
                        onClick={() => navigate('/profile/bots')}
                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group mb-4 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-1.5 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to My Bots
                    </button>
                    <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-5">
                        <img
                            src={bot.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name.substring(0, 2))}&background=random&color=fff&size=128&font-size=0.5&bold=true`}
                            alt={bot.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg border-2 border-white dark:border-gray-700 mb-3 sm:mb-0"
                        />
                        <div className="text-center sm:text-left">
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bot Statistics</p>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                                {bot.name}
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Currently active in {bot.servers?.length || 0} server(s).</p>
                        </div>
                    </div>
                </div>

                {/* Sección del Gráfico de Crecimiento de Servidores */}
                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border dark:border-gray-700/70 mb-12">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                        <TrendingUp size={24} className="mr-2.5 text-blue-500 dark:text-blue-400" /> Server Count Over Time
                    </h2>
                    {formattedGrowthData.length > 1 ? (
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={formattedGrowthData} margin={{ top: 10, right: 25, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} strokeOpacity={0.6} />
                                <XAxis dataKey="displayDate" stroke={axisStrokeColor} tick={{ fontSize: 11 }} dy={5} />
                                <YAxis allowDecimals={false} stroke={axisStrokeColor} tick={{ fontSize: 11 }} dx={-5} label={{ value: 'Servers', angle: -90, position: 'insideLeft', fill: axisStrokeColor, fontSize: 12, dx: -10 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' }}
                                    itemStyle={{ color: tooltipText }}
                                    labelStyle={{ color: tooltipText, fontWeight: 'bold', marginBottom: '4px' }}
                                    formatter={(value) => [`${value} servers`, "Count"]} // Tooltip content
                                />
                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }} />
                                <Line type="monotone" dataKey="count" name="Server Count" stroke={chartStrokeColor} strokeWidth={2.5} activeDot={{ r: 7, strokeWidth: 2, fill: chartStrokeColor }} dot={{ r: 4, strokeWidth: 1.5, fill: chartStrokeColor, stroke: tooltipBg }} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                            {bot.serverGrowthData && bot.serverGrowthData.length <= 1 ? "Not enough historical data to display a growth trend for this bot." : "No server growth data available for this bot."}
                        </p>
                    )}
                </div>

                {/* Lista de Servidores Actuales */}
                <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border dark:border-gray-700/70">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                        <Server size={24} className="mr-2.5 text-green-500 dark:text-green-400" /> Current Servers ({bot.servers?.length || 0})
                    </h2>
                    {bot.servers && bot.servers.length > 0 ? (
                        <ul className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2"> {/* pr-2 para dar espacio al scrollbar */}
                            {bot.servers.map(server => (
                                <li key={server.id} className="flex items-center p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-200 dark:border-gray-600/60 hover:shadow-sm transition-shadow">
                                    <img src={server.iconUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(server.name.substring(0, 2))}&size=40&background=random&color=fff&bold=true&font-size=0.4`} alt={server.name} className="w-9 h-9 rounded-md mr-3.5 flex-shrink-0" />
                                    <span className="flex-grow text-sm font-medium text-gray-700 dark:text-gray-200 truncate" title={server.name}>{server.name}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center ml-3 flex-shrink-0"><Users size={14} className="mr-1.5" /> {server.memberCount.toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-10">This bot is not currently active in any servers or server data is unavailable.</p>
                    )}
                </div>

                <FadeInOnScroll delay={300}>
                    <div className="text-center mt-16">
                        <Link
                            to="/"
                            className="inline-flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full text-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md hover:shadow-lg"
                        >
                            <Home className="mr-2" size={18} /> Back to Home
                        </Link>
                    </div>
                </FadeInOnScroll>
            </FadeInOnScroll>
            {/* Estilos para custom-scrollbar */}
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; } /* gray-300 */
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; } /* gray-600 */
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; } /* gray-400 */
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b7280; } /* gray-500 */
      `}</style>
        </section>
    );
};

export default BotStatsPage;