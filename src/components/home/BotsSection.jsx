// src/components/home/BotsSection.jsx
import React from 'react';
import FadeInOnScroll from '../common/FadeInOnScroll';
import { Bot, Users, Server, Cpu, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BotsSection = () => {
    const navigate = useNavigate();

    const services = [
        {
            id: 'custom-bots', // ID único para la ruta
            icon: Bot,
            title: "Custom Discord Bots",
            description: "We develop unique bots, perfectly tailored to your server's specific needs, from utilities to games.",
            // link: "/services/custom-bots" // Ya no es necesario si usamos el id para navegar
        },
        {
            id: 'community-automation', // ID único
            icon: Users,
            title: "Community Automation",
            description: "Optimize your community management with automated workflows, user welcomes, moderation, and much more.",
        },
        {
            id: 'server-management', // ID único
            icon: Server,
            title: "Advanced Server Management",
            description: "Powerful tools for moderation, dynamic role assignment, and efficient member and channel administration.",
        },
        {
            id: 'ai-api-integration', // ID único
            icon: Cpu,
            title: "AI and API Integration",
            description: "Intelligent bots with artificial intelligence capabilities and seamless integration with external services and databases.",
        }
    ];

    const handleLearnMoreClick = (serviceId) => {
        navigate(`/services/${serviceId}`); // Navegar a la página de detalle del servicio
    };

    return (
        <section id="our-bots-section" className="min-h-screen flex items-center justify-center py-20 md:py-32 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-6 max-w-7xl text-center">
                <FadeInOnScroll>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-5 leading-tight tracking-tight">
                        Bots Tailored To Your Needs
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-16 md:mb-20 leading-relaxed max-w-3xl mx-auto">
                        We craft specialized Discord bots designed to enhance communities, automate tasks, and provide unique interactive experiences. Explore our core specialities.
                    </p>
                </FadeInOnScroll>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <FadeInOnScroll key={service.id} delay={index * 100} className="h-full">
                            <div className="bg-gray-50 dark:bg-gray-800/70 rounded-xl shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20
                                            p-8 transition-all duration-300 ease-in-out transform hover:-translate-y-2
                                            h-full flex flex-col border border-transparent hover:border-blue-500/50 dark:border-gray-700 dark:hover:border-blue-400/50">
                                <div className="mx-auto mb-6 flex items-center justify-center
                                                w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700
                                                shadow-lg ring-4 ring-white/10 dark:ring-gray-900/20">
                                    {React.createElement(service.icon, { className: "text-white", size: 32, strokeWidth: 2 })}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-snug">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed flex-grow mb-6">
                                    {service.description}
                                </p>
                                <button
                                    onClick={() => handleLearnMoreClick(service.id)}
                                    className="mt-auto inline-flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400
                                               hover:text-blue-800 dark:hover:text-blue-300 group transition-colors duration-200"
                                >
                                    Learn More
                                    <ArrowRight size={16} className="ml-1.5 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                                </button>
                            </div>
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BotsSection;