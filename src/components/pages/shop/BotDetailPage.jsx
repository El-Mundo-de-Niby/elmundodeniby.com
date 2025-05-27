// src/components/pages/BotDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FadeInOnScroll from '../../common/FadeInOnScroll';
import { ArrowLeft, ShoppingCart, Tag, ListChecks, Zap, Home, PlusCircle, ExternalLink, DollarSign, Code, Server, Percent } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data - en una app real, esto vendría de una API o estado global.
const availableBotsData = [
    {
        id: 'bot001',
        name: 'Moderator Pro',
        description: 'Advanced moderation bot with auto-mute, kick, ban, and custom command capabilities.',
        longDescription: 'Moderator Pro is your ultimate solution for maintaining a healthy and engaging Discord community. It offers a comprehensive suite of moderation tools, including automated actions for spam and rule violations, customizable warning systems, and detailed audit logs. With its intuitive command set and robust permission handling, you can tailor its behavior perfectly to your server\'s needs. Features include profanity filters, link blocking, raid protection, and temporary bans.',
        imageUrl: 'https://picsum.photos/seed/moderatorpro_detail/800/600',
        features: ['Auto-moderation', 'Custom Commands', 'Logging', 'Role Management', 'Spam Detection', 'Profanity Filter', 'Raid Protection'],
        category: 'Moderation',
        version: '2.1.0',
        lastUpdated: '2024-05-15',
        sourceCodePrice: 79.99, // Precio por el código fuente
        hostingPriceMonthly: 9.99, // Precio del hosting mensual
        bundleDiscountPercentage: 15, // 15% de descuento si compran ambos
        testBotInviteLink: 'https://discord.com/oauth2/authorize?client_id=YOUR_TEST_BOT_CLIENT_ID&scope=bot&permissions=8',
    },
    {
        id: 'bot002',
        name: 'Music Master',
        description: 'High-quality music streaming bot that supports YouTube, Spotify, SoundCloud, and more.',
        longDescription: 'Bring the party to your server with Music Master! This bot delivers crystal-clear audio from various sources like YouTube, Spotify, and SoundCloud. Users can create shared playlists, control playback, adjust volume, and even apply audio effects. It features a robust queue system, DJ role permissions, and 24/7 playback capabilities, ensuring your server always has the right tunes.',
        imageUrl: 'https://picsum.photos/seed/musicmaster_detail/800/600',
        features: ['Multi-source Streaming', 'Playlist System', 'DJ Roles', 'Volume Control', 'Audio Effects', '24/7 Playback', 'Lyrics Search'],
        category: 'Music',
        version: '1.5.3',
        lastUpdated: '2024-05-20',
        sourceCodePrice: 49.99,
        hostingPriceMonthly: 7.99,
        bundleDiscountPercentage: 10,
        testBotInviteLink: 'https://discord.com/oauth2/authorize?client_id=YOUR_TEST_BOT_CLIENT_ID&scope=bot&permissions=YOUR_PERMISSIONS',
    },
    {
        id: 'bot003',
        name: 'Welcome Wizard',
        description: 'Greet new members with customizable welcome messages, assign auto-roles, and provide server information seamlessly.',
        longDescription: 'Make every new member feel instantly at home with Welcome Wizard. Create beautiful, personalized welcome messages with images and embeds. Automatically assign roles upon joining, guide users with server rules or information panels, and even set up a simple captcha verification to deter bots. It also supports farewell messages for departing members.',
        price: 9.99, // Mantendremos un precio único si no tiene opciones separadas
        imageUrl: 'https://picsum.photos/seed/welcomewizard_detail/800/600',
        features: ['Custom Welcome Banners', 'Auto-Roles', 'Captcha Verification', 'Farewell Messages', 'Embed Support', 'DM Welcomes'],
        category: 'Utility',
        version: '3.0.1',
        lastUpdated: '2024-05-10',
        // Este bot podría no tener opción de compra de código o hosting separado, solo precio único
    },
    // ... (otros bots pueden seguir el nuevo formato o el antiguo si solo tienen un precio)
];


