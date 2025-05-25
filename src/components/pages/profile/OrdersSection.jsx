// src/components/pages/profile/OrdersSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
    Mail, Bot, Server, Eye, Package, Calendar, User, DollarSign, CreditCard, Settings, Clock,
    CheckCircle, XCircle, Hourglass, Truck, ClipboardList, ChevronDown, ChevronUp,
    Loader2, Info, Hash, ListOrdered, Palette, FileText as FileTextIcon, Repeat, Check
} from 'lucide-react';
import FadeInOnScroll from '../../common/FadeInOnScroll';

const generateOrderId = () => {
    const date = new Date();
    return `PED-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

const getStatusVisuals = (status) => {
    switch (status.toLowerCase()) {
        case 'completado':
            return { icon: CheckCircle, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-800/50', borderColor: 'border-green-500/40 dark:border-green-600/50', ringColor: 'ring-green-500/50' };
        case 'en proceso':
            return { icon: Truck, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-800/50', borderColor: 'border-blue-500/40 dark:border-blue-600/50', ringColor: 'ring-blue-500/50' };
        case 'pendiente':
            return { icon: Hourglass, color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-800/50', borderColor: 'border-yellow-500/40 dark:border-yellow-600/50', ringColor: 'ring-yellow-500/50' };
        case 'cancelado': case 'fallido':
            return { icon: XCircle, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-800/50', borderColor: 'border-red-500/40 dark:border-red-600/50', ringColor: 'ring-red-500/50' };
        default:
            return { icon: Info, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-700/50', borderColor: 'border-gray-500/40 dark:border-gray-600/50', ringColor: 'ring-gray-500/50' };
    }
};

const DetailRow = ({ icon: Icon, label, value, valueClass = "font-medium text-gray-700 dark:text-gray-200", isMono = false }) => (
    <div className="flex items-start py-1 text-xs">
        {Icon && <Icon size={14} className="mr-2 mt-px text-gray-400 dark:text-gray-500 flex-shrink-0" />}
        <span className="text-gray-500 dark:text-gray-400 w-28 sm:w-36 flex-shrink-0">{label}:</span>
        <span className={`${valueClass} ${isMono ? 'font-mono' : ''} break-words`}>{value || '-'}</span> {/* Añadido fallback por si value es undefined */}
    </div>
);

const OrdersSection = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [displayCount, setDisplayCount] = useState(4);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simular delay
            try {
                // DATOS DE EJEMPLO RESTAURADOS Y COMPLETOS
                const mockOrders = Array.from({ length: 15 }, (_, i) => ({
                    id: generateOrderId(),
                    creationDate: new Date(Date.now() - i * 86400000 * 3 - Math.random() * 10800000), // Fechas más variadas
                    status: ['completado', 'en proceso', 'pendiente', 'cancelado', 'fallido'][i % 5],
                    orderType: i % 3 === 0 ? 'Subscription Renewal' : 'One-Time Purchase',
                    customer: {
                        id: `CUST-0${i + 1}`,
                        email: `user${i + 1}@example.com`,
                        discordUsername: i % 2 === 0 ? `Gamer${1000 + i}` : null
                    },
                    content: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (__, j) => ({ // 1 o 2 items
                        name: `Service Plan Alpha ${i + 1}-${j + 1}`,
                        description: `Includes premium support and feature set ${String.fromCharCode(65 + j)}.`,
                        quantity: 1,
                        unitPrice: parseFloat((Math.random() * 40 + 15).toFixed(2)), // Precios entre 15 y 55
                    })).map(item => ({ ...item, totalPrice: item.unitPrice * item.quantity })),
                    payment: {
                        method: ['Stripe CC', 'PayPal Account', 'CoinPayments'][i % 3],
                        status: ['Paid', 'Processing', 'Refunded'][i % 3],
                        transactionId: `TRX_${Math.random().toString(36).slice(2, 14)}`, // ID de transacción más largo
                        paymentDate: new Date(Date.now() - i * 86400000 * 3)
                    },
                    technicalData: {
                        botName: i % 2 === 0 ? `MyCustomBot_v${i + 1}.0` : null,
                        discordServerId: i % 3 !== 0 ? `SRV-${(Math.random() * 1e17).toString(16)}` : null, // Algunos sin server ID
                        estimatedDelivery: `${Math.floor(Math.random() * 2) + 1} business days`
                    },
                }));
                setAllOrders(mockOrders);
            } catch (err) {
                console.error("OrdersSection: Error fetching orders", err);
                setError("Could not load your orders at this time. Please try again later.");
            } finally {
                setLoading(false); // ESTO ES CRUCIAL
            }
        };
        fetchOrders();
    }, []);

    const toggleExpand = (orderId) => setExpandedOrderId(expandedOrderId === orderId ? null : orderId);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        await new Promise(resolve => setTimeout(resolve, 600));
        setDisplayCount(prevCount => Math.min(prevCount + 4, allOrders.length));
        setLoadingMore(false);
    };

    // ESTADOS DE CARGA, ERROR Y VACÍO
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center py-20 min-h-[400px] text-gray-700 dark:text-gray-300"> {/* Aumentada la altura mínima */}
                <Loader2 size={40} className="animate-spin text-blue-500 dark:text-blue-400 mb-4" />
                <p className="text-lg font-semibold">Loading Your Orders...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Please wait a few moments.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-6 bg-red-50 dark:bg-red-800/30 border border-red-300 dark:border-red-600/40 rounded-xl text-red-600 dark:text-red-300 min-h-[400px] flex flex-col justify-center items-center">
                <XCircle size={44} className="mb-4" /> {/* Icono más grande */}
                <h3 className="text-xl font-semibold mb-2">Oops! Something Went Wrong</h3>
                <p className="text-sm max-w-md mx-auto">{error}</p>
            </div>
        );
    }

    const ordersToDisplay = allOrders.slice(0, displayCount);
    const hasMoreOrders = displayCount < allOrders.length;

    if (ordersToDisplay.length === 0) { // Solo se muestra si no hay loading, no hay error, y la lista está vacía.
        return (
            <div className="text-center py-16 bg-white dark:bg-gray-800/70 rounded-xl shadow border dark:border-gray-700/60 min-h-[400px] flex flex-col justify-center items-center">
                <Package size={52} className="mx-auto text-gray-400 dark:text-gray-500 mb-5" strokeWidth={1.5} /> {/* Icono más grande */}
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No Orders Found</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">You haven't placed any orders with us yet.</p>
            </div>
        );
    }

    return (
        <FadeInOnScroll className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                My Orders
            </h2>
            <div className="space-y-4"> {/* Contenedor de las tarjetas */}
                {ordersToDisplay.map((order, index) => {
                    const isExpanded = expandedOrderId === order.id;
                    const totalAmount = order.content.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
                    const statusVisuals = getStatusVisuals(order.status);
                    const IconForStatus = statusVisuals.icon;
                    const OrderTypeIcon = order.orderType?.toLowerCase().includes('subscription') ? Repeat : Check;

                    return (
                        <FadeInOnScroll key={order.id} delay={index * 25} className="block">
                            <div
                                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 ease-in-out border 
                                            ${isExpanded ? statusVisuals.borderColor + ' ring-1 ' + statusVisuals.ringColor : 'border-gray-200 dark:border-gray-700/60 hover:shadow-lg dark:hover:border-gray-600/80'}`}
                            >
                                {/* Vista Colapsada */}
                                <div className="p-4 cursor-pointer" onClick={() => toggleExpand(order.id)}>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                        <div className="mb-1.5 sm:mb-0">
                                            <p className="text-[0.65rem] font-semibold text-gray-400 dark:text-gray-500 flex items-center tracking-wider"><Hash size={10} className="mr-1" />ORDER ID</p>
                                            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-100 tracking-tight">{order.id}</h3>
                                        </div>
                                        <div className={`px-2 py-0.5 rounded-full text-[0.7rem] font-semibold flex items-center ${statusVisuals.bgColor} ${statusVisuals.color} self-start sm:self-center`}>
                                            <IconForStatus size={12} className="mr-1" />
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1 text-[0.7rem] sm:text-xs">
                                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                                            <Calendar size={12} className="mr-1 text-gray-400 dark:text-gray-500" />
                                            {new Date(order.creationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                                            <ListOrdered size={12} className="mr-1 text-gray-400 dark:text-gray-500" />
                                            {order.content.length} item(s)
                                        </div>
                                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                                            <OrderTypeIcon size={12} className="mr-1 text-gray-400 dark:text-gray-500" />
                                            {order.orderType || 'Purchase'}
                                        </div>
                                        <div className="col-span-2 sm:col-span-3 sm:justify-end flex items-center text-gray-700 dark:text-gray-200 mt-1.5 sm:mt-0.5">
                                            <span className="text-[0.7rem] sm:text-xs mr-1 text-gray-500 dark:text-gray-400">Total:</span>
                                            <DollarSign size={13} className="mr-0.5 text-green-500" />
                                            <span className="font-bold text-sm sm:text-md">${totalAmount}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contenido Expandible */}
                                {isExpanded && (
                                    <div className="border-t border-gray-200 dark:border-gray-700/60 p-4 space-y-3 animate-fade-in">
                                        <section>
                                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider flex items-center"><ClipboardList size={14} className="mr-1.5" />Order Items</h4>
                                            <div className="space-y-1.5">
                                                {order.content.map((item, idx) => (
                                                    <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-700/60 rounded-md text-xs">
                                                        <div className="flex justify-between items-center font-medium text-gray-700 dark:text-gray-100">
                                                            <span>{item.name} (x{item.quantity})</span>
                                                            <span>${item.totalPrice.toFixed(2)}</span>
                                                        </div>
                                                        {item.description && <p className="text-[0.7rem] text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                        <section>
                                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider flex items-center"><User size={14} className="mr-1.5" />Customer</h4>
                                            <DetailRow icon={Mail} label="Email" value={order.customer.email} />
                                            {order.customer.discordUsername && <DetailRow icon={User} label="Discord" value={order.customer.discordUsername} />}
                                        </section>
                                        <section>
                                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider flex items-center"><CreditCard size={14} className="mr-1.5" />Payment</h4>
                                            <DetailRow icon={Palette} label="Method" value={order.payment.method} />
                                            <DetailRow icon={Info} label="Status" value={order.payment.status} />
                                            <DetailRow
                                                icon={order.orderType?.toLowerCase().includes('subscription') ? Repeat : Check}
                                                label="Order Type"
                                                value={order.orderType || 'One-Time Purchase'}
                                            />
                                            <DetailRow icon={FileTextIcon} label="Transaction ID" value={order.payment.transactionId} isMono />
                                        </section>
                                        {(order.technicalData.botName || order.technicalData.discordServerId || order.technicalData.estimatedDelivery) && (
                                            <section>
                                                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider flex items-center"><Settings size={14} className="mr-1.5" />Technical Details</h4>
                                                {order.technicalData.botName && <DetailRow icon={Bot} label="Bot Name" value={order.technicalData.botName} />}
                                                {order.technicalData.discordServerId && <DetailRow icon={Server} label="Server ID" value={order.technicalData.discordServerId} isMono />}
                                                {order.technicalData.estimatedDelivery && <DetailRow icon={Clock} label="Est. Delivery" value={order.technicalData.estimatedDelivery} />}
                                            </section>
                                        )}
                                    </div>
                                )}

                                <div className={`border-t border-gray-200 dark:border-gray-700/60 px-5 py-2 text-center ${isExpanded ? statusVisuals.bgColor + ' dark:bg-opacity-20' : 'bg-gray-50/30 dark:bg-gray-800/40'}`}>
                                    <button
                                        onClick={() => toggleExpand(order.id)}
                                        className={`inline-flex items-center text-[0.7rem] font-semibold ${isExpanded ? statusVisuals.color : 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'} group transition-colors`}
                                    >
                                        {isExpanded ? <ChevronUp size={14} className="mr-0.5" /> : <ChevronDown size={14} className="mr-0.5" />}
                                        {isExpanded ? 'Show Less' : 'Show More Details'}
                                    </button>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    );
                })}
            </div>

            {hasMoreOrders && (
                <div className="flex justify-center mt-6 mb-2">
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="flex items-center px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-70 transition-colors shadow-sm"
                    >
                        {loadingMore ? <Loader2 size={15} className="mr-1.5 animate-spin" /> : <Eye size={15} className="mr-1.5" />}
                        {loadingMore ? 'Loading...' : 'Load More Orders'}
                    </button>
                </div>
            )}
        </FadeInOnScroll>
    );
};

export default OrdersSection;