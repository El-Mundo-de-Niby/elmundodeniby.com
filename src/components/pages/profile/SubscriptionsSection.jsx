// src/components/pages/profile/MySubscriptionsSection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FadeInOnScroll from '../../common/FadeInOnScroll';
import { Repeat, CalendarCheck, DollarSign, AlertTriangle, CheckCircle, XCircle, Settings, Loader2, Package, Bot as BotIconLucide, ExternalLink, Info, Hash } from 'lucide-react';
import toast from 'react-hot-toast';

// Datos de ejemplo para las suscripciones del usuario
const userSubscriptionsData = [
    {
        id: 'sub001',
        serviceName: 'Moderator Pro Bot Hosting',
        botAvatarUrl: 'https://picsum.photos/seed/modprosub/100',
        planName: 'Premium Monthly',
        status: 'Active', // Active, Canceled, Past Due, Paused
        price: 9.99,
        currency: 'USD',
        renewalDate: '2025-07-15',
        startDate: '2024-02-15',
        billingCycle: 'Monthly',
        relatedOrderId: 'PED-20250215-EXAMPLE1', // ID de la orden de activación/última renovación
        relatedBotId: 'userbot001', // ID del bot en la sección "My Bots"
    },
    {
        id: 'sub002',
        serviceName: 'Custom AI Bot "Athena" - Support Plan',
        botAvatarUrl: 'https://picsum.photos/seed/athenasub/100',
        planName: 'Basic Support Yearly',
        status: 'Canceled',
        price: 49.99,
        currency: 'USD',
        renewalDate: '2024-12-01',
        startDate: '2023-12-01',
        endDate: '2024-05-01',
        billingCycle: 'Yearly',
        relatedOrderId: 'PED-20231201-EXAMPLE2',
        relatedBotId: 'userbot003',
    },
    {
        id: 'sub003',
        serviceName: 'Music Master Bot - Basic Access',
        botAvatarUrl: 'https://picsum.photos/seed/musicsub/100',
        status: 'Past Due',
        planName: 'Basic Monthly',
        price: 4.99,
        currency: 'USD',
        renewalDate: '2025-06-01',
        startDate: '2025-05-01',
        billingCycle: 'Monthly',
        relatedOrderId: 'PED-20250501-EXAMPLE3',
        relatedBotId: 'userbot002',
    },
];

