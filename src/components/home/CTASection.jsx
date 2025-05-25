import React from 'react';
import FadeInOnScroll from '../common/FadeInOnScroll';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTACSection = ({}) => {

    // useNavigate hook para la navegación programática
    const navigate = useNavigate();

    return (
        <section id="cta-section" className="min-h-screen flex items-center justify-center py-16  bg-gradient-to-br from-gray-900 to-black dark:from-black dark:to-gray-950 py-20 md:py-32 text-center">
            <div className="container mx-auto px-6 max-w-5xl">
                <FadeInOnScroll>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-10 leading-tight tracking-tight">
                        Join El Mundo de Niby
                    </h2>
                </FadeInOnScroll>
                <FadeInOnScroll delay={100}>
                    <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Transform your community with our intelligent bots and innovative digital solutions. Your vision, our technology.
                    </p>
                </FadeInOnScroll>
                <FadeInOnScroll delay={200}>
                    <a onClick={() => navigate('contact')} className="inline-flex items-center bg-white text-gray-900 px-10 py-5 rounded-full text-xl font-semibold
                                   hover:bg-gray-200
                                   transition transform duration-300 ease-out hover:scale-105 /* Changed order for clarity */
                                   shadow-xl cursor-pointer">
                        Discord <ChevronRight className="ml-3" size={24} />
                    </a>
                </FadeInOnScroll>
            </div>
        </section>
    );
};

export default CTACSection;