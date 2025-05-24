import React from 'react';
import FadeInOnScroll from '../common/FadeInOnScroll'; // Asegúrate de que la ruta sea correcta
import { Bot, Users, Server, Cpu } from 'lucide-react';

const BotsSection = () => {
    return (
        <section id="especialidades-section" className="min-h-screen flex items-center justify-center py-16 py-20 md:py-32 bg-white dark:bg-gray-950 text-center">
            <div className="container mx-auto px-6 max-w-7xl">
                <FadeInOnScroll>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 leading-tight tracking-tight">
                        Our Services
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                        <em>This is just a quick summary.</em>
                    </p>
                </FadeInOnScroll>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Bot, title: "Custom Discord Bots", description: "We develop unique bots, perfectly tailored to your server's specific needs, from utilities to games." },
                        { icon: Users, title: "Community Automation", description: "Optimize your community management with automated workflows, user welcomes, moderation, and much more." },
                        { icon: Server, title: "Advanced Server Management", description: "Powerful tools for moderation, dynamic role assignment, and efficient member and channel administration." },
                        { icon: Cpu, title: "AI and API Integration", description: "Intelligent bots with artificial intelligence capabilities and seamless integration with external services and databases." }
                    ].map((item, index) => (
                        <FadeInOnScroll key={index} delay={index * 100}>
                            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col items-center justify-start text-left border border-gray-100 dark:border-gray-800">
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-full mb-6 shadow-md border border-gray-100 dark:border-gray-700">
                                    {React.createElement(item.icon, { className: "text-gray-700 dark:text-gray-300", size: 48 })}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-snug text-center">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed text-center flex-grow mb-6">
                                    {item.description}
                                </p>
                                <button className="text-base font-semibold text-gray-700 dark:text-gray-300 hover:underline transition-colors mt-auto">Check more</button>
                            </div>
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BotsSection;