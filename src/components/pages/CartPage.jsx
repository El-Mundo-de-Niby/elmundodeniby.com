// src/components/pages/CartPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import FadeInOnScroll from '../common/FadeInOnScroll';
import { ShoppingCart, Trash2, ArrowLeft, CreditCard, Home, Tag as DiscountIcon, XCircle, CheckCircle, Package, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Datos de ejemplo para el carrito (mantenerlos para la demo)
const initialCartItems = [
    {
        id: 'bot001_shop',
        name: 'Moderator Pro (Shop Bot)',
        description: 'Advanced moderation with auto-features for your server.',
        price: 29.99,
        quantity: 1,
        imageUrl: 'https://picsum.photos/seed/moderatorpro_cart/200/200',
        type: 'Prebuilt Bot'
    },
    {
        id: 'custom_bot_123',
        name: 'My Custom Super Bot',
        description: 'Includes Music, Moderation. 2 Custom Cmds. Hosting enabled.',
        price: 75.49,
        quantity: 1,
        imageUrl: 'https://picsum.photos/seed/custombot_cart/200/200',
        type: 'Custom Bot Configuration'
    },
];

const TAX_RATE = 0.08; // 8% de impuestos

const validDiscountCodes = {
    NIBY10: { type: 'percentage', value: 10 },
    SAVE5: { type: 'fixed', value: 5.00 },
    FRESHBOT: { type: 'percentage', value: 15, minSubtotal: 50 }
};

const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [discountCodeInput, setDiscountCodeInput] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [discountMessage, setDiscountMessage] = useState({ type: '', text: '' });

    const handleRemoveItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        // En una app real: si se elimina un ítem y un descuento aplicado ya no es válido, recalcular/quitar.
    };

    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        if (!appliedDiscount) return 0;
        let amount = 0;
        if (appliedDiscount.type === 'percentage') {
            amount = subtotal * (appliedDiscount.value / 100);
        } else if (appliedDiscount.type === 'fixed') {
            amount = appliedDiscount.value;
        }
        return Math.min(amount, subtotal); // El descuento no puede ser mayor que el subtotal
    }, [subtotal, appliedDiscount]);

    const subtotalAfterDiscount = subtotal - discountAmount;
    const taxes = subtotalAfterDiscount * TAX_RATE;
    const total = subtotalAfterDiscount + taxes;

    const handleApplyDiscount = () => {
        const code = discountCodeInput.trim().toUpperCase();
        const discount = validDiscountCodes[code];

        if (discount) {
            if (discount.minSubtotal && subtotal < discount.minSubtotal) {
                setDiscountMessage({ type: 'error', text: `Code ${code} requires a subtotal of at least $${discount.minSubtotal.toFixed(2)}.` });
                setAppliedDiscount(null);
                return;
            }
            setAppliedDiscount({ code, ...discount });
            setDiscountMessage({ type: 'success', text: `Discount "${code}" applied successfully!` });
        } else {
            setDiscountMessage({ type: 'error', text: 'Invalid or expired discount code.' });
            setAppliedDiscount(null);
        }
    };

    const handleRemoveDiscount = () => {
        setAppliedDiscount(null);
        setDiscountCodeInput('');
        setDiscountMessage({ type: '', text: '' });
    };

    if (cartItems.length === 0) {
        return (
            <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 text-center">
                    <FadeInOnScroll>
                        <ShoppingCart size={72} className="mx-auto text-gray-400 dark:text-gray-500 mb-8" strokeWidth={1.5} />
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
                            Your Cart is Empty
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto">
                            It seems you haven't found the perfect bot yet. Explore our shop or create your own masterpiece!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/shop')}
                                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3.5 rounded-lg text-md font-semibold
                           hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-blue-500/30 transform hover:scale-105"
                            >
                                <Package size={20} className="mr-2" /> Explore Shop Bots
                            </button>
                            <button
                                onClick={() => navigate('/create-bot')}
                                className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-3.5 rounded-lg text-md font-semibold
                           hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
                            >
                                <Wand2 size={20} className="mr-2" /> Create a Custom Bot
                            </button>
                        </div>
                    </FadeInOnScroll>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 md:py-32 bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl"> {/* Aumentado max-w para más espacio */}
                <FadeInOnScroll>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center mb-4 sm:mb-0">
                            <ShoppingCart size={40} className="mr-4 text-blue-600 dark:text-blue-400" strokeWidth={2} /> Your Cart
                        </h1>
                        <button
                            onClick={() => navigate('/shop')}
                            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group transition-colors"
                        >
                            <ArrowLeft size={18} className="mr-1.5 transition-transform duration-300 group-hover:-translate-x-1" />
                            Continue Shopping
                        </button>
                    </div>
                </FadeInOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-8 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl border dark:border-gray-700">
                        <FadeInOnScroll>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                                Cart Items ({cartItems.length})
                            </h2>
                        </FadeInOnScroll>
                        {cartItems.length > 0 ? (
                            <div className="space-y-6">
                                {cartItems.map((item, index) => (
                                    <FadeInOnScroll key={item.id} delay={index * 50}>
                                        <div className="flex flex-col sm:flex-row items-start gap-x-6 gap-y-4 p-4 sm:p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700/40">
                                            <img
                                                src={item.imageUrl || 'https://picsum.photos/seed/defaultcart/200/200'}
                                                alt={item.name}
                                                className="w-full sm:w-28 h-28 object-cover rounded-lg flex-shrink-0 shadow-sm"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{item.name}</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded-full inline-block">{item.type}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-normal line-clamp-2 sm:line-clamp-none">{item.description}</p>
                                            </div>
                                            <div className="flex flex-col items-start sm:items-end sm:ml-auto mt-2 sm:mt-0 w-full sm:w-auto">
                                                <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 whitespace-nowrap">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors flex items-center group"
                                                    aria-label={`Remove ${item.name}`}
                                                >
                                                    <Trash2 size={14} className="mr-1 group-hover:scale-110 transition-transform" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </FadeInOnScroll>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 py-8 text-center">No items in your cart yet.</p>
                        )}
                    </div>

                    {/* Order Summary Section */}
                    <div className="lg:col-span-4">
                        <FadeInOnScroll delay={cartItems.length * 50 + 50} className="sticky top-28 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl border dark:border-gray-700">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-3 text-sm mb-5">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">${subtotal.toFixed(2)}</span>
                                </div>
                                {appliedDiscount && (
                                    <div className="flex justify-between text-green-600 dark:text-green-400">
                                        <span className="flex items-center">
                                            <DiscountIcon size={14} className="mr-1.5" />
                                            Discount ({appliedDiscount.code}):
                                        </span>
                                        <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal (after disc.):</span>
                                    <span className={`font-medium ${appliedDiscount ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>${subtotalAfterDiscount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Taxes ({(TAX_RATE * 100).toFixed(0)}%):</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">${taxes.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Discount Code Input */}
                            <div className="mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <label htmlFor="discountCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Have a discount code?
                                </label>
                                <div className="flex items-stretch gap-2">
                                    <input
                                        type="text"
                                        id="discountCode"
                                        value={discountCodeInput}
                                        onChange={(e) => {
                                            setDiscountCodeInput(e.target.value);
                                            if (discountMessage.text) setDiscountMessage({ type: '', text: '' });
                                        }}
                                        placeholder="Enter code"
                                        className="flex-grow px-3.5 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                        disabled={!!appliedDiscount}
                                    />
                                    {!appliedDiscount ? (
                                        <button
                                            onClick={handleApplyDiscount}
                                            className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white text-sm font-semibold rounded-md transition-colors shadow-sm"
                                        >
                                            Apply
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleRemoveDiscount}
                                            className="p-2.5 text-red-500 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors shadow-sm"
                                            title="Remove discount code"
                                        >
                                            <XCircle size={20} />
                                        </button>
                                    )}
                                </div>
                                {discountMessage.text && (
                                    <p className={`text-xs mt-2 flex items-center ${discountMessage.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                        {discountMessage.type === 'success' ? <CheckCircle size={14} className="mr-1.5 flex-shrink-0" /> : <XCircle size={14} className="mr-1.5 flex-shrink-0" />}
                                        {discountMessage.text}
                                    </p>
                                )}
                            </div>
                            {/* End Discount Code Input */}

                            <hr className="my-5 border-gray-200 dark:border-gray-600" />
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Order Total:</span>
                                <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => toast.success('Proceeding to Checkout (Not Implemented)')}
                                className="w-full inline-flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-semibold
                           hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:scale-105"
                            >
                                <CreditCard size={22} className="mr-2.5" /> Proceed to Checkout
                            </button>
                        </FadeInOnScroll>
                    </div>
                </div>

                <FadeInOnScroll delay={200}>
                    <div className="text-center mt-20">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full text-md font-semibold
                         hover:bg-gray-50 dark:hover:bg-gray-700
                         transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <Home className="mr-2" size={18} /> Back to Home
                        </button>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
};

export default CartPage;