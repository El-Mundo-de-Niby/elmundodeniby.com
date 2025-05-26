// src/components/pages/profile/tabs/BotCommandsTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Terminal, TerminalSquare, Settings, Save, Loader2, CheckCircle, Info, SlidersHorizontal, ChevronDown, ChevronUp , Edit2, Trash2, TextIcon, Layers as EmbedIcon } from 'lucide-react';
import ToggleSwitch from '../../../../common/ToggleSwitch';
import FormField from '../../../../common/FormField';
// Asumimos que ToggleSwitch se importa o se pasa como prop desde BotConfigurationPage
const BotCommandsTab = ({ botCommands = [], config, onConfigChange, onSaveConfiguration, isSaving, saveMessage }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedModules, setExpandedModules] = useState({});

    // Estados para Custom Commands
    const [customCommandsList, setCustomCommandsList] = useState(config?.customCommands || []);
    const [editingCustomCommand, setEditingCustomCommand] = useState(null); // null o el objeto del comando
    const [newCustomCommand, setNewCustomCommand] = useState({ name: '', response: '', responseType: 'text', isEnabled: true });

    // Asegurarse de que commandSettings exista en config
    const commandSettings = config.commandSettings || {};

    const handleToggleCommand = (commandId, currentState) => {
        onConfigChange({
            target: {
                name: 'commandSettings',
                value: {
                    ...commandSettings,
                    [commandId]: {
                        ...(commandSettings[commandId] || {}), // Mantener otras posibles configs del comando
                        isEnabled: !currentState,
                    },
                },
            },
        });
    };

    const toggleModuleExpansion = (moduleName) => {
        setExpandedModules(prev => ({ ...prev, [moduleName]: !prev[moduleName] }));
    };


    const filteredAndGroupedCommands = useMemo(() => {
        const groups = {};
        (botCommands || [])
            .filter(cmd =>
                cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cmd.module.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .forEach(cmd => {
                if (!groups[cmd.module]) {
                    groups[cmd.module] = [];
                }
                groups[cmd.module].push(cmd);
            });
        return groups;
    }, [botCommands, searchTerm]);

    // --- Lógica para Custom Commands ---
    const handleCustomCommandFieldChange = (e, commandId) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        if (commandId === 'new') {
            setNewCustomCommand(prev => ({ ...prev, [name]: val }));
        } else {
            setEditingCustomCommand(prev => ({ ...prev, [name]: val }));
        }
    };

    const handleSaveCustomCommand = (e) => {
        e.preventDefault();
        let newCommandsArray;
        const commandToSave = editingCustomCommand || newCustomCommand;

        if (!commandToSave.name.trim() || !commandToSave.response.trim()) {
            alert("Command name and response cannot be empty."); // Podrías usar un mensaje más elegante
            return;
        }
        // Validar que el nombre del comando empiece con el prefijo del bot (si es necesario)
        if (config.prefix && !commandToSave.name.startsWith(config.prefix)) {
            alert(`Custom command name should start with the bot prefix: "${config.prefix}"`);
            return;
        }


        if (editingCustomCommand) { // Editando existente
            newCommandsArray = customCommandsList.map(cmd => cmd.id === editingCustomCommand.id ? commandToSave : cmd);
        } else { // Añadiendo nuevo
            newCommandsArray = [...customCommandsList, { ...commandToSave, id: `customcmd_${Date.now()}` }];
        }
        setCustomCommandsList(newCommandsArray);
        onConfigChange({ target: { name: 'customCommands', value: newCommandsArray } });
        setEditingCustomCommand(null);
        setNewCustomCommand({ name: '', response: '', responseType: 'text', isEnabled: true }); // Resetear form nuevo
    };

    const handleEditCustomCommand = (command) => {
        setEditingCustomCommand(JSON.parse(JSON.stringify(command))); // Clonar para editar
        setNewCustomCommand({ name: '', response: '', responseType: 'text', isEnabled: true }); // Limpiar form de nuevo comando
    };

    const handleDeleteCustomCommand = (commandId) => {
        if (window.confirm("Are you sure you want to delete this custom command?")) {
            const newCommandsArray = customCommandsList.filter(cmd => cmd.id !== commandId);
            setCustomCommandsList(newCommandsArray);
            onConfigChange({ target: { name: 'customCommands', value: newCommandsArray } });
            if (editingCustomCommand?.id === commandId) {
                setEditingCustomCommand(null); // Si se estaba editando el que se borró
            }
        }
    };

    const handleToggleCustomCommandEnabled = (commandId) => {
        const newCommandsArray = customCommandsList.map(cmd =>
            cmd.id === commandId ? { ...cmd, isEnabled: !cmd.isEnabled } : cmd
        );
        setCustomCommandsList(newCommandsArray);
        onConfigChange({ target: { name: 'customCommands', value: newCommandsArray } });
    };

    const cancelEditCustomCommand = () => {
        setEditingCustomCommand(null);
    };
    // --- Fin Lógica para Custom Commands ---

    // Inicializar todos los módulos como expandidos por defecto
    useEffect(() => {
        if (botCommands && botCommands.length > 0) {
            const initialExpansionState = {};
            Object.keys(filteredAndGroupedCommands).forEach(moduleName => {
                initialExpansionState[moduleName] = true; // Expandir todos por defecto
            });
            setExpandedModules(initialExpansionState);
        }
    }, [botCommands]); // Ejecutar solo cuando botCommands cambia


    return (
        <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-3 mb-6 flex items-center">
                <TerminalSquare size={22} className="mr-2.5 text-blue-500 dark:text-blue-400" /> Manage Commands
            </h3>

            {/* Buscador */}
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search commands by name, description, or module..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    />
                </div>
            </div>

            {Object.keys(filteredAndGroupedCommands).length === 0 && searchTerm && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No commands match your search criteria.</p>
            )}

            {Object.entries(filteredAndGroupedCommands).map(([moduleName, commandsInModule]) => (
                <div key={moduleName} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg shadow-sm border dark:border-gray-700/50">
                    <button
                        onClick={() => toggleModuleExpansion(moduleName)}
                        className="w-full flex justify-between items-center py-2 text-left text-md font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600/50 rounded-md px-2"
                    >
                        <span>{moduleName} ({commandsInModule.length})</span>
                        {expandedModules[moduleName] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {expandedModules[moduleName] && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600/50 space-y-3">
                            {commandsInModule.map(cmd => {
                                // Determinar si el comando está habilitado
                                // Si no hay setting, usar defaultEnabled. Si no hay defaultEnabled, asumir true.
                                const isCmdEnabled = commandSettings[cmd.id] ? commandSettings[cmd.id].isEnabled : (cmd.defaultEnabled !== undefined ? cmd.defaultEnabled : true);
                                return (
                                    <div key={cmd.id} className="p-3 bg-white dark:bg-gray-700/70 rounded-md border dark:border-gray-600/70 flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-sm text-gray-800 dark:text-gray-100">{config.prefix || ''}{cmd.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{cmd.description}</p>
                                        </div>
                                        <ToggleSwitch
                                            name={`cmd-${cmd.id}-enabled`}
                                            checked={isCmdEnabled}
                                            onChange={() => handleToggleCommand(cmd.id, isCmdEnabled)}
                                             // Para accesibilidad
                                            srOnlyLabel={true} // Oculta la etiqueta visual si no la quieres al lado del toggle
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}

            {/* Sección de Custom Commands */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                    <SlidersHorizontal size={20} className="mr-2 text-green-500 dark:text-green-400" /> Custom Commands
                </h4>

                {/* Formulario para Añadir/Editar Comando Personalizado */}
                <form onSubmit={handleSaveCustomCommand} className="p-4 mb-6 bg-gray-100 dark:bg-gray-700/40 rounded-lg border dark:border-gray-600/50 space-y-3">
                    <h5 className="text-md font-medium text-gray-700 dark:text-gray-200">{editingCustomCommand ? 'Edit Custom Command' : 'Add New Custom Command'}</h5>
                    <FormField label="Command Name" name="custom_name">
                        <input type="text" name="name" placeholder={`e.g., ${config.prefix || '!'}mycommand`}
                            value={editingCustomCommand ? editingCustomCommand.name : newCustomCommand.name}
                            onChange={(e) => handleCustomCommandFieldChange(e, editingCustomCommand ? editingCustomCommand.id : 'new')}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm" />
                    </FormField>
                    <FormField label="Response" name="custom_response">
                        <textarea name="response" rows="3" placeholder="What the bot should say..."
                            value={editingCustomCommand ? editingCustomCommand.response : newCustomCommand.response}
                            onChange={(e) => handleCustomCommandFieldChange(e, editingCustomCommand ? editingCustomCommand.id : 'new')}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm sm:text-sm"></textarea>
                    </FormField>
                    <div className="flex items-center space-x-4">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Response Type:</p>
                        <label className="flex items-center space-x-1.5 cursor-pointer">
                            <input type="radio" name="responseType" value="text"
                                checked={(editingCustomCommand ? editingCustomCommand.responseType : newCustomCommand.responseType) === 'text'}
                                onChange={(e) => handleCustomCommandFieldChange(e, editingCustomCommand ? editingCustomCommand.id : 'new')}
                                className="form-radio h-4 w-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-500 focus:ring-blue-500" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">Plain Text</span>
                        </label>
                        <label className="flex items-center space-x-1.5 cursor-pointer">
                            <input type="radio" name="responseType" value="embed"
                                checked={(editingCustomCommand ? editingCustomCommand.responseType : newCustomCommand.responseType) === 'embed'}
                                onChange={(e) => handleCustomCommandFieldChange(e, editingCustomCommand ? editingCustomCommand.id : 'new')}
                                className="form-radio h-4 w-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-500 focus:ring-blue-500" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">Embed</span>
                        </label>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        {editingCustomCommand && (
                            <button type="button" onClick={cancelEditCustomCommand} className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md">Cancel Edit</button>
                        )}
                        <button type="submit" className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
                            {editingCustomCommand ? 'Save Changes' : 'Add Command'}
                        </button>
                    </div>
                </form>

                {/* Lista de Comandos Personalizados Existentes */}
                {customCommandsList.length > 0 ? (
                    customCommandsList.map(cmd => (
                        <div key={cmd.id} className="p-3 mt-2 bg-white dark:bg-gray-700/70 rounded-md border dark:border-gray-600/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div className="flex-grow">
                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{cmd.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs sm:max-w-sm md:max-w-md" title={cmd.response}>
                                    Response: {cmd.response.substring(0, 50)}{cmd.response.length > 50 ? '...' : ''}
                                </p>
                                <span className={`mt-1 inline-block px-1.5 py-0.5 text-[0.65rem] font-medium rounded-full ${cmd.responseType === 'embed' ? 'bg-purple-100 text-purple-700 dark:bg-purple-700/50 dark:text-purple-300' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'}`}>
                                    {cmd.responseType === 'embed' ? <EmbedIcon size={10} className="inline mr-1" /> : <TextIcon size={10} className="inline mr-1" />}
                                    {cmd.responseType.charAt(0).toUpperCase() + cmd.responseType.slice(1)}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 mt-2 sm:mt-0 self-start sm:self-center">
                                <ToggleSwitch name={`customcmd-${cmd.id}-enabled`} checked={cmd.isEnabled}
                                    onChange={() => handleToggleCustomCommandEnabled(cmd.id)}
                                    label="" srOnlyLabel={true} />
                                <button onClick={() => handleEditCustomCommand(cmd)} className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300" title="Edit Command">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDeleteCustomCommand(cmd.id)} className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400" title="Delete Command">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">No custom commands created yet. Add one above!</p>
                )}
            </div>


            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row items-center justify-end gap-3">
                {saveMessage && saveMessage.text && saveMessage.source === 'commands' && (
                    <div className={`text-sm flex items-center mr-auto py-1 px-2 rounded-md ${saveMessage.type === 'success' ? 'bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300 border-green-500/50' : 'bg-red-100 dark:bg-red-800/40 text-red-600 dark:text-red-300 border-red-500/50'}`}>
                        {saveMessage.type === 'success' ? <CheckCircle size={16} className="mr-1.5" /> : <Info size={16} className="mr-1.5" />}
                        {saveMessage.text}
                    </div>
                )}
                <button
                    type="button"
                    onClick={onSaveConfiguration}
                    disabled={isSaving}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-60">
                    {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                    Save Command Settings
                </button>
            </div>
        </div>
    );
};

export default BotCommandsTab;