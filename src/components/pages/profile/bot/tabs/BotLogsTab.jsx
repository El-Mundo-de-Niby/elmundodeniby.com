// src/components/pages/profile/tabs/BotLogsTab.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { FileText, AlertCircle, Terminal, Info, Settings, User, MessageCircle, Calendar, Filter, Download, RotateCcw, LogsIcon } from 'lucide-react';
import FormField from '../../../../common/FormField';

const logTypeIcons = {
    COMMAND: { icon: Terminal, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
    ERROR: { icon: AlertCircle, color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/30' },
    SYSTEM: { icon: Settings, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' },
    EVENT: { icon: Info, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/30' },
    DEFAULT: { icon: FileText, color: 'text-gray-500 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-700/30' },
};

const LogEntry = ({ log }) => {
    const { icon: Icon, color, bg } = logTypeIcons[log.type] || logTypeIcons.DEFAULT;
    const date = new Date(log.timestamp);

    return (
        <div className={`p-3 rounded-md border dark:border-gray-700/60 shadow-sm ${bg} hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center">
                    <Icon size={16} className={`mr-2 flex-shrink-0 ${color}`} />
                    <span className={`text-xs font-semibold uppercase tracking-wider ${color}`}>{log.type}</span>
                </div>
                <span className="text-[0.7rem] text-gray-500 dark:text-gray-400">
                    {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} - {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-words">
                {log.message}
            </p>
            {(log.user || log.channel || log.commandName || log.eventType) && (
                <div className="mt-1.5 pt-1.5 border-t border-gray-200 dark:border-gray-600/50 text-[0.7rem] text-gray-500 dark:text-gray-400 space-x-3">
                    {log.user && <span className="inline-flex items-center"><User size={11} className="mr-1" />{log.user}</span>}
                    {log.channel && <span className="inline-flex items-center"><MessageCircle size={11} className="mr-1" />{log.channel}</span>}
                    {log.commandName && <span className="inline-flex items-center"><Terminal size={11} className="mr-1" />/{log.commandName}</span>}
                    {log.eventType && <span className="font-medium">{log.eventType}</span>}
                </div>
            )}
        </div>
    );
};

const BotLogsTab = ({ botLogs = [] }) => {
    const [filters, setFilters] = useState({
        type: 'ALL',
        dateRange: 'ALL_TIME', // 'LAST_24H', 'LAST_7D', 'ALL_TIME'
        userSearch: '',
    });
    const [displayCount, setDisplayCount] = useState(15); // Número de logs a mostrar inicialmente

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setDisplayCount(15); // Reset display count on filter change
    };

    const filteredLogs = useMemo(() => {
        let logs = [...botLogs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Ordenar por más reciente

        if (filters.type !== 'ALL') {
            logs = logs.filter(log => log.type === filters.type);
        }

        if (filters.userSearch) {
            const searchTerm = filters.userSearch.toLowerCase();
            logs = logs.filter(log =>
                (log.user && log.user.toLowerCase().includes(searchTerm)) ||
                (log.message && log.message.toLowerCase().includes(searchTerm))
            );
        }

        if (filters.dateRange !== 'ALL_TIME') {
            const now = new Date();
            let cutoffDate;
            if (filters.dateRange === 'LAST_24H') {
                cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            } else if (filters.dateRange === 'LAST_7D') {
                cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            }
            if (cutoffDate) {
                logs = logs.filter(log => new Date(log.timestamp) >= cutoffDate);
            }
        }
        return logs;
    }, [botLogs, filters]);

    const logsToDisplay = filteredLogs.slice(0, displayCount);
    const hasMoreLogs = displayCount < filteredLogs.length;

    const handleLoadMore = () => {
        setDisplayCount(prev => Math.min(prev + 15, filteredLogs.length));
    };

    const handleExportLogs = () => {
        // Simulación, en una app real esto generaría un archivo
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `bot_logs_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        alert("Logs exported (simulated).");
    };

    const resetFilters = () => {
        setFilters({ type: 'ALL', dateRange: 'ALL_TIME', userSearch: '' });
        setDisplayCount(15);
    }

    return (
        <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-3 mb-6 flex items-center">
                <LogsIcon size={22} className="mr-2.5 text-blue-500 dark:text-blue-400" /> Bot Activity Logs
            </h3>

            {/* Filtros */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg shadow-sm border dark:border-gray-700/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <FormField label="Log Type" name="type">
                        <select name="type" value={filters.type} onChange={handleFilterChange}
                            className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option value="ALL">All Types</option>
                            <option value="COMMAND">Commands</option>
                            <option value="ERROR">Errors</option>
                            <option value="SYSTEM">System</option>
                            <option value="EVENT">Events</option>
                        </select>
                    </FormField>
                    <FormField label="Date Range" name="dateRange">
                        <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}
                            className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option value="ALL_TIME">All Time</option>
                            <option value="LAST_24H">Last 24 Hours</option>
                            <option value="LAST_7D">Last 7 Days</option>
                        </select>
                    </FormField>
                    <FormField label="Search by User / Message" name="userSearch">
                        <input type="text" name="userSearch" placeholder="Enter keyword..." value={filters.userSearch} onChange={handleFilterChange}
                            className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                    </FormField>
                    <div className="flex space-x-2">
                        <button onClick={resetFilters} title="Reset Filters" className="p-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-md transition-colors h-9">
                            <RotateCcw size={16} />
                        </button>
                        <button onClick={handleExportLogs} className="flex-1 h-9 inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2 px-3 rounded-md shadow-sm transition-colors">
                            <Download size={14} className="mr-1.5" /> Export Logs
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de Logs */}
            {logsToDisplay.length > 0 ? (
                <div className="space-y-3">
                    {logsToDisplay.map(log => <LogEntry key={log.id} log={log} />)}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                    No logs found matching your current filters.
                </p>
            )}

            {hasMoreLogs && (
                <div className="flex justify-center mt-6">
                    <button onClick={handleLoadMore} className="flex items-center px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm">
                        Load More Logs
                    </button>
                </div>
            )}
        </div>
    );
};

export default BotLogsTab;