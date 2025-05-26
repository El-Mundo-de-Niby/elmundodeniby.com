// src/components/pages/profile/BotConfigurationPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import FadeInOnScroll from '../../../common/FadeInOnScroll';
import {
    ArrowLeft, Save, Settings, MessageSquare, Shield, Music, Info, AlertCircle, Loader2, CheckCircle, 
    Power, RotateCcw, PowerOff, Send, LifeBuoy, SlidersHorizontal, Palette, ToggleLeft, ToggleRight, Link2,
    Home as HomeIcon, CreditCard as PlanIcon, SlidersVertical as ModulesIcon, TerminalSquare,
    FileText as LogsIcon, HelpCircle as SupportIcon, Trash2, AlertOctagon, CalendarDays, // Renombrado HelpCircle a SupportIcon
    Home
} from 'lucide-react';
import BotOverviewSection from './tabs/BotOverviewTab';
import BotPlanSection from './tabs/BotPlanTab';
import BotGlobalSettingsTab from './tabs/BotGlobalSettingsTab';
import ToggleSwitch from '../../../common/ToggleSwitch';
import FormField from '../../../common/ToggleSwitch';
import BotModulesTab from './tabs/BotModulesTab';
import BotCommandsTab from './tabs/BotCommandsTab';
import BotLogsTab from './tabs/BotLogsTab';
import BotSupportTab from './tabs/BotSupportTab';
import BotDeleteTab from './tabs/BotDeleteTab';
import toast from 'react-hot-toast';

// Datos de ejemplo de los bots del usuario (deberías tener una fuente única para estos datos)
// Asegúrate de que esta estructura y los IDs coincidan con los de BotsManagementSection.jsx
const userBotsDataWithConfig = [
    {
        id: 'userbot001',
        name: 'Super Moderador Pro',
        avatarUrl: 'https://picsum.photos/seed/supermod/100',
        type: 'Moderation Suite',
        status: 'Online',
        relatedOrderId: 'PED-20250115-MODPRO',
        subscriptionEndDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
        planDetails: { name: 'Premium Hosting', purchaseDate: '2024-01-15', renewalType: 'Monthly', price: 19.99, currency: 'USD' },
        token: 'SUPER_SECRET_MODERATOR_TOKEN_123XYZ',
        uptime: '99.98%',
        version: '1.2.5',
        totalMembersInServers: 1950,
        servers: [{ name: 'Comunidad Gaming X', members: 1250, id: 'srv1' }, { name: 'Artistas Unidos', members: 340, id: 'srv2' }, { name: 'Debates Filosóficos', members: 360, id: 'srv3' }],
        config: {
            prefix: '!',
            embedColor: '#5865F2',
            embedFooter: 'Moderador Pro a tu servicio!',
            botActivity: { type: 'WATCHING', name: 'la comunidad' },
            language: 'en',
            modulesConfig: {
                moderation: { enabled: true, defaultMuteTime: '30m', bannedWords: ['palabra1', 'palabra2'] },
                tickets: { enabled: true, categoryId: '123456789012345678', buttonColor: 'Primary', defaultTicketName: 'ticket-{{username}}' },
                levels: { enabled: true, xpPerMessage: 15, levelUpMessageEnabled: true, customLevelUpMessage: '¡Felicidades {{user}}, has subido al nivel {{level}}!' },
                logs: { voiceEvents: true, channelEvents: true, roleEvents: false, messageEvents: true, memberEvents: true }
            },
        },
        commands: [ // NUEVO: Lista de todos los comandos disponibles para este tipo de bot
            { id: 'mod_ban', name: 'ban', module: 'Moderation', description: 'Bans a user from the server.', defaultEnabled: true },
            { id: 'mod_kick', name: 'kick', module: 'Moderation', description: 'Kicks a user from the server.', defaultEnabled: true },
            { id: 'mod_mute', name: 'mute', module: 'Moderation', description: 'Mutes a user for a specified time.', defaultEnabled: true },
            { id: 'util_ping', name: 'ping', module: 'Utility', description: 'Checks the bot\'s latency.', defaultEnabled: true },
            { id: 'util_help', name: 'help', module: 'Utility', description: 'Displays all available commands.', defaultEnabled: true },
            // ... más comandos para otros módulos que este bot pueda tener
       ],
        customCommands: [{ id: 'cc1', name: '!saludo', response: 'Hola, ¿cómo estás?', responseType: 'text' }],
        botLogs: [
            { id: 'log1', type: 'COMMAND', user: 'UsuarioX', command: '!ban @otro', channel: '#general', date: new Date().toISOString(), details: 'Razón: Spam' },
            { id: 'log2', type: 'ERROR', date: new Date(Date.now() - 3600000).toISOString(), details: 'Error al conectar con API de música. Timeout.' },
            { id: 'log3', type: 'SYSTEM', date: new Date(Date.now() - 7200000).toISOString(), details: 'Bot reiniciado por mantenimiento programado.' },
        ]
    },
    {
        id: 'userbot002',
        name: 'DJ Melodía',
        avatarUrl: 'https://picsum.photos/seed/djmelodia/100',
        type: 'Music Module',
        status: 'Offline',
        relatedOrderId: 'PED-20250220-MUSICDJ',
        subscriptionEndDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        planDetails: { name: 'Basic Hosting', purchaseDate: '2024-02-20', renewalType: 'Monthly', price: 7.99, currency: 'USD' },
        token: 'VERY_SECRET_MUSIC_TOKEN_ABC789',
        uptime: '95.50% (when online)',
        version: '2.0.1',
        totalMembersInServers: 3350,
        servers: [{ name: 'El Rincón Musical', members: 2500, id: 'srv4' }, { name: 'Chill Beats Radio', members: 850, id: 'srv5' }],
        config: {
            prefix: '$',
            embedColor: '#1DB954',
            embedFooter: 'Música para tus oídos',
            botActivity: { type: 'LISTENING', name: 'a buena música' },
            language: 'es',
            modulesConfig: {
                music: { enabled: true, defaultVolume: 60, inactivityTimeout: '5m', autoplay: false }
            }
        },
        commands: [ /* ... */], customCommands: [], botLogs: []
    },
];

