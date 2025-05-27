// src/components/pages/profile/tabs/BotSupportTab.jsx
import React, { useState } from 'react';
import { LifeBuoy, Send, Info, CheckCircle, AlertCircle, ExternalLink, MailIcon, MessageSquare, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Si necesitas navegar a /contact
import FormField from '../../../../common/FormField';
import toast from 'react-hot-toast';

const BotSupportTab = ({
    bot,
    supportMessageContent,
    setSupportMessageContent,
    handleSendSupportRequest,
    supportSentMessage,
    isSaving // Para el estado de carga del botón de envío
}) => {
    const navigate = useNavigate();
    const [problemCategory, setProblemCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!problemCategory) {
            // Opcional: mostrar un error si la categoría no está seleccionada
            toast("Please select a problem category.");
            return;
        }
        // Enviar la categoría junto con el mensaje
        handleSendSupportRequest(e, { category: problemCategory, message: supportMessageContent });
    };

    const supportCategories = [
        { value: '', label: 'Select a category...' },
        { value: 'module_issue', label: 'Module Problem (e.g., Moderation, Music)' },
        { value: 'command_error', label: 'Specific Command Not Working' },
        { value: 'bot_crash', label: 'Bot is Crashing or Offline Unexpectedly' },
        { value: 'payment_billing', label: 'Payment or Subscription Issue' },
        { value: 'feature_request', label: 'Feature Request or Suggestion' },
        { value: 'other', label: 'Other Issue' },
    ];

    if (!bot) {
        return <div className="p-4 text-gray-500 dark:text-gray-400">Bot information not available.</div>;
    }

    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1 flex items-center">
                    <LifeBuoy size={22} className="mr-2.5 text-indigo-500 dark:text-indigo-400" /> Submit Support Ticket
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    If you're experiencing issues with <span className="font-semibold">{bot.name}</span> or have a question, please let us know.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 p-6 bg-gray-50 dark:bg-gray-700/30 rounded-lg border dark:border-gray-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Bot ID" name="botIdSupport">
                            <input type="text" id="botIdSupport" value={bot.id} readOnly
                                className="mt-0.5 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-600/50 border-gray-300 dark:border-gray-500 rounded-md shadow-sm sm:text-xs cursor-not-allowed" />
                        </FormField>
                        <FormField label="Current Plan" name="currentPlanSupport">
                            <input type="text" id="currentPlanSupport" value={bot.planDetails?.name || 'N/A'} readOnly
                                className="mt-0.5 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-600/50 border-gray-300 dark:border-gray-500 rounded-md shadow-sm sm:text-xs cursor-not-allowed" />
                        </FormField>
                    </div>

                    <FormField label="Category of Problem" name="problemCategory" required>
                        <select
                            id="problemCategory"
                            name="problemCategory"
                            value={problemCategory}
                            onChange={(e) => setProblemCategory(e.target.value)}
                            required
                            className="mt-0.5 block w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white dark:bg-gray-700 shadow-sm"
                        >
                            {supportCategories.map(cat => (
                                <option key={cat.value} value={cat.value} disabled={cat.value === ''}>{cat.label}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField label="Describe Your Issue" name="supportMessageContent" required>
                        <textarea id="supportMessageContent" name="supportMessageContent" rows="5"
                            value={supportMessageContent} onChange={(e) => setSupportMessageContent(e.target.value)} required
                            className="mt-0.5 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                            placeholder="Please provide as much detail as possible, including steps to reproduce the issue, error messages, etc."></textarea>
                    </FormField>

                    <div className="flex justify-end">
                        <button type="submit" disabled={isSaving || !supportMessageContent.trim() || !problemCategory.trim()}
                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-60">
                            {isSaving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send size={16} className="mr-2" />}
                            {isSaving ? 'Sending...' : 'Send Support Request'}
                        </button>
                    </div>
                    {supportSentMessage.text && (
                        <div className={`mt-3 text-xs p-2.5 rounded-md flex items-center border ${supportSentMessage.type === 'success' ? 'bg-green-50 dark:bg-green-800/40 text-green-700 dark:text-green-300 border-green-500/50' : 'bg-red-50 dark:bg-red-800/40 text-red-600 dark:text-red-300 border-red-500/50'}`}>
                            {supportSentMessage.type === 'success' ? <CheckCircle size={14} className="mr-1.5 flex-shrink-0" /> : <AlertCircle size={14} className="mr-1.5 flex-shrink-0" />}
                            {supportSentMessage.text}
                            {/* Podrías añadir el estado del último ticket aquí si lo guardas */}
                        </div>
                    )}
                </form>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b dark:border-gray-700 pb-3">
                    Other Support Channels
                </h3>
                <div className="space-y-3 text-sm">
                    <a href="https://discord.gg/YOUR_DISCORD_INVITE_CODE" target="_blank" rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group">
                        <MessageSquare size={18} className="mr-2.5 text-indigo-500 dark:text-indigo-400" />
                        <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-300">Join our Support Discord</span>
                        <ExternalLink size={14} className="ml-auto text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                    </a>
                    <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                        <MailIcon size={18} className="mr-2.5 text-indigo-500 dark:text-indigo-400" />
                        <span className="text-gray-700 dark:text-gray-200 font-medium">Contact Email: <a href="mailto:support@elmundodeniby.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@elmundodeniby.com</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BotSupportTab;