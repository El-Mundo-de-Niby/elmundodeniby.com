// src/components/shop/BotCard.jsx
import React from 'react';
import { ShoppingCart, Zap, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import FadeInOnScroll from '../../common/FadeInOnScroll';

const BotCard = ({ bot }) => {
    const navigate = useNavigate(); // Hook para la navegación

    const handleDetailsClick = () => {
        navigate(`/shop/${bot.id}`); // Navegar a la página de detalles del bot
    };

    return (
        <FadeInOnScroll className="h-full">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="w-full h-48 sm:h-56 overflow-hidden">
                    <img
                        src={bot.imageUrl || `https://picsum.photos/seed/${bot.id}/400/300`}
                        alt={bot.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                        {bot.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow leading-relaxed">
                        {bot.description}
                    </p>

                    {bot.features && bot.features.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Features</h4>
                            <ul className="space-y-1">
                                {bot.features.slice(0, 3).map((feature, index) => ( // Mostrar solo las primeras 3 características
                                    <li key={index} className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                                        <Zap size={14} className="mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                                {bot.features.length > 3 && (
                                    <li className="text-xs text-gray-500 dark:text-gray-400 mt-1">...and more</li>
                                )}
                            </ul>
                        </div>
                    )}

                    <div className="mt-auto">
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-5">
                            ${bot.price.toFixed(2)}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button
                                className="w-full inline-flex items-center justify-center bg-blue-600 text-white px-5 py-3 rounded-lg text-base font-semibold
                           hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                <ShoppingCart size={18} className="mr-2" /> Add to Cart
                            </button>
                            <button
                                onClick={handleDetailsClick} // Añadir onClick handler
                                className="w-full inline-flex items-center justify-center bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-5 py-3 rounded-lg text-base font-semibold
                           hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                <Info size={18} className="mr-2" /> Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </FadeInOnScroll>
    );
};

export default BotCard;