const BotConfigurationPage = () => {
    const { botId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [bot, setBot] = useState(null);
    const [config, setConfig] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
    const [currentBotStatus, setCurrentBotStatus] = useState('');
    const [isPowerActionLoading, setIsPowerActionLoading] = useState(false);
    const [supportMessageContent, setSupportMessageContent] = useState('');
    const [supportSentMessage, setSupportSentMessage] = useState({ type: '', text: '' });
    const [isDeletingBot, setIsDeletingBot] = useState(false); // Nuevo estado para la acción de borrado

    const activeTab = useMemo(() => {
        const pathParts = location.pathname.split('/');
        const lastSegment = pathParts[pathParts.length - 1];
        const secondLastSegment = pathParts[pathParts.length - 2];
        // Si la URL es /profile/bots/:botId/overview, la tab es 'overview'
        // Si es /profile/bots/:botId/configure/tabName, la tab es 'tabName'
        return secondLastSegment === 'configure' && lastSegment !== 'configure' ? lastSegment : 'overview';
    }, [location.pathname]);

    useEffect(() => {
        setLoading(true); setError(null);
        console.log(`BotConfigurationPage: Attempting to load config for botId: "${botId}"`);
        const timer = setTimeout(() => {
            try {
                const foundBot = userBotsDataWithConfig.find(b => b.id === botId);
                if (foundBot) {
                    setBot(foundBot);
                    setConfig(JSON.parse(JSON.stringify(foundBot.config || {})));
                    setCurrentBotStatus(foundBot.status || 'Unknown'); // Default status
                } else {
                    setError(`Bot with ID "${botId}" not found.`);
                }
            } catch (e) {
                setError("An error occurred loading bot data.");
            } finally {
                setLoading(false);
            }
        }, 800);
        return () => clearTimeout(timer);
    }, [botId]);

    const handleConfigChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prevConfig => ({ ...prevConfig, [name]: type === 'checkbox' ? checked : value }));
        if (saveMessage.text) setSaveMessage({ type: '', text: '' });
    };

    const handleSaveConfiguration = useCallback(async (e) => {
        e.preventDefault();
        setIsSaving(true); setSaveMessage({ type: '', text: '' });
        console.log('Saving configuration for bot:', botId, config);
        await new Promise(resolve => setTimeout(resolve, 1800));
        const success = Math.random() > 0.1;
        if (success) {
            toast.success('Settings saved successfully!');
        } else {
            toast.error('Failed to save settings. Please try again.');
          }
        setIsSaving(false);
        setTimeout(() => setSaveMessage({ type: '', text: '' }), 5000);
    }, [config, botId, toast]);

    const handlePowerAction = async (action) => {
        setIsPowerActionLoading(true); setSaveMessage({ type: '', text: '' });
        await new Promise(resolve => setTimeout(resolve, 1000));
        let newStatus = currentBotStatus; let messageText = '';
        if (action === 'turn_on' && currentBotStatus !== 'Online') {
            newStatus = 'Online'; messageText = `${bot.name} is now online.`;
        } else if (action === 'turn_off' && currentBotStatus === 'Online') {
            newStatus = 'Offline'; messageText = `${bot.name} has been turned off.`;
        } else if (action === 'restart' && currentBotStatus === 'Online') {
            setCurrentBotStatus('Restarting...');
            await new Promise(resolve => setTimeout(resolve, 1500));
            newStatus = 'Online'; messageText = `${bot.name} has been restarted.`;
        } else {
            messageText = `Action "${action}" not applicable or bot already in desired state.`;
            setSaveMessage({ type: 'info', text: messageText });
            setIsPowerActionLoading(false);
            setTimeout(() => setSaveMessage({ type: '', text: '' }), 4000); return;
        }
        setCurrentBotStatus(newStatus);
        setSaveMessage({ type: 'success', text: messageText });
        setIsPowerActionLoading(false);
        setTimeout(() => setSaveMessage({ type: '', text: '' }), 4000);
    };

    const handleSendSupportRequest = async (e) => {
        e.preventDefault();
        if (!supportMessageContent.trim()) {
            setSupportSentMessage({ type: 'error', text: 'Please describe your issue.' });
            setTimeout(() => setSupportSentMessage({ type: '', text: '' }), 3000); return;
        }
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSupportSentMessage({ type: 'success', text: 'Support request sent! We will get back to you soon.' });
        setSupportMessageContent('');
        setIsSaving(false);
        setTimeout(() => setSupportSentMessage({ type: '', text: '' }), 5000);
    };

    const handleInviteBot = () => {
        if (bot.inviteLink) {
            window.open(bot.inviteLink, '_blank', 'noopener,noreferrer');
        } else if (bot.clientId) {
            // Construir un enlace de invitación genérico si solo tenemos clientId
            const genericInvite = `https://discord.com/oauth2/authorize?client_id=${bot.clientId}&scope=bot&permissions=8`; // Permisos de administrador por defecto
            window.open(genericInvite, '_blank', 'noopener,noreferrer');
            alert("Generated a generic invite link. You might need to adjust permissions in the Discord Developer Portal.");
        } else {
            alert("No invite link or Client ID available for this bot.");
        }
      };

    const getSubscriptionWarning = () => {
        if (!bot || !bot.subscriptionEndDate) return null;
        const endDate = new Date(bot.subscriptionEndDate);
        const today = new Date(); today.setHours(0, 0, 0, 0); // Comparar solo fechas
        endDate.setHours(0, 0, 0, 0);
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) { // Ya expiró
            return { type: 'error', message: `Subscription expired ${Math.abs(diffDays)} day(s) ago on ${endDate.toLocaleDateString('en-GB')}. Renew now to restore service.` };
        } else if (diffDays === 0) { // Expira hoy
            return { type: 'warning', message: `Subscription expires today! Renew now to avoid interruption.` };
        } else if (diffDays <= 7) { // Expira pronto
            return { type: 'warning', message: `Subscription will expire in ${diffDays} day(s) on ${endDate.toLocaleDateString('en-GB')}.` };
        }
        return null;
    };
    const subscriptionWarning = getSubscriptionWarning();

    if (loading) {
        return <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-950 p-4"><Loader2 className="h-12 w-12 animate-spin text-blue-500" /><p className="mt-3 text-gray-600 dark:text-gray-400">Loading Bot Configuration...</p></div>;
    }
    if (error || !bot) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-50 dark:bg-gray-950">
                <AlertCircle size={60} className="text-red-500 dark:text-red-400 mb-5" strokeWidth={1.5} />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">Configuration Error</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                    {error || `Could not load data for bot ID "${botId}".`}
                </p>
                <Link to="/profile/bots" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                    <ArrowLeft size={18} className="mr-2" /> Back to My Bots
                </Link>
            </div>
        );
    }
    if (config === null) { // Aunque el useEffect lo previene, es una salvaguarda.
        return <div className="min-h-screen flex justify-center items-center"><p>Error: Configuration data is missing.</p></div>;
    }


    const renderConfigFields = () => {
        if (!config) return <p className="text-sm text-gray-500 dark:text-gray-400">Configuration data is not available.</p>;
        // ... (Lógica de renderConfigFields como en la respuesta anterior, usando los datos de 'config' y 'bot.type') ...
        // Ejemplo simple para que compile:
        return (
            <>
                <FormField label="Bot Prefix" name="prefix" description="The character(s) your bot will respond to. E.g., !, ?, $">
                    <input type="text" name="prefix" id="prefix" value={config.prefix || ''} onChange={handleConfigChange}
                        className="mt-1 block w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm" />
                </FormField>
                {bot.type === 'Moderation Suite' && (
                    <ToggleSwitch label="Enable Auto-Moderation" name="enableAutoMod" checked={config.enableAutoMod || false} onChange={handleConfigChange} description="Automatically filter spam, bad words, etc." />
                )}
                {/* Puedes añadir más campos aquí basados en bot.type y config */}
            </>
        );
    };

    const tabItems = [
        { id: 'overview', label: 'Overview', icon: HomeIcon },
        { id: 'plan', label: 'Plan & Billing', icon: PlanIcon },
        { id: 'settings', label: 'Global Settings', icon: Settings },
        { id: 'modules', label: 'Modules', icon: ModulesIcon },
        { id: 'commands', label: 'Commands', icon: TerminalSquare },
        { id: 'logs', label: 'Bot Logs', icon: LogsIcon },
        { id: 'support', label: 'Support', icon: SupportIcon },
        { id: 'delete', label: 'Delete Bot', icon: Trash2 },
    ];

    const handleDeleteBotConfirmation = async (botIdToDelete, reason) => {
        console.log(`Attempting to delete bot: ${botIdToDelete}, Reason: ${reason}`);
        setIsDeletingBot(true);
        setSaveMessage({ type: '', text: '' }); // Limpiar otros mensajes

        // Simular llamada a API para eliminar el bot
        await new Promise(resolve => setTimeout(resolve, 2500));
        const success = Math.random() > 0.1; // 90% de éxito simulado

        if (success) {
            // En una app real:
            // 1. Invalidar datos del bot en el estado global/contexto.
            // 2. Mostrar un mensaje global de éxito (ej. con un sistema de toast).
            // 3. Navegar fuera de esta página, probablemente a /profile/bots.
            alert(`Bot ${botIdToDelete} has been deleted (simulated). Reason: ${reason || 'Not provided'}. Redirecting...`);
            navigate('/profile/bots');
        } else {
            setSaveMessage({ type: 'error', text: `Failed to delete bot ${botIdToDelete}. Please try again.` });
            setTimeout(() => setSaveMessage({ type: '', text: '' }), 5000);
        }
        setIsDeletingBot(false);
      };

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <BotOverviewSection
                        bot={bot}
                        currentBotStatus={currentBotStatus}
                        isPowerActionLoading={isPowerActionLoading}
                        handlePowerAction={handlePowerAction}
                    // saveMessage={saveMessage} // Puedes pasar esto si quieres mostrar feedback de power actions aquí
                    />
                );
            case 'plan':
                return (<BotPlanSection bot={bot} />)
            case 'settings':
                return (
                    <form onSubmit={handleSaveConfiguration} className="animate-fade-in"> {/* El form y botón de guardar están aquí */}
                        {/* El título ahora está en el componente de la tab */}
                        <BotGlobalSettingsTab
                            config={config}
                            handleConfigChange={handleConfigChange}
                            botToken={bot?.token} // Pasar el token del bot
                        />
                        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                            <button type="submit" disabled={isSaving}
                                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-60">
                                {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                                Save Global Settings
                            </button>
                        </div>
                    </form>
                );
            case 'modules':
                return (
                    <BotModulesTab
                        botConfig={config} // Pasamos el objeto de config completo que tiene modulesConfig
                        onConfigChange={handleConfigChange} // La función para actualizar todo el config
                        onSaveConfiguration={handleSaveConfiguration} // Función para guardar
                        isSaving={isSaving}
                        saveMessage={saveMessage} // Pasar el mensaje de guardado
                        FormFieldComponent={FormField} // Pasar si FormField está aquí
                        ToggleSwitchComponent={ToggleSwitch} // Pasar si ToggleSwitch está aquí
                    />
                );
            case 'commands':
                return (
                    <BotCommandsTab
                        botCommands={bot?.commands || []} // Pasa la lista de comandos del bot
                        config={config} // Pasa el config completo (que contiene commandSettings)
                        onConfigChange={handleConfigChange} // Para actualizar config.commandSettings
                        onSaveConfiguration={handleSaveConfiguration} // Para el botón de guardar
                        isSaving={isSaving}
                        saveMessage={saveMessage}
                    />
                );
            case 'logs':
                return (<BotLogsTab botLogs={bot?.botLogs || []} />);
            case 'support':
                return (
                    <BotSupportTab
                        bot={bot}
                        supportMessageContent={supportMessageContent}
                        setSupportMessageContent={setSupportMessageContent}
                        handleSendSupportRequest={handleSendSupportRequest}
                        supportSentMessage={supportSentMessage}
                        isSaving={isSaving}
                    // FormFieldComponent={FormField} // Pasa FormField si está definido aquí
                    />
                );
            case 'delete':
                return (
                    <BotDeleteTab
                        bot={bot}
                        onDeleteBot={handleDeleteBotConfirmation}
                        isDeleting={isDeletingBot}
                    />
                );
            default:
                // En caso de que la URL no coincida con una tab conocida (ej. /configure sin sub-tab)
                // o si el activeTab no es válido por alguna razón.
                if (location.pathname.endsWith('/configure') || location.pathname.endsWith(`/configure/`) || location.pathname.endsWith(`/configure/${botId}`)) { // Redirige si es la URL base de configure
                    navigate(`/profile/bots/${botId}/configure/overview`, { replace: true });
                }
                return <p>Select a section.</p>;
        }
    };

    return (
        <section className="py-20 md:pt-28 md:pb-16 bg-gray-100 dark:bg-gray-950 min-h-screen font-sans">
            <FadeInOnScroll className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                <div className="mb-6">
                    <Link
                        to="/profile/bots"
                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group mb-4 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-1.5 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to My Bots
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-lg border dark:border-gray-700/60 mb-8">
                    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-5">
                        <img
                            src={bot.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name.substring(0, 2))}&background=random&color=fff&size=96&font-size=0.4&bold=true`}
                            alt={bot.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl object-cover shadow-md border-2 border-gray-200 dark:border-gray-600 flex-shrink-0"
                        />
                        <div className="flex-grow">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                                {bot.name}
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Configure Your Bot &bull; Type: {bot.type}
                            </p>
                            <p className={`text-xs sm:text-sm font-medium mt-0.5 ${currentBotStatus === 'Online' ? 'text-green-600 dark:text-green-400' : currentBotStatus === 'Offline' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                Current Status: {currentBotStatus}
                            </p>
                        </div>
                        {/* Botón de Invitar Bot AÑADIDO AQUÍ */}
                        <div className="mt-4 md:mt-0 md:ml-auto flex-shrink-0">
                            <button
                                onClick={handleInviteBot}
                                disabled={!bot.inviteLink && !bot.clientId}
                                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-md disabled:opacity-60 transition-colors"
                                title={(!bot.inviteLink && !bot.clientId) ? "Invite link not available" : "Invite this bot"}
                            >
                                <Link2 size={16} className="mr-2" /> Invite Bot
                            </button>
                        </div>
                        {/* Power Controls (se pueden mover a la tab 'overview' si se prefiere una cabecera más limpia) */}
                        <div className="flex-shrink-0 space-x-2 pt-2 sm:pt-0">
                            <button onClick={() => handlePowerAction('turn_on')} disabled={currentBotStatus === 'Online' || isPowerActionLoading} title="Turn On Bot"
                                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <Power size={16} />
                            </button>
                            <button onClick={() => handlePowerAction('turn_off')} disabled={currentBotStatus !== 'Online' || isPowerActionLoading} title="Turn Off Bot"
                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <PowerOff size={16} />
                            </button>
                            <button onClick={() => handlePowerAction('restart')} disabled={currentBotStatus !== 'Online' || isPowerActionLoading} title="Restart Bot"
                                className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <RotateCcw size={16} />
                            </button>
                        </div>
                    </div>
                    {subscriptionWarning && (
                        <div className={`mt-4 p-3 rounded-md text-sm flex items-center border ${subscriptionWarning.type === 'error' ? 'bg-red-100 dark:bg-red-800/40 border-red-500/60 text-red-700 dark:text-red-300'
                                : 'bg-yellow-100 dark:bg-yellow-800/40 border-yellow-500/60 text-yellow-700 dark:text-yellow-300'
                            }`}>
                            <AlertOctagon size={18} className="mr-2 flex-shrink-0" />
                            {subscriptionWarning.message}
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
                    <aside className="w-full md:w-60 lg:w-64 flex-shrink-0 md:sticky md:top-28">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700/60 p-3 sm:p-3.5">
                            <nav className="space-y-1">
                                {tabItems.map(tab => (
                                    <Link
                                        key={tab.id}
                                        to={`/profile/bots/${botId}/configure/${tab.id}`} // 'overview' va a la raíz de configure
                                        replace // Usar replace para no llenar el historial con clicks en tabs
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors duration-200 text-xs sm:text-sm font-medium
                                            ${activeTab === tab.id
                                                ? 'bg-blue-600 text-white shadow'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/70'
                                            }`}
                                        onClick={() => { setSaveMessage({ type: '', text: '' }); setSupportSentMessage({ type: '', text: '' }); }}
                                    >
                                        <tab.icon size={16} className={`${activeTab === tab.id ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} />
                                        <span>{tab.label}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <main className="flex-grow bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl border dark:border-gray-700/60 min-h-[400px] w-full">
                        {/* Mensajes de guardado de configuración o acciones de power */}
                        {saveMessage.text && (
                            <div className={`mb-6 text-sm p-3 rounded-md flex items-center border ${saveMessage.type === 'success' ? 'bg-green-50 dark:bg-green-800/40 text-green-600 dark:text-green-300 border-green-500/50' : saveMessage.type === 'info' ? 'bg-blue-50 dark:bg-blue-800/40 text-blue-600 dark:text-blue-300 border-blue-500/50' : 'bg-red-50 dark:bg-red-800/40 text-red-600 dark:text-red-300 border-red-500/50'}`}>
                                {saveMessage.type === 'success' ? <CheckCircle size={16} className="mr-2" /> : <Info size={16} className="mr-2" />}
                                {saveMessage.text}
                            </div>
                        )}
                        {renderActiveTabContent()}
                    </main>
                </div>

                <FadeInOnScroll delay={500}>
                    <div className="text-center mt-16">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-6 py-3 rounded-full text-md font-semibold 
                               hover:bg-gray-200 dark:hover:bg-gray-700 
                               transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <Home className="mr-2" size={18} /> Back to Home
                        </button>
                    </div>
                </FadeInOnScroll>
            </FadeInOnScroll>
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b7280; }

        @keyframes fadeInAnimation {
            0% { opacity: 0; transform: translateY(5px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeInAnimation 0.3s ease-out forwards;
        }
      `}</style>
        </section>
    );
};

export default BotConfigurationPage;