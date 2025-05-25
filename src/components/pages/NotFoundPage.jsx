// File: src/components/pages/NotFoundPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';
import FadeInOnScroll from '../common/FadeInOnScroll'; // Import FadeInOnScroll

const NotFoundPage = () => {
    // Autoscroll to the top of the page on mount

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-4">
            <div className="text-center max-w-2xl mx-auto space-y-8 animate-fade-in-up"> {/* Added max-w-2xl and space-y-8 */}
                <FadeInOnScroll delay={0}>
                    <Frown size={96} className="mx-auto text-gray-700 dark:text-gray-300 transform transition-transform duration-500 hover:scale-105" /> {/* Larger icon, hover effect */}
                </FadeInOnScroll>

                <FadeInOnScroll delay={100}>
                    <h1 className="text-7xl md:text-9xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight transition-opacity duration-700"> {/* Larger font, tighter tracking */}
                        404
                    </h1>
                </FadeInOnScroll>

                <FadeInOnScroll delay={200}>
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 dark:text-gray-200 leading-tight transition-transform duration-700"> {/* Larger font, leading-tight */}
                        Page Not Found
                    </h2>
                </FadeInOnScroll>

                <FadeInOnScroll delay={300}>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto transition-opacity duration-700"> {/* Increased text size, leading-relaxed */}
                        Oops! The page you're looking for doesn't exist.
                        It might have been moved or you might have typed the address incorrectly.
                    </p>
                </FadeInOnScroll>

                <FadeInOnScroll delay={400} duration={800}> {/* Ensure duration is set for FadeInOnScroll */}
                    <Link
                        to="/"
                        // Removed opacity-0, translate-y-8, and animate-fade-in-up-delay-400
                        // as FadeInOnScroll already handles initial state and animation.
                        className="inline-flex items-center justify-center bg-gray-900 text-white dark:bg-blue-600 dark:text-white
              px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-700 dark:hover:bg-blue-700
              transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1
              focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-blue-500"
                    >
                        Go Back Home
                    </Link>
                </FadeInOnScroll>
            </div>
        </section>
    );
};

export default NotFoundPage;