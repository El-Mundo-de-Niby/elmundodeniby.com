import React from 'react';
import FadeInOnScroll from '../common/FadeInOnScroll'; // Asegúrate de que la ruta sea correcta
import AnimatedCounter from '../common/AnimatedCounter'; // Asegúrate de que la ruta sea correcta
import { Users, Bot, Star, Server } from 'lucide-react';

const CommunityStats = () => {
    return (
        <section className="min-h-screen flex items-center justify-center py-16 py-20 md:py-32 bg-gray-100 dark:bg-gray-900 text-center">
            <div className="container mx-auto px-6 max-w-7xl">
                <FadeInOnScroll>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-12 leading-tight tracking-tight">
                        Our Community - In numbers
                    </h2>
                </FadeInOnScroll>
                <FadeInOnScroll delay={100}>
                    <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto">
                        Results that speak by themselves. We are proud of what we've built with our clients and members.
                    </p>
                </FadeInOnScroll>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FadeInOnScroll delay={200}>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center h-full border border-gray-100 dark:border-gray-700">
                            <Users className="mb-6 text-gray-700 dark:text-gray-300" size={56} />
                            <p className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                <AnimatedCounter end={2000} />+
                            </p>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2 font-medium">Discord Members</p>
                        </div>
                    </FadeInOnScroll>
                    <FadeInOnScroll delay={300}>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center h-full border border-gray-100 dark:border-gray-700">
                            <Bot className="mb-6 text-gray-700 dark:text-gray-300" size={56} />
                            <p className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                <AnimatedCounter end={50} />+
                            </p>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2 font-medium">Developed Bots</p>
                        </div>
                    </FadeInOnScroll>
                    <FadeInOnScroll delay={400}>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center h-full border border-gray-100 dark:border-gray-700">
                            <Star className="mb-6 text-yellow-500 fill-current" size={56} />
                            <p className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                <AnimatedCounter end={98} />%
                            </p>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2 font-medium">Service Rating</p>
                        </div>
                    </FadeInOnScroll>
                    <FadeInOnScroll delay={500}>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center h-full border border-gray-100 dark:border-gray-700">
                            <Server className="mb-6 text-gray-700 dark:text-gray-300" size={56} />
                            <p className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                <AnimatedCounter end={200} />+
                            </p>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2 font-medium">Improved Communities</p>
                        </div>
                    </FadeInOnScroll>
                </div>
            </div>
        </section>
    );
};

export default CommunityStats;