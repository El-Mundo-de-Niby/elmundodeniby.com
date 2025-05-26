// src/components/pages/profile/tabs/BotModulesTab.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Settings, Shield, Music, MessageSquare, DollarSign, Award, FileText as LogsIconLucide, Save, Loader2, CheckCircle, Info } from 'lucide-react';
// Asumimos que FormField y ToggleSwitch se importan desde BotConfigurationPage o una ubicación común
// Si los definiste en BotConfigurationPage.jsx, necesitarás pasarlos como props o refactorizarlos a common.
// Para este ejemplo, los re-definiré aquí simplificadamente o asumiré que vienen como props.

// Si FormField y ToggleSwitch no se pasan como props, defínelos aquí o impórtalos.
const FormField = ({ label, name, children, description, LGSspan }) => (
    <div className={`mb-4 ${LGSspan ? 'md:col-span-2' : ''}`}>
        <label htmlFor={name} className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
        {children}
        {description && <p className="mt-1 text-[0.7rem] text-gray-500 dark:text-gray-500">{description}</p>}
    </div>
);
const ToggleSwitch = ({ label, name, checked, onChange, description }) => (
    <div className="flex items-center justify-between py-2">
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-800 dark:text-gray-200 select-none cursor-pointer" onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked } })}>{label}</label>
            {description && <p className="text-xs text-gray-500 dark:text-gray-400 select-none">{description}</p>}
        </div>
        <button type="button" id={name} name={name} onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked } })}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-700 focus:ring-blue-500 ${checked ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            aria-checked={checked} >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


const BotModulesTab = ({ botConfig, onConfigChange, onSaveConfiguration, isSaving, saveMessage }) => {
    const [expandedModule, setExpandedModule] = useState(null); // Qué módulo está expandido

    // Asegurarse de que modulesConfig exista
    const modulesConfig = botConfig.modulesConfig || {};

    const toggleModuleExpansion = (moduleName) => {
        setExpandedModule(expandedModule === moduleName ? null : moduleName);
    };

    const handleModuleEnabledChange = (moduleName, isEnabled) => {
        onConfigChange({
            target: {
                name: 'modulesConfig',
                value: {
                    ...modulesConfig,
                    [moduleName]: {
                        ...(modulesConfig[moduleName] || {}), // Mantener config existente del módulo
                        enabled: isEnabled,
                    },
                },
            },
        });
    };

    const handleModuleSpecificConfigChange = (moduleName, fieldName, value, type, checked) => {
        const specificValue = type === 'checkbox' ? checked : value;
        let finalValue = specificValue;

        // Manejo especial para listas como bannedWords
        if (fieldName === 'bannedWords') {
            finalValue = value.split(',').map(word => word.trim()).filter(Boolean);
        }

        onConfigChange({
            target: {
                name: 'modulesConfig',
                value: {
                    ...modulesConfig,
                    [moduleName]: {
                        ...(modulesConfig[moduleName] || {}),
                        [fieldName]: finalValue,
                    },
                },
            },
        });
    };


    const allModules = [
        { id: 'moderation', name: 'Moderation', icon: Shield, description: 'Auto-moderation, warnings, mutes, kicks, bans, etc.' },
        { id: 'music', name: 'Music', icon: Music, description: 'Play music from various sources, manage queues.' },
        { id: 'tickets', name: 'Ticket System', icon: MessageSquare, description: 'Allow users to create support tickets.' },
        { id: 'economy', name: 'Server Economy', icon: DollarSign, description: 'Implement a virtual currency, shop, jobs.' },
        { id: 'levels', name: 'Leveling System', icon: Award, description: 'Reward users with XP and levels for activity.' },
        { id: 'logs', name: 'Logging', icon: LogsIconLucide, description: 'Log server events to a designated channel.' },
    ];

    return (
        <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-3 mb-6">
                Configure Bot Modules
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Enable or disable modules for your bot. Click "Configure" on an enabled module to access its specific settings.
                Remember to save your changes for this tab at the bottom.
            </p>

            {allModules.map((module) => {
                const moduleData = modulesConfig[module.id] || { enabled: false };
                const isExpanded = expandedModule === module.id;

                return (
                    <div key={module.id} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg shadow-sm border dark:border-gray-700/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <module.icon size={20} className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                <div>
                                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100">{module.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{module.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                {moduleData.enabled && (
                                    <button
                                        onClick={() => toggleModuleExpansion(module.id)}
                                        className="p-1.5 text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                                        title={isExpanded ? "Hide Settings" : "Configure Module"}
                                    >
                                        {isExpanded ? <ChevronUp size={16} /> : <Settings size={16} />}
                                    </button>
                                )}
                                <ToggleSwitch
                                    name={`${module.id}-enabled`} // Nombre único para el input del toggle
                                    checked={moduleData.enabled}
                                    onChange={(e) => handleModuleEnabledChange(module.id, e.target.checked)}
                                />
                            </div>
                        </div>

                        {/* Contenido expandible con configuración específica del módulo */}
                        {moduleData.enabled && isExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600/50 space-y-4 animate-fade-in">
                                {/* Moderation Settings */}
                                {module.id === 'moderation' && (
                                    <>
                                        <FormField label="Default Mute Time" name={`${module.id}-defaultMuteTime`} description="e.g., 30m, 1h, 2d">
                                            <input type="text" value={moduleData.defaultMuteTime || '30m'}
                                                onChange={(e) => handleModuleSpecificConfigChange(module.id, 'defaultMuteTime', e.target.value)}
                                                className="mt-1 block w-full sm:w-1/2 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-xs" />
                                        </FormField>
                                        <FormField label="Banned Words (comma-separated)" name={`${module.id}-bannedWords`} LGSspan>
                                            <textarea value={Array.isArray(moduleData.bannedWords) ? moduleData.bannedWords.join(', ') : ''}
                                                onChange={(e) => handleModuleSpecificConfigChange(module.id, 'bannedWords', e.target.value)}
                                                rows="2"
                                                className="mt-1 block w-full px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-xs"></textarea>
                                        </FormField>
                                    </>
                                )}
                                {/* Music Settings */}
                                {module.id === 'music' && (
                                    <>
                                        <FormField label="Default Volume (0-100)" name={`${module.id}-defaultVolume`}>
                                            <input type="number" min="0" max="100" value={moduleData.defaultVolume || 60}
                                                onChange={(e) => handleModuleSpecificConfigChange(module.id, 'defaultVolume', parseInt(e.target.value))}
                                                className="mt-1 block w-24 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-xs" />
                                        </FormField>
                                        <FormField label="Inactivity Timeout" name={`${module.id}-inactivityTimeout`} description="e.g., 5m, 10m. Bot leaves VC if inactive.">
                                            <input type="text" value={moduleData.inactivityTimeout || '5m'}
                                                onChange={(e) => handleModuleSpecificConfigChange(module.id, 'inactivityTimeout', e.target.value)}
                                                className="mt-1 block w-full sm:w-1/2 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-xs" />
                                        </FormField>
                                        <ToggleSwitch label="Autoplay Recommended Songs" name={`${module.id}-autoplay`} checked={moduleData.autoplay || false}
                                            onChange={(e) => handleModuleSpecificConfigChange(module.id, 'autoplay', e.target.value, e.target.type, e.target.checked)} />
                                    </>
                                )}
                                {/* TODO: Añadir campos de configuración para Tickets, Economy, Levels, Logs */}
                                <p className="text-xs text-gray-400 dark:text-gray-500 italic">More settings for {module.name} will appear here.</p>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Botón de Guardar para la Configuración de Módulos */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600 flex justify-end">
                <button
                    type="button" // Cambiado a button si el form está en el padre
                    onClick={onSaveConfiguration} // Llama a la función de guardado del padre
                    disabled={isSaving}
                    className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-60">
                    {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                    Save Module Settings
                </button>
            </div>
            {saveMessage && saveMessage.text && saveMessage.source === 'modules' && ( // Mostrar mensaje de guardado específico para módulos
                <div className={`mt-4 text-sm p-3 rounded-md flex items-center border ${saveMessage.type === 'success' ? 'bg-green-50 dark:bg-green-800/40 text-green-600 dark:text-green-300 border-green-500/50' : 'bg-red-50 dark:bg-red-800/40 text-red-600 dark:text-red-300 border-red-500/50'}`}>
                    {saveMessage.type === 'success' ? <CheckCircle size={16} className="mr-2" /> : <Info size={16} className="mr-2" />}
                    {saveMessage.text}
                </div>
            )}
        </div>
    );
};

export default BotModulesTab;