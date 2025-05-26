// src/components/pages/profile/tabs/BotDeleteTab.jsx
import React, { useState } from 'react';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';

const BotDeleteTab = ({ bot, onDeleteBot, isDeleting }) => {
    const [confirmName, setConfirmName] = useState('');
    const [confirmCheckbox, setConfirmCheckbox] = useState(false);
    const [deleteReason, setDeleteReason] = useState(''); // Opcional

    if (!bot) {
        return <p className="text-center text-gray-500 dark:text-gray-400">Bot information not available.</p>;
    }

    const isDeletionAllowed = confirmName === bot.name && confirmCheckbox;

    const handleDelete = () => {
        if (isDeletionAllowed) {
            onDeleteBot(bot.id, deleteReason); // Pasar el ID del bot y el motivo
        }
    };

    return (
        <div className="animate-fade-in space-y-6 max-w-lg mx-auto"> {/* Centrado y con ancho máximo */}
            <div className="p-6 bg-red-50 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-700 rounded-xl shadow-lg text-center">
                <AlertTriangle size={48} className="mx-auto text-red-500 dark:text-red-400 mb-4" />
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-200 mb-3">
                    DANGER ZONE: Delete Bot
                </h3>
                <p className="text-sm text-red-600 dark:text-red-300 mb-4 leading-relaxed">
                    You are about to permanently delete <strong className="font-semibold">{bot.name}</strong>.
                    This action will remove the bot, its configuration, and all associated data.
                    This process cannot be undone.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700/60 space-y-4">
                <div>
                    <label htmlFor="confirmBotName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        To confirm, type the bot's name: <span className="font-semibold text-gray-900 dark:text-gray-100">{bot.name}</span>
                    </label>
                    <input
                        type="text"
                        id="confirmBotName"
                        value={confirmName}
                        onChange={(e) => setConfirmName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm"
                        placeholder="Type bot name here"
                    />
                </div>

                <div className="flex items-start">
                    <input
                        id="confirmAction"
                        name="confirmAction"
                        type="checkbox"
                        checked={confirmCheckbox}
                        onChange={(e) => setConfirmCheckbox(e.target.checked)}
                        className="h-5 w-5 text-red-600 border-gray-300 dark:border-gray-500 rounded focus:ring-red-500 mt-0.5"
                    />
                    <label htmlFor="confirmAction" className="ml-2.5 block text-sm text-red-700 dark:text-red-300">
                        I understand that this action is permanent and will delete all data associated with <span className="font-semibold">{bot.name}</span>.
                    </label>
                </div>

                {/* Opcional: Motivo de la eliminación */}
                <div>
                    <label htmlFor="deleteReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Reason for deletion (Optional)
                    </label>
                    <textarea
                        id="deleteReason"
                        rows="3"
                        value={deleteReason}
                        onChange={(e) => setDeleteReason(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder="Your feedback is valuable to us."
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={!isDeletionAllowed || isDeleting}
                        className={`w-full inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-lg shadow-lg text-white 
                        ${isDeletionAllowed && !isDeleting ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-red-400 dark:bg-red-700/50 cursor-not-allowed'}
                        focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors transform hover:scale-105 disabled:hover:scale-100`}
                    >
                        {isDeleting ? (
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        ) : (
                            <Trash2 size={20} className="mr-2" />
                        )}
                        {isDeleting ? 'Deleting Bot...' : `Permanently Delete ${bot.name}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BotDeleteTab;