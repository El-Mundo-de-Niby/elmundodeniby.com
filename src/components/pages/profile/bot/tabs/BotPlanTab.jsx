// src/components/pages/profile/tabs/BotPlanSection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, RefreshCw, PlusCircle, ExternalLink, Info, AlertTriangle, CheckCircle, DollarSign, Hash } from 'lucide-react';

const PRICE_PER_DAY = 0.50; // Precio de ejemplo por día extra

const BotPlanSection = ({ bot }) => {
    const navigate = useNavigate();
    const [customDays, setCustomDays] = useState(1);
    const [customDaysPrice, setCustomDaysPrice] = useState(PRICE_PER_DAY);

    useEffect(() => {
        setCustomDaysPrice(customDays * PRICE_PER_DAY);
    }, [customDays]);

    if (!bot || !bot.planDetails) {
        return (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Plan and billing information is not available for this bot.
            </div>
        );
    }

    const { name: planName, purchaseDate, renewalType, price, currency } = bot.planDetails;
    const { subscriptionEndDate, relatedOrderId } = bot;

    const calculateDaysRemaining = (endDate) => {
        if (!endDate) return { text: 'N/A', numeric: null, isPast: false };
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Comparar solo fechas
        end.setHours(0, 0, 0, 0);

        const diffTime = end.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: `Expired ${Math.abs(diffDays)} day(s) ago`, numeric: diffDays, isPast: true };
        if (diffDays === 0) return { text: 'Expires today', numeric: diffDays, isPast: false };
        return { text: `${diffDays} day(s) remaining`, numeric: diffDays, isPast: false };
    };

    const daysRemainingInfo = calculateDaysRemaining(subscriptionEndDate);
    const formattedPurchaseDate = purchaseDate ? new Date(purchaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';
    const formattedEndDate = subscriptionEndDate ? new Date(subscriptionEndDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';

    const handleRenew = () => {
        alert(`Renew subscription for ${bot.name} (Plan: ${planName}) - Not Implemented`);
        // Lógica para redirigir a pasarela de pago o proceso de renovación
    };

    const handleAddCustomDays = () => {
        alert(`Add ${customDays} day(s) to ${bot.name} for $${customDaysPrice.toFixed(2)} - Not Implemented`);
        // Lógica para procesar el pago por días extra
    };

    const navigateToOrder = (orderId) => {
        if (!orderId) return;
        navigate('/profile/orders', { state: { highlightOrderId: orderId } });
        // La lógica de resaltado debe estar en OrdersSection
    };


    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-3">
                    Current Plan Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-lg shadow-sm border dark:border-gray-600/50">
                        <p className="font-medium text-gray-500 dark:text-gray-400">Plan Name</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">{planName}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-lg shadow-sm border dark:border-gray-600/50">
                        <p className="font-medium text-gray-500 dark:text-gray-400">Price</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                            ${price?.toFixed(2)} {currency} <span className="text-xs">/{renewalType?.replace('ly', '').toLowerCase()}</span>
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/40 p-4 rounded-lg shadow-sm border dark:border-gray-600/50">
                        <p className="font-medium text-gray-500 dark:text-gray-400">Purchase Date</p>
                        <p className="text-gray-700 dark:text-gray-300">{formattedPurchaseDate}</p>
                    </div>
                    <div className={`p-4 rounded-lg shadow-sm border ${daysRemainingInfo.isPast ? 'bg-red-50 dark:bg-red-900/30 border-red-500/50' : 'bg-gray-50 dark:bg-gray-700/40 dark:border-gray-600/50'}`}>
                        <p className={`font-medium ${daysRemainingInfo.isPast ? 'text-red-600 dark:text-red-300' : 'text-gray-500 dark:text-gray-400'}`}>Subscription Ends</p>
                        <p className={`font-semibold ${daysRemainingInfo.isPast ? 'text-red-700 dark:text-red-200' : 'text-gray-700 dark:text-gray-300'}`}>{formattedEndDate}</p>
                        <p className={`text-xs mt-0.5 ${daysRemainingInfo.isPast ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>({daysRemainingInfo.text})</p>
                    </div>
                    {relatedOrderId && (
                        <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700/40 p-4 rounded-lg shadow-sm border dark:border-gray-600/50">
                            <p className="font-medium text-gray-500 dark:text-gray-400">Associated Order ID</p>
                            <button onClick={() => navigateToOrder(relatedOrderId)} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center group">
                                {relatedOrderId} <ExternalLink size={12} className="ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sección de Renovación */}
            {!daysRemainingInfo.isPast && subscriptionEndDate && ( // Mostrar solo si no ha expirado
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-3">
                        Manage Subscription
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700/40 p-5 rounded-lg shadow-sm border dark:border-gray-600/50 space-y-4">
                        <div>
                            <button
                                onClick={handleRenew}
                                className="w-full sm:w-auto inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-md text-sm font-semibold shadow transition-colors"
                            >
                                <RefreshCw size={16} className="mr-2" /> Renew Subscription ({renewalType})
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">Renews for another {renewalType === 'Monthly' ? 'month' : 'year'} at ${price?.toFixed(2)}.</p>
                        </div>
                        <hr className="border-gray-200 dark:border-gray-600/50" />
                        <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Add Custom Duration:</p>
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        value={customDays}
                                        onChange={(e) => setCustomDays(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-20 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm text-center"
                                    />
                                    <span className="ml-2 text-gray-700 dark:text-gray-300">day(s)</span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 flex items-center">
                                    Extra cost:
                                    <DollarSign size={14} className="mx-0.5 text-green-500" />
                                    <span className="font-semibold text-lg">{customDaysPrice.toFixed(2)}</span>
                                </p>
                                <button
                                    onClick={handleAddCustomDays}
                                    className="sm:ml-auto inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-semibold shadow transition-colors"
                                >
                                    <PlusCircle size={16} className="mr-2" /> Add Days
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">Each extra day costs ${PRICE_PER_DAY.toFixed(2)}.</p>
                        </div>
                    </div>
                </div>
            )}

            {daysRemainingInfo.isPast && (
                <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-lg shadow-sm border border-red-500/50 text-center">
                    <AlertTriangle size={24} className="text-red-500 dark:text-red-400 mx-auto mb-2" />
                    <p className="text-md font-semibold text-red-700 dark:text-red-200 mb-2">Your subscription has expired.</p>
                    <p className="text-sm text-red-600 dark:text-red-300 mb-3">Please renew to continue using all features of {bot.name}.</p>
                    <button
                        onClick={handleRenew} // Botón de renovar aquí también
                        className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-md text-sm font-semibold shadow transition-colors"
                    >
                        <RefreshCw size={16} className="mr-2" /> Renew Now
                    </button>
                </div>
            )}

        </div>
    );
};

export default BotPlanSection;