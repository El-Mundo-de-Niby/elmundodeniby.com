// src/components/pages/CreateBotPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import FadeInOnScroll from '../common/FadeInOnScroll';
import { Zap, Check, Server, ArrowLeft, Home, PlusCircle, Trash2, Music, ShieldCheck, Smile, AlertTriangle, MessageSquare, DollarSign, Wand2, ShoppingCart, RefreshCw, Info } from 'lucide-react';

const predefinedModulesData = [
    { id: 'music', name: 'Music Module', description: 'Play music from YouTube, Spotify, etc. Manage queues and playlists.', price: 15.00, icon: Music, color: 'bg-pink-500 dark:bg-pink-600', iconColor: 'text-pink-100' },
    { id: 'moderation', name: 'Moderation Suite', description: 'Auto-moderation, warn, kick, ban, mute, logging.', price: 20.00, icon: ShieldCheck, color: 'bg-blue-500 dark:bg-blue-600', iconColor: 'text-blue-100' },
    { id: 'economy', name: 'Server Economy', description: 'Implement a virtual currency, shop, jobs, gambling, and leaderboards to boost engagement.', price: 22.00, icon: DollarSign, color: 'bg-green-500 dark:bg-green-600', iconColor: 'text-green-100' }, // MÓDULO AÑADIDO
    { id: 'fun', name: 'Fun & Games', description: 'Includes mini-games, memes, and interactive commands.', price: 12.50, icon: Smile, color: 'bg-yellow-500 dark:bg-yellow-600', iconColor: 'text-yellow-100' },
    { id: 'nsfw', name: 'NSFW Content', description: 'Access and manage NSFW content (requires age verification).', price: 10.00, icon: AlertTriangle, color: 'bg-red-500 dark:bg-red-600', iconColor: 'text-red-100' },
    { id: 'utility', name: 'Server Utilities', description: 'Tools like polls, reminders, server info, user info.', price: 18.00, icon: Wand2, color: 'bg-indigo-500 dark:bg-indigo-600', iconColor: 'text-indigo-100' }
];
const BASE_BOT_PRICE = 0;
const CUSTOM_COMMAND_PRICE = 0.5;
const HOSTING_PRICE_MONTHLY = 7.50; // Precio único para hosting mensual