const getSubscriptionStatusVisuals = (status) => {
    // (Como en la versión anterior)
    switch (status.toLowerCase()) {
        case 'active':
            return { icon: CheckCircle, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-800/50' };
        case 'canceled':
            return { icon: XCircle, color: 'text-gray-500 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-700/60' };
        case 'past due':
            return { icon: AlertTriangle, color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-800/50' };
        default:
            return { icon: Info, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-700/60' };
    }
};


const MySubscriptionsSection = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        // Simular carga de datos
        setTimeout(() => {
            setSubscriptions(userSubscriptionsData);
            setLoading(false);
        }, 800);
    }, []);

    const handleManageSubscription = (subscriptionId) => {
        toast.success(`Manage Subscription ID: ${subscriptionId} (Not Implemented). This could navigate to an external billing portal or a detailed subscription management page.`);
        // navigate(`/billing/manage/${subscriptionId}`);
    };

    const navigateToOrder = (orderId) => {
        // En el futuro, podrías pasar el orderId en el estado para que OrdersSection lo resalte
        navigate('/profile/orders', { state: { highlightOrderId: orderId } });
        toast.success(`Navigating to Order ID: ${orderId}. Highlighting feature not fully implemented in OrdersSection yet.`);
    };

    const navigateToBot = (botId) => {
        // Similar para bots
        navigate('/profile/bots', { state: { highlightBotId: botId } });
        toast.success(`Navigating to Bot ID: ${botId}. Highlighting feature not fully implemented in BotsManagementSection yet.`);
    };


    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-full min-h-[400px] text-gray-700 dark:text-gray-300">
                <Loader2 size={40} className="animate-spin text-blue-600 dark:text-blue-400 mb-4" />
                <p className="text-lg font-medium">Loading Your Subscriptions...</p>
            </div>
        );
    }

    return (
        <FadeInOnScroll className="w-full">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    <Repeat size={28} className="mr-3 text-blue-500 dark:text-blue-400" />
                    My Subscriptions
                </h2>
                {/* Podrías tener un botón para "Ver historial de facturación" */}
            </div>

            {subscriptions.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800/60 rounded-xl shadow border dark:border-gray-700/60 min-h-[300px] flex flex-col justify-center items-center">
                    <Repeat size={52} className="mx-auto text-gray-400 dark:text-gray-500 mb-5" strokeWidth={1.5} />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No Active Subscriptions</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                        You currently don't have any active subscriptions.
                    </p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-colors"
                    >
                        <Package size={18} className="mr-2" /> Explore Our Services
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    {subscriptions.map((sub, index) => {
                        const statusVisuals = getSubscriptionStatusVisuals(sub.status);
                        const StatusIcon = statusVisuals.icon;
                        return (
                            <FadeInOnScroll key={sub.id} delay={index * 50} className="block">
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700/70 p-5 transition-shadow hover:shadow-lg">
                                    <div className="flex flex-col sm:flex-row items-start gap-4">
                                        <img
                                            src={sub.botAvatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(sub.serviceName.substring(0, 2))}&background=random&color=fff&size=64`}
                                            alt={sub.serviceName}
                                            className="w-16 h-16 rounded-md object-cover border border-gray-200 dark:border-gray-600 flex-shrink-0"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors" onClick={() => sub.relatedBotId && navigateToBot(sub.relatedBotId)}>
                                                {sub.serviceName}
                                                {sub.relatedBotId && <ExternalLink size={14} className="inline-block ml-1.5 opacity-60" />}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{sub.planName}</p>
                                            <div className={`mt-1.5 px-2.5 py-0.5 inline-flex items-center rounded-full text-xs font-medium ${statusVisuals.bgColor} ${statusVisuals.color}`}>
                                                <StatusIcon size={13} className="mr-1" />
                                                {sub.status}
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right mt-3 sm:mt-0 flex-shrink-0">
                                            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                                ${sub.price.toFixed(2)} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">/{sub.billingCycle.replace('ly', '').toLowerCase()}</span>
                                            </p>
                                            {sub.status === 'Active' && sub.renewalDate && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-start sm:justify-end mt-0.5">
                                                    <CalendarCheck size={13} className="mr-1" /> Renews: {new Date(sub.renewalDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </p>
                                            )}
                                            {sub.status === 'Canceled' && sub.endDate && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-start sm:justify-end mt-0.5">
                                                    Ended: {new Date(sub.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700/70 flex flex-col sm:flex-row justify-between items-center gap-3">
                                        {sub.relatedOrderId ? (
                                            <button onClick={() => navigateToOrder(sub.relatedOrderId)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                                                <Hash size={12} className="mr-1" /> Order: {sub.relatedOrderId} <ExternalLink size={12} className="ml-1 opacity-60" />
                                            </button>
                                        ) : <div />} {/* Placeholder para mantener el layout si no hay order ID */}

                                        <div className="flex gap-2 mt-2 sm:mt-0">
                                            <button
                                                onClick={() => handleManageSubscription(sub.id)}
                                                className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-1.5 px-3 rounded-md flex items-center justify-center transition-colors"
                                            >
                                                <Settings size={14} className="mr-1.5" /> Manage
                                            </button>
                                            {sub.status === 'Active' && (
                                                <button
                                                    onClick={() => toast.success(`Cancel Subscription ${sub.id} (Not Implemented)`)}
                                                    className="text-xs bg-red-100 dark:bg-red-700/50 hover:bg-red-200 dark:hover:bg-red-700/70 text-red-600 dark:text-red-300 font-semibold py-1.5 px-3 rounded-md flex items-center justify-center transition-colors"
                                                >
                                                    <XCircle size={14} className="mr-1.5" /> Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </FadeInOnScroll>
                        );
                    })}
                </div>
            )}
        </FadeInOnScroll>
    );
};

export default MySubscriptionsSection;