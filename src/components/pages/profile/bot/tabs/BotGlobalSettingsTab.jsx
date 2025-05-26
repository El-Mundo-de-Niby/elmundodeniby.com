// src/components/pages/profile/tabs/BotGlobalSettingsTab.jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, AlertTriangle, Edit3, Check, X } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import FormField from '../../../../common/FormField';

const BotGlobalSettingsTab = ({ config, handleConfigChange, botToken, onSaveToken }) => {
    const [localConfig, setLocalConfig] = useState(config);
    const [currentToken, setCurrentToken] = useState(botToken);
    const [isEditingToken, setIsEditingToken] = useState(false);
    const [tempToken, setTempToken] = useState(botToken);
    const [showToken, setShowToken] = useState(false);
    const [embedHexColor, setEmbedHexColor] = useState(config?.embedColor || '#5865F2');
    const [showColorPicker, setShowColorPicker] = useState(false);

    useEffect(() => {
        setLocalConfig(config);
        setEmbedHexColor(config?.embedColor || '#5865F2');
    }, [config]);

    useEffect(() => {
        setCurrentToken(botToken);
        setTempToken(botToken);
    }, [botToken]);

    const handleLocalConfigChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newConfigValue = type === 'checkbox' ? checked : value;

        setLocalConfig(prevConfig => ({
            ...prevConfig,
            [name]: newConfigValue,
        }));

        if (e.target && e.target.name) {
            handleConfigChange(e);
        } else {
            handleConfigChange({ target: { name: name, value: newConfigValue } });
        }
    };

    const handleEmbedColorChangeFromPicker = (newColor) => {
        setEmbedHexColor(newColor.toUpperCase());
    };

    const handleEmbedColorInputChange = (e) => {
        const newHex = e.target.value.toUpperCase();
        setEmbedHexColor(newHex);
    };

    const handleActivityTypeChange = (e) => {
        const newActivity = { ...(localConfig.botActivity || {}), type: e.target.value };
        setLocalConfig(prev => ({ ...prev, botActivity: newActivity }));
        handleConfigChange({ target: { name: 'botActivity', value: newActivity } });
    };

    const handleActivityNameChange = (e) => {
        const newActivity = { ...(localConfig.botActivity || {}), name: e.target.value };
        setLocalConfig(prev => ({ ...prev, botActivity: newActivity }));
        handleConfigChange({ target: { name: 'botActivity', value: newActivity } });
    };

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            alert('Token copied to clipboard!');
        }, (err) => {
            alert('Failed to copy token.');
        });
    };

    const handleEditToken = () => {
        setTempToken(currentToken);
        setIsEditingToken(true);
    };

    const handleSaveToken = () => {
        if (typeof onSaveToken === 'function') {
            onSaveToken(tempToken); // Llama a la función del padre para guardar
        }
        setCurrentToken(tempToken);
        setIsEditingToken(false);
    };

    const handleCancelEditToken = () => {
        setTempToken(currentToken);
        setIsEditingToken(false);
    };

    const activityTypes = [
        { label: 'Playing', value: 'PLAYING' },
        { label: 'Listening to', value: 'LISTENING' },
        { label: 'Watching', value: 'WATCHING' },
        { label: 'Competing in', value: 'COMPETING' },
    ];

    const languageOptions = [
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' },
    ];

    return (
        <div className="space-y-8">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-800/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-md">
                <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2.5 flex-shrink-0" />
                    <div>
                        <h4 className="text-sm font-semibold text-yellow-700 dark:text-yellow-200">Bot Token Security</h4>
                        <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-0.5">
                            Your bot token is highly sensitive. Never share it publicly.
                        </p>
                    </div>
                </div>
            </div>
            <FormField label="Bot Token" name="botToken" description="This token is used to authenticate your bot with Discord. Keep it secret.">
                <div className="flex items-center space-x-2">
                    {isEditingToken ? (
                        <input
                            type={showToken ? 'text' : 'password'}
                            value={tempToken}
                            onChange={(e) => setTempToken(e.target.value)}
                            className="mt-1 block w-full px-3.5 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            placeholder="Enter new bot token"
                        />
                    ) : (
                        <input
                            type={showToken ? 'text' : 'password'}
                            value={currentToken || 'TOKEN_NOT_SET'}
                            readOnly
                            className="mt-1 block w-full px-3.5 py-2 bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
                        />
                    )}
                    <button type="button" onClick={() => setShowToken(!showToken)} className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mt-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" title={showToken ? 'Hide' : 'Show'}>
                        {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {!isEditingToken && (
                        <button type="button" onClick={handleEditToken} className="p-2.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-1 rounded-md hover:bg-blue-500/10" title="Edit Token">
                            <Edit3 size={18} />
                        </button>
                    )}
                    {isEditingToken && (
                        <>
                            <button type="button" onClick={handleSaveToken} className="p-2.5 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 mt-1 rounded-md hover:bg-green-500/10" title="Save Token">
                                <Check size={18} />
                            </button>
                            <button type="button" onClick={handleCancelEditToken} className="p-2.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-1 rounded-md hover:bg-red-500/10" title="Cancel Edit">
                                <X size={18} />
                            </button>
                        </>
                    )}
                    <button type="button" onClick={() => copyToClipboard(currentToken)} disabled={!currentToken || isEditingToken} className="p-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mt-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" title="Copy Token">
                        <Copy size={18} />
                    </button>
                </div>
                {isEditingToken && <p className="mt-1.5 text-xs text-yellow-600 dark:text-yellow-300">Warning: Changing the token will invalidate the old one.</p>}
            </FormField>

            <FormField label="Command Prefix" name="prefix" description="The character(s) your bot will use to recognize commands. E.g., !, ?, $">
                <input type="text" name="prefix" id="prefix" value={localConfig.prefix || ''} onChange={handleLocalConfigChange}
                    className="mt-1 block w-full px-3.5 py-2 bg-white dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    maxLength={5} />
            </FormField>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">Embed Appearance</h4>
                <FormField label="Embed Accent Color" name="embedColor" description="Default color for the left border of embeds.">
                    <div className="flex items-center space-x-3 mt-1 relative">
                        <button
                            type="button"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ backgroundColor: embedHexColor }}
                            title="Click to change color"
                        />
                        <input
                            type="text"
                            id="embedColorText"
                            value={embedHexColor.toUpperCase()}
                            onChange={handleEmbedColorInputChange}
                            placeholder="#RRGGBB"
                            className="block w-32 px-3.5 py-2 bg-white dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm font-mono"
                            maxLength={7}
                        />
                        {showColorPicker && (
                            <div className="absolute z-10 top-full mt-2 left-0"> {/* Posiciona el picker */}
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700"
                                    onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del picker lo cierre si showColorPicker se controla globalmente
                                >
                                    <HexColorPicker color={embedHexColor} onChange={handleEmbedColorChangeFromPicker} />
                                </div>
                            </div>
                        )}
                    </div>
                </FormField>
                <FormField label="Embed Footer Text" name="embedFooter" description="Default text to display in the footer of embeds.">
                    <input type="text" name="embedFooter" id="embedFooter" value={localConfig.embedFooter || ''} onChange={handleLocalConfigChange}
                        className="mt-1 block w-full px-3.5 py-2 bg-white dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm" />
                </FormField>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-3">Bot Activity Status</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    <FormField label="Activity Type" name="botActivityType">
                        <select name="botActivityType" id="botActivityType" value={localConfig.botActivity?.type || 'PLAYING'} onChange={handleActivityTypeChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700/80 shadow-sm">
                            {activityTypes.map(type => (<option key={type.value} value={type.value}>{type.label}</option>))}
                        </select>
                    </FormField>
                    <FormField label="Activity Name" name="botActivityName">
                        <input type="text" name="botActivityName" id="botActivityName" value={localConfig.botActivity?.name || ''} onChange={handleActivityNameChange} placeholder="e.g., your commands"
                            className="mt-1 block w-full px-3.5 py-2 bg-white dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm" />
                    </FormField>
                </div>
            </div>

            <FormField label="Bot Language" name="language" description="Primary language for bot responses and commands.">
                <select name="language" id="language" value={localConfig.language || 'en'} onChange={handleLocalConfigChange}
                    className="mt-1 block w-full sm:w-1/2 pl-3 pr-10 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700/80 shadow-sm">
                    {languageOptions.map(lang => (<option key={lang.value} value={lang.value}>{lang.label}</option>))}
                </select>
            </FormField>
        </div>
    );
};

export default BotGlobalSettingsTab;