const CreateBotPage = () => {
    const navigate = useNavigate();

    const initialCustomCommand = { id: Date.now(), name: '', response: '' };
    const [botName, setBotName] = useState('');
    const [selectedModules, setSelectedModules] = useState([]);
    const [customCommands, setCustomCommands] = useState([initialCustomCommand]);
    const [includeHosting, setIncludeHosting] = useState(false);

    const [nameError, setNameError] = useState('');

    const activeCustomCommands = useMemo(() => {
        return customCommands.filter(cmd => cmd.name.trim() !== '' && cmd.response.trim() !== '');
    }, [customCommands]);

    const totalPrice = useMemo(() => {
        let currentTotal = BASE_BOT_PRICE;
        selectedModules.forEach(moduleId => {
            const module = predefinedModulesData.find(m => m.id === moduleId);
            if (module) {
                currentTotal += module.price;
            }
        });
        currentTotal += activeCustomCommands.length * CUSTOM_COMMAND_PRICE;
        if (includeHosting) {
            currentTotal += HOSTING_PRICE_MONTHLY;
        }
        return currentTotal;
    }, [selectedModules, activeCustomCommands, includeHosting]);

    const resetConfiguration = () => {
        setBotName('');
        setSelectedModules([]);
        setCustomCommands([{ id: Date.now(), name: '', response: '' }]);
        setIncludeHosting(false);
        setNameError('');
    };

    const toggleModule = (moduleId) => {
        setSelectedModules(prev =>
            prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
        );
    };

    const handleCustomCommandChange = (id, field, value) => {
        setCustomCommands(prev =>
            prev.map(cmd => (cmd.id === id ? { ...cmd, [field]: value } : cmd))
        );
    };

    const addCustomCommand = () => {
        setCustomCommands(prev => [...prev, { id: Date.now(), name: '', response: '' }]);
    };

    const removeCustomCommand = (idToRemove) => {
        setCustomCommands(prev => {
            const newList = prev.filter(cmd => cmd.id !== idToRemove);
            if (newList.length === 0) {
                return [{ id: Date.now(), name: '', response: '' }]; // Ensure at least one empty command row
            }
            return newList;
        });
    };

    const validateBotName = () => {
        if (botName.trim() === '') {
            setNameError('Bot name is recommended for a better experience.');
            return false; // No es un error bloqueante, solo una advertencia
        }
        if (botName.length > 32) {
            setNameError('Bot name should not exceed 32 characters.');
            return false;
        }
        setNameError('');
        return true;
    };


    const handleCheckout = () => {
        if (!validateBotName() && botName.length > 32) { // Solo bloquea si excede la longitud
            return;
        }

        const configuration = {
            botName: botName.trim() || "My Custom Bot",
            basePrice: BASE_BOT_PRICE,
            modules: selectedModules.map(id => {
                const module = predefinedModulesData.find(m => m.id === id);
                return { name: module?.name, price: module?.price };
            }),
            customCommands: activeCustomCommands.map(cmd => ({ name: cmd.name, response: cmd.response, price: CUSTOM_COMMAND_PRICE })),
            hosting: includeHosting ? { name: "Monthly Hosting", price: HOSTING_PRICE_MONTHLY } : null,
            totalPrice: totalPrice.toFixed(2)
        };
        console.log("Bot Configuration:", configuration);
        alert(`Bot "${configuration.botName}" configured! Total: $${configuration.totalPrice}. Details in console.`);
        // Aquí iría la lógica para enviar al carrito o a un proceso de pago
    };

    const isCheckoutDisabled = totalPrice === BASE_BOT_PRICE && activeCustomCommands.length === 0 && selectedModules.length === 0 && !includeHosting;


    return (
        <section className="py-24 md:py-32 bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <FadeInOnScroll className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group text-sm"
                    >
                        <ArrowLeft size={18} className="mr-1.5 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back
                    </button>
                    <button
                        onClick={resetConfiguration}
                        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 group"
                    >
                        <RefreshCw size={16} className="mr-1.5 transition-transform duration-300 group-hover:rotate-180" />
                        Reset Configuration
                    </button>
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                        Assemble Your Custom Bot
                    </h1>
                    <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center mb-12 leading-relaxed max-w-3xl mx-auto">
                        Tailor your Discord bot by selecting features and commands. Base bot starts at <strong>${BASE_BOT_PRICE.toFixed(2)}</strong>.
                    </p>
                </FadeInOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna de Configuración */}
                    <div className="lg:col-span-2 space-y-8">
                        <FadeInOnScroll delay={50} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700">
                            <label htmlFor="botName" className="block text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                1. Name Your Bot <span className="text-sm font-normal text-gray-500">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                id="botName"
                                value={botName}
                                onBlur={validateBotName}
                                onChange={(e) => { setBotName(e.target.value); if (nameError) validateBotName(); }}
                                placeholder="e.g., MyAwesomeCommunityBot"
                                className={`w-full px-4 py-3 rounded-lg border ${nameError && botName.length > 32 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700/60 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                            {nameError && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{nameError}</p>}
                        </FadeInOnScroll>

                        <FadeInOnScroll delay={100} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                <Zap size={22} className="mr-2 text-blue-500 dark:text-blue-400" /> 2. Select Predefined Modules
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {predefinedModulesData.map(module => {
                                    const isSelected = selectedModules.includes(module.id);
                                    return (
                                        <div
                                            key={module.id}
                                            onClick={() => toggleModule(module.id)}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 ease-in-out cursor-pointer flex flex-col items-start h-full
                                  ${isSelected
                                                    ? 'bg-blue-50 dark:bg-blue-900/60 border-blue-500 dark:border-blue-400 shadow-lg'
                                                    : 'bg-gray-50 dark:bg-gray-700/60 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                                }`}
                                        >
                                            <div className="flex items-center w-full mb-2">
                                                <div className={`p-1.5 rounded-md ${module.color} mr-2.5`}>
                                                    <module.icon size={20} className={module.iconColor} />
                                                </div>
                                                <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 flex-grow">{module.name}</h3>
                                                <div className={`w-5 h-5 flex items-center justify-center rounded border-2 ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-400 dark:border-gray-500'}`}>
                                                    {isSelected && <Check size={14} className="text-white" />}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 flex-grow">{module.description}</p>
                                            <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mt-auto">+ ${module.price.toFixed(2)}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </FadeInOnScroll>

                        <FadeInOnScroll delay={150} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1 flex items-center">
                                <MessageSquare size={22} className="mr-2 text-green-500 dark:text-green-400" /> 3. Add Custom Commands
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                Each valid command costs an additional ${CUSTOM_COMMAND_PRICE.toFixed(2)}.
                            </p>
                            <div className="space-y-3">
                                {customCommands.map((cmd, index) => (
                                    <div key={cmd.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-gray-50 dark:bg-gray-700/60 p-3 rounded-md border dark:border-gray-600">
                                        <input
                                            type="text"
                                            placeholder="!commandName"
                                            value={cmd.name}
                                            onChange={(e) => handleCustomCommandChange(cmd.id, 'name', e.target.value)}
                                            className="flex-grow w-full sm:w-auto px-3 py-2 rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm focus:ring-1 focus:ring-blue-500"
                                        />
                                        <textarea
                                            placeholder="Bot's response to this command"
                                            value={cmd.response}
                                            onChange={(e) => handleCustomCommandChange(cmd.id, 'response', e.target.value)}
                                            className="flex-grow w-full sm:w-auto px-3 py-2 rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm focus:ring-1 focus:ring-blue-500 resize-none"
                                            rows={1}
                                        />
                                        <button
                                            onClick={() => removeCustomCommand(cmd.id)}
                                            className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors sm:ml-auto self-end sm:self-center"
                                            aria-label="Remove Command"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addCustomCommand}
                                className="mt-4 inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors"
                            >
                                <PlusCircle size={16} className="mr-1.5" /> Add Command
                            </button>
                        </FadeInOnScroll>

                        <FadeInOnScroll delay={200} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                <Server size={22} className="mr-2 text-purple-500 dark:text-purple-400" /> 4. Hosting Option
                            </h2>
                            <label htmlFor="includeHosting" className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${includeHosting ? 'bg-purple-50 dark:bg-purple-900/60 border-purple-500 dark:border-purple-400 shadow-lg' : 'bg-gray-50 dark:bg-gray-700/60 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}>
                                <input
                                    type="checkbox"
                                    id="includeHosting"
                                    checked={includeHosting}
                                    onChange={() => setIncludeHosting(!includeHosting)}
                                    className="h-5 w-5 text-purple-600 border-gray-400 rounded focus:ring-purple-500"
                                />
                                <div className="ml-3 flex-grow">
                                    <span className="font-medium text-gray-800 dark:text-gray-200">Managed Bot Hosting</span>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">We handle the setup, uptime, and maintenance.</p>
                                </div>
                                <span className="text-md font-bold text-gray-800 dark:text-gray-200">+ ${HOSTING_PRICE_MONTHLY.toFixed(2)}/mo</span>
                            </label>
                        </FadeInOnScroll>


                    </div>

                    {/* Columna de Resumen de Precio (Sticky) */}
                    <div className="lg:col-span-1">
                        <FadeInOnScroll delay={250} className="sticky top-28 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 border-b dark:border-gray-700 pb-3">
                                Order Summary
                            </h2>
                            <div className="space-y-2 text-sm mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Base Bot Price:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">${BASE_BOT_PRICE.toFixed(2)}</span>
                                </div>
                                {selectedModules.length > 0 && (
                                    <>
                                        {selectedModules.map(moduleId => {
                                            const module = predefinedModulesData.find(m => m.id === moduleId);
                                            return (
                                                <div key={moduleId} className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400"> + {module?.name}:</span>
                                                    <span className="font-medium text-gray-800 dark:text-gray-200">${module?.price.toFixed(2)}</span>
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                                {activeCustomCommands.length > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400"> + Custom Commands ({activeCustomCommands.length}):</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">${(activeCustomCommands.length * CUSTOM_COMMAND_PRICE).toFixed(2)}</span>
                                    </div>
                                )}
                                {includeHosting && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400"> + Monthly Hosting:</span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">${HOSTING_PRICE_MONTHLY.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                            <hr className="my-4 border-gray-300 dark:border-gray-600" />
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">Total:</span>
                                <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={isCheckoutDisabled}
                                className={`w-full inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-lg font-semibold
                           transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105
                           ${!isCheckoutDisabled
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
                            >
                                <ShoppingCart size={20} className="mr-2.5" />
                                Proceed to Checkout
                            </button>
                            {!botName.trim() && !isCheckoutDisabled && (
                                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-3 text-center flex items-center justify-center">
                                    <Info size={14} className="mr-1" /> Consider giving your bot a name for a personalized touch!
                                </p>
                            )}
                        </FadeInOnScroll>
                    </div>
                </div>

                <FadeInOnScroll delay={400}>
                    <div className="text-center mt-16">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-6 py-3 rounded-full text-md font-semibold
                         hover:bg-gray-300 dark:hover:bg-gray-600
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

export default CreateBotPage;