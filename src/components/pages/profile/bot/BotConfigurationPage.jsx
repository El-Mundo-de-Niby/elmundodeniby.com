// src/components/pages/profile/BotConfigurationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import FadeInOnScroll from '../../../common/FadeInOnScroll';
import { ArrowLeft, Save, Settings, MessageSquare, Shield, Music, Info, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

// Datos de ejemplo de los bots del usuario (asegúrate que esta estructura coincida con la de BotsManagementSection)
const userBotsDataWithConfig = [
  {
    id: 'userbot001',
    name: 'Super Moderador Pro',
    avatarUrl: 'https://picsum.photos/seed/supermod/100',
    status: 'Online',
    serverName: 'Comunidad Gaming X',
    type: 'Moderation Suite', // Asegúrate que este 'type' coincida con alguna lógica en renderConfigFields
    config: {
      prefix: '!',
      welcomeMessage: 'Bienvenido a nuestro servidor, {{user}}!',
      enableAutoMod: true,
      moderatedChannels: ['general', 'anuncios'],
    }
  },
  {
    id: 'userbot002',
    name: 'DJ Melodía',
    avatarUrl: 'https://picsum.photos/seed/djmelodia/100',
    status: 'Offline',
    serverName: 'El Rincón Musical',
    type: 'Music Module', // Asegúrate que este 'type' coincida
    config: {
      prefix: '$',
      defaultVolume: 50,
      allowPlaylists: true,
      djRole: 'DJ Master'
    }
  },
  {
    id: 'userbot003',
    name: 'Asistente Personalizado',
    avatarUrl: 'https://picsum.photos/seed/customassist/100',
    status: 'Online',
    serverName: 'Mi Servidor Privado',
    type: 'Custom (Utility, Fun)',
    config: {
      prefix: '#',
      customCommandsEnabled: true,
      funFeatures: ['memes', 'quotes']
    }
  },
   {
    id: 'userbot004',
    name: 'Bot de Pruebas Alfa',
    avatarUrl: null,
    status: 'Needs Attention',
    serverName: 'Development Server',
    type: 'Custom (Economy)',
    config: {
      prefix: 'test!',
      economySystemEnabled: false,
      dailyReward: 100,
    }
  },
];

const BotConfigurationPage = () => {
    const { botId } = useParams();
    const navigate = useNavigate();
    const [bot, setBot] = useState(null);
    const [config, setConfig] = useState({}); // Inicializar como objeto vacío
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        setLoading(true);
        setError(null);
        console.log(`BotConfigurationPage: Attempting to load config for botId: "${botId}"`);
        const timer = setTimeout(() => {
            try {
                const foundBot = userBotsDataWithConfig.find(b => b.id === botId);
                if (foundBot) {
                    setBot(foundBot);
                    setConfig(JSON.parse(JSON.stringify(foundBot.config || {}))); // Clonar o usar objeto vacío
                    console.log(`BotConfigurationPage: Bot "${foundBot.name}" loaded with config:`, foundBot.config || {});
                } else {
                    setError(`Bot with ID "${botId}" not found.`);
                    console.warn(`BotConfigurationPage: Bot not found for id: "${botId}"`);
                }
            } catch (e) {
                console.error("BotConfigurationPage: Error processing bot data", e);
                setError("An unexpected error occurred while loading bot configuration.");
            } finally {
                setLoading(false);
            }
        }, 800);
        return () => clearTimeout(timer);
    }, [botId]);

    const handleConfigChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prevConfig => ({
            ...prevConfig,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (saveMessage.text) setSaveMessage({ type: '', text: '' }); // Limpiar mensaje de guardado al cambiar algo
    };

    const handleChannelsChange = (e) => {
        const channelsArray = e.target.value.split(',').map(channel => channel.trim()).filter(Boolean);
        setConfig(prevConfig => ({ ...prevConfig, moderatedChannels: channelsArray }));
        if (saveMessage.text) setSaveMessage({ type: '', text: '' });
    };

    const handleSaveConfiguration = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveMessage({ type: '', text: '' });
        console.log('Saving configuration for bot:', botId, config);
        await new Promise(resolve => setTimeout(resolve, 1800));
        // Simular éxito/error
        const success = Math.random() > 0.1; // 90% de éxito
        if (success) {
            setSaveMessage({ type: 'success', text: 'Configuration saved successfully!' });
        } else {
            setSaveMessage({ type: 'error', text: 'Failed to save configuration. Please try again.' });
        }
        setIsSaving(false);
        setTimeout(() => setSaveMessage({ type: '', text: '' }), 5000);
    };

    // Estados de Carga y Error
    if (loading) {
        return <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-950"><Loader2 className="h-12 w-12 animate-spin text-blue-500" /><p className="mt-3 text-gray-600 dark:text-gray-400">Loading Configuration...</p></div>;
    }
    if (error || !bot) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-50 dark:bg-gray-950">
                <AlertCircle size={56} className="text-red-500 dark:text-red-400 mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Configuration Error</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">{error || `Bot with ID "${botId}" could not be loaded.`}</p>
                <Link to="/profile/bots" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Back to My Bots
                </Link>
            </div>
        );
    }

    // Componente para un campo de formulario genérico
    const FormField = ({ label, name, children, description }) => (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
            {children}
            {description && <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
    );

    const ToggleSwitch = ({ label, name, checked, onChange, description }) => (
        <div className="mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <label htmlFor={name} className="block text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>
                    {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
                </div>
                <button
                    type="button"
                    id={name}
                    name={name}
                    onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked } })}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 ${checked ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
        </div>
    );


    return (
        <section className="py-24 md:py-32 bg-gray-100 dark:bg-gray-950 min-h-screen">
            <FadeInOnScroll className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                {/* Encabezado de la Página */}
                <div className="mb-10">
                    <button
                        onClick={() => navigate('/profile/bots')}
                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group mb-4"
                    >
                        <ArrowLeft size={16} className="mr-1.5 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to My Bots
                    </button>
                    <div className="flex items-center space-x-4">
                        <img
                            src={bot.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.name.substring(0, 2))}&background=random&color=fff&size=128`}
                            alt={bot.name}
                            className="w-20 h-20 rounded-xl object-cover shadow-lg border-2 border-white dark:border-gray-700"
                        />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Configure Bot</p>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                                {bot.name}
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{bot.type}</p>
                        </div>
                    </div>
                </div>

                {/* Formulario de Configuración en una Tarjeta */}
                <form onSubmit={handleSaveConfiguration} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border dark:border-gray-700/70">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        {/* Columna 1 */}
                        <div>
                            <FormField label="Bot Prefix" name="prefix" description="The character(s) your bot will respond to. E.g., !, ?, $">
                                <input type="text" name="prefix" id="prefix" value={config.prefix || ''} onChange={handleConfigChange}
                                    className="mt-1 block w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm" />
                            </FormField>

                            {bot.type === 'Moderation Suite' && (
                                <>
                                    <FormField label="Welcome Message" name="welcomeMessage" description="Greets new users. Use {{user}} for username.">
                                        <textarea name="welcomeMessage" id="welcomeMessage" rows="3" value={config.welcomeMessage || ''} onChange={handleConfigChange}
                                            className="mt-1 block w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"></textarea>
                                    </FormField>
                                    <ToggleSwitch label="Enable Auto-Moderation" name="enableAutoMod" checked={config.enableAutoMod || false} onChange={handleConfigChange} description="Automatically filter spam, bad words, etc." />
                                </>
                            )}

                            {bot.type === 'Music Module' && (
                                <>
                                    <FormField label="Default Volume (0-100)" name="defaultVolume">
                                        <input type="number" name="defaultVolume" id="defaultVolume" min="0" max="100" value={config.defaultVolume || 50} onChange={handleConfigChange}
                                            className="mt-1 block w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm" />
                                    </FormField>
                                    <ToggleSwitch label="Allow User Playlists" name="allowPlaylists" checked={config.allowPlaylists || false} onChange={handleConfigChange} />
                                </>
                            )}
                        </div>

                        {/* Columna 2 */}
                        <div>
                            {bot.type === 'Moderation Suite' && (
                                <FormField label="Moderated Channels" name="moderatedChannels" description="Comma-separated channel names or IDs.">
                                    <input type="text" name="moderatedChannels" id="moderatedChannels"
                                        value={Array.isArray(config.moderatedChannels) ? config.moderatedChannels.join(', ') : ''}
                                        onChange={handleChannelsChange} placeholder="e.g., general, announcements"
                                        className="mt-1 block w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm" />
                                </FormField>
                            )}
                            {bot.type === 'Music Module' && (
                                <FormField label="DJ Role Name (Optional)" name="djRole" description="Role that can control music commands.">
                                    <input type="text" name="djRole" id="djRole" value={config.djRole || ''} onChange={handleConfigChange} placeholder="e.g., DJMaster"
                                        className="mt-1 block w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm" />
                                </FormField>
                            )}
                            {/* Añadir más campos aquí o un mensaje si no hay más configuraciones */}
                            {Object.keys(config).length === 0 && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This bot has no specific configurable options at the moment beyond its core functionality.</p>
                            )}
                        </div>
                    </div>

                    {/* Acciones del Formulario */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-end gap-3">
                        {saveMessage.text && (
                            <div className={`text-sm flex items-center mr-auto py-1 px-2 rounded-md ${saveMessage.type === 'success' ? 'bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-800/40 text-red-700 dark:text-red-300'}`}>
                                {saveMessage.type === 'success' ? <CheckCircle size={16} className="mr-1.5" /> : <Info size={16} className="mr-1.5" />}
                                {saveMessage.text}
                            </div>
                        )}
                        <button type="button" onClick={() => navigate('/profile/bots')}
                            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 transition-colors shadow-sm">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSaving}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-70">
                            {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </FadeInOnScroll>
        </section>
    );
};


export default BotConfigurationPage;