// src/components/pages/profile/tabs/BotOverviewSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Power, RotateCcw, PowerOff, Loader2, Users, ServerIcon, Activity, Tag as VersionIcon, Link2, CheckCircle, XCircle, AlertTriangle as AlertIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const BotOverviewSection = ({
    bot,
    currentBotStatus,
    isPowerActionLoading,
    handlePowerAction,
}) => {
    const navigate = useNavigate();

    if (!bot) {
        return (
            <div className="flex justify-center items-center p-8 text-gray-500 dark:text-gray-400">
                Bot data is not available for the overview.
            </div>
        );
    }

    const handleInviteBot = () => {
        if (bot.inviteLink) {
            window.open(bot.inviteLink, '_blank', 'noopener,noreferrer');
        } else if (bot.clientId) {
            const genericInvite = `https://discord.com/oauth2/authorize?client_id=${bot.clientId}&scope=bot&permissions=8`; // Admin permissions by default
            window.open(genericInvite, '_blank', 'noopener,noreferrer');
            toast.success("Generated a generic invite link. You might need to adjust permissions in the Discord Developer Portal if this is a real bot.");
        } else {
            toast.error("No invite link or Client ID available for this bot to generate an invite link.");
        }
    };

    const StatusDisplay = () => {
        let Icon = AlertIcon;
        let colorClass = 'text-yellow-600 dark:text-yellow-400';
        let ringClass = 'ring-yellow-500/30';
        let pulseClass = '';

        if (currentBotStatus === 'Online') {
            Icon = CheckCircle;
            colorClass = 'text-green-600 dark:text-green-400';
            ringClass = 'ring-green-500/30';
            pulseClass = 'animate-pulse';
        } else if (currentBotStatus === 'Offline') {
            Icon = XCircle;
            colorClass = 'text-red-600 dark:text-red-400';
            ringClass = 'ring-red-500/30';
        } else if (currentBotStatus === 'Restarting...') {
            Icon = Loader2;
            colorClass = 'text-blue-600 dark:text-blue-400';
            ringClass = 'ring-blue-500/30';
            pulseClass = 'animate-spin';
        }
        // 'Needs Attention' ya usa amarillo y AlertIcon

        return (
            <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${currentBotStatus === 'Online' ? 'bg-green-100 dark:bg-green-800/40' : currentBotStatus === 'Offline' ? 'bg-red-100 dark:bg-red-800/40' : 'bg-yellow-100 dark:bg-yellow-800/40'} ${colorClass}`}>
                <Icon size={14} className={`mr-1.5 ${pulseClass}`} />
                {currentBotStatus}
            </div>
        );
    };

    const StatCard = ({ icon: Icon, label, value, iconColorClass = "text-gray-500 dark:text-gray-400" }) => (
        <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-lg shadow-sm border dark:border-gray-700/60 flex items-center">
            <div className={`p-2.5 mr-3 rounded-lg bg-gray-200 dark:bg-gray-600/70 ${iconColorClass}`}>
                <Icon size={18} strokeWidth={2} />
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{label}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{value || 'N/A'}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Power Controls and Status */}
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg border dark:border-gray-700/50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-0">
                        Bot Status & Controls
                    </h3>
                    <StatusDisplay />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                        onClick={() => handlePowerAction('turn_on')}
                        disabled={currentBotStatus === 'Online' || currentBotStatus === 'Restarting...' || isPowerActionLoading}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                        {isPowerActionLoading && currentBotStatus !== 'Online' && currentBotStatus !== 'Restarting...' ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Power size={16} className="mr-2" />}
                        Turn On
                    </button>
                    <button
                        onClick={() => handlePowerAction('turn_off')}
                        disabled={currentBotStatus !== 'Online' || isPowerActionLoading}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                        {isPowerActionLoading && currentBotStatus === 'Online' ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <PowerOff size={16} className="mr-2" />}
                        Turn Off
                    </button>
                    <button
                        onClick={() => handlePowerAction('restart')}
                        disabled={currentBotStatus !== 'Online' || isPowerActionLoading}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-800 bg-yellow-400 hover:bg-yellow-500 rounded-md shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                        {isPowerActionLoading && currentBotStatus === 'Online' && currentBotStatus !== 'Restarting...' ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <RotateCcw size={16} className="mr-2" />}
                        Restart
                    </button>
                </div>
            </div>


            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"> {/* Ajustado a 2 columnas para stats principales */}
                <StatCard icon={ServerIcon} label="Active Servers" value={bot.servers?.length || 0} iconColorClass="text-indigo-500 dark:text-indigo-400" />
                <StatCard icon={Users} label="Total Members Reach" value={bot.totalMembersInServers?.toLocaleString() || 'N/A'} iconColorClass="text-teal-500 dark:text-teal-400" />
                <StatCard icon={Activity} label="Reported Uptime" value={bot.uptime || 'N/A'} iconColorClass="text-lime-500 dark:text-lime-400" />
                <StatCard icon={VersionIcon} label="Bot Version" value={bot.version || 'N/A'} iconColorClass="text-purple-500 dark:text-purple-400" />
            </div>

            {/* Server List (Opcional, más detallado en una tab dedicada a "Servers" si es necesario) */}
            {bot.servers && bot.servers.length > 0 && (
                <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg border dark:border-gray-700/50">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                        Top Servers ({Math.min(bot.servers.length, 5)} of {bot.servers.length})
                    </h3>
                    <ul className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                        {bot.servers.slice(0, 5).map(server => ( // Mostrar solo los primeros 5
                            <li key={server.id || server.name} className="text-xs text-gray-600 dark:text-gray-300 p-2.5 bg-gray-50 dark:bg-gray-700 rounded-md flex items-center justify-between">
                                <div className="flex items-center truncate">
                                    <img src={server.iconUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(server.name.substring(0, 1))}&size=32&background=random&color=fff&bold=true&font-size=0.5`} alt={server.name} className="w-6 h-6 rounded mr-2 flex-shrink-0" />
                                    <span className="truncate font-medium" title={server.name}>{server.name}</span>
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{server.members?.toLocaleString()} members</span>
                            </li>
                        ))}
                        {bot.servers.length > 5 && (
                            <li className="text-xs text-center text-gray-400 dark:text-gray-500 pt-2">...and {bot.servers.length - 5} more servers.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BotOverviewSection;