const BotDetailPage = () => {
    const { botId } = useParams();
    const navigate = useNavigate();
    const bot = availableBotsData.find(b => b.id === botId);

    const [buySourceCode, setBuySourceCode] = useState(false);
    const [buyHosting, setBuyHosting] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (bot) {
            let currentTotal = 0;
            let discountApplied = false;

            if (buySourceCode && bot.sourceCodePrice) {
                currentTotal += bot.sourceCodePrice;
            }
            if (buyHosting && bot.hostingPriceMonthly) {
                currentTotal += bot.hostingPriceMonthly;
            }

            // Aplicar descuento si ambas opciones están seleccionadas y hay un descuento definido
            if (buySourceCode && buyHosting && bot.sourceCodePrice && bot.hostingPriceMonthly && bot.bundleDiscountPercentage > 0) {
                const discountAmount = (bot.sourceCodePrice + bot.hostingPriceMonthly) * (bot.bundleDiscountPercentage / 100);
                currentTotal -= discountAmount;
                discountApplied = true;
            }

            // Si ninguna opción avanzada está seleccionada pero el bot tiene un precio base (para bots simples)
            if (!buySourceCode && !buyHosting && bot.price && !bot.sourceCodePrice && !bot.hostingPriceMonthly) {
                currentTotal = bot.price;
            }

            setTotalPrice(currentTotal);
        }
    }, [bot, buySourceCode, buyHosting]);

    if (!bot) {
        return (
            <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900 text-center">
                <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">Bot Not Found</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-4">The bot you are looking for does not exist or has been moved.</p>
                <button
                    onClick={() => navigate('/shop')}
                    className="mt-8 inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Shop
                </button>
            </section>
        );
    }

    const handleInviteTestBot = () => {
        if (bot.testBotInviteLink) {
            window.open(bot.testBotInviteLink, '_blank', 'noopener,noreferrer');
        } else {
            toast.error('A test version for this bot is not available at the moment.');
        }
    };

    // Determinar si el bot tiene opciones de compra o un precio único
    const hasPurchaseOptions = bot.sourceCodePrice || bot.hostingPriceMonthly;

    return (
        <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInOnScroll>
                    <button
                        onClick={() => navigate('/shop')}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 group"
                    >
                        <ArrowLeft size={20} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to Shop
                    </button>
                </FadeInOnScroll>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <FadeInOnScroll>
                        <img
                            src={bot.imageUrl || `https://picsum.photos/seed/${bot.id}_detail/1200/500`}
                            alt={bot.name}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    </FadeInOnScroll>

                    <div className="p-8 md:p-12">
                        <FadeInOnScroll delay={100}>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                                {bot.name}
                            </h1>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                                <span className="inline-flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                    <Tag size={14} className="mr-1.5" /> {bot.category || 'General'}
                                </span>
                                <span>Version: {bot.version || '1.0.0'}</span>
                                <span>Last Updated: {bot.lastUpdated || 'N/A'}</span>
                            </div>
                        </FadeInOnScroll>

                        <FadeInOnScroll delay={200}>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                                {bot.longDescription || bot.description}
                            </p>
                        </FadeInOnScroll>

                        {bot.features && bot.features.length > 0 && (
                            <FadeInOnScroll delay={300} className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                    <ListChecks size={24} className="mr-3 text-blue-600 dark:text-blue-400" /> Key Features
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pl-2">
                                    {bot.features.map((feature, index) => (
                                        <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                                            <Zap size={18} className="mr-2 mt-1 text-green-500 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </FadeInOnScroll>
                        )}

                        {/* Opciones de Compra */}
                        {hasPurchaseOptions && (
                            <FadeInOnScroll delay={350} className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                    <DollarSign size={24} className="mr-3 text-blue-600 dark:text-blue-400" /> Purchase Options
                                </h2>
                                <div className="space-y-4">
                                    {bot.sourceCodePrice && (
                                        <label htmlFor="buySourceCode" className={`flex items-center p-4 rounded-lg border transition-all cursor-pointer ${buySourceCode ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400' : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}>
                                            <input
                                                type="checkbox"
                                                id="buySourceCode"
                                                checked={buySourceCode}
                                                onChange={() => setBuySourceCode(!buySourceCode)}
                                                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-3 flex-grow text-gray-800 dark:text-gray-200">Buy Source Code</span>
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">${bot.sourceCodePrice.toFixed(2)}</span>
                                        </label>
                                    )}
                                    {bot.hostingPriceMonthly && (
                                        <label htmlFor="buyHosting" className={`flex items-center p-4 rounded-lg border transition-all cursor-pointer ${buyHosting ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400' : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}>
                                            <input
                                                type="checkbox"
                                                id="buyHosting"
                                                checked={buyHosting}
                                                onChange={() => setBuyHosting(!buyHosting)}
                                                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-3 flex-grow text-gray-800 dark:text-gray-200">Bot Hosting (Monthly)</span>
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">${bot.hostingPriceMonthly.toFixed(2)}/mo</span>
                                        </label>
                                    )}
                                </div>
                                {buySourceCode && buyHosting && bot.bundleDiscountPercentage > 0 && (
                                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-700 dark:text-green-300 text-sm flex items-center">
                                        <Percent size={16} className="mr-2" />
                                        You get a {bot.bundleDiscountPercentage}% discount for choosing both options!
                                    </div>
                                )}
                            </FadeInOnScroll>
                        )}

                        <FadeInOnScroll delay={400}>
                            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-6">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Price:</p>
                                    <p className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                                        ${totalPrice.toFixed(2)}
                                        {buyHosting && bot.hostingPriceMonthly && <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/month (for hosting)</span>}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    {bot.testBotInviteLink && (
                                        <button
                                            onClick={handleInviteTestBot}
                                            className="w-full sm:w-auto inline-flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg text-md font-semibold
                                   hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                                        >
                                            <PlusCircle size={20} className="mr-2" /> Invite Test Bot
                                            <ExternalLink size={16} className="ml-2 opacity-75" />
                                        </button>
                                    )}
                                    <button
                                        className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg text-md font-semibold
                               transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap
                               ${(buySourceCode || buyHosting || (bot.price && !hasPurchaseOptions))
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                                        disabled={!(buySourceCode || buyHosting || (bot.price && !hasPurchaseOptions))}
                                    >
                                        <ShoppingCart size={20} className="mr-2" />
                                        {(buySourceCode || buyHosting || (bot.price && !hasPurchaseOptions)) ? 'Add to Cart' : 'Select an option'}
                                    </button>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>
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
            </div>
        </section>
    );
};

export default BotDetailPage;