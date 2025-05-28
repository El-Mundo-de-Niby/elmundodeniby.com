import React from 'react';
import FadeInOnScroll from '../common/FadeInOnScroll';
import ScrollAnimatedImage from '../common/ScrollAnimatedImage';

const ProjectPreview = () => {
    return (
        <section className="min-h-screen flex items-center justify-center py-16 bg-gray-50 dark:bg-gray-900 py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl text-center">
                <FadeInOnScroll>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-16 leading-tight tracking-tight">
                        Your idea - Achieved with our knowledge
                    </h2>
                </FadeInOnScroll>
                <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
                    <ScrollAnimatedImage
                        src="/public/images/1.png"
                        alt="Placeholder de Proyecto Animado"
                        className="rounded-2xl shadow-2xl object-cover w-full h-full"
                    />
                </div>
                <FadeInOnScroll delay={200}>
                    <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mt-12 leading-relaxed max-w-3xl mx-auto">
                        Each detail, each interaction, designed for digital excelency. We not only create services that look good, but that also work great.
                    </p>
                </FadeInOnScroll>
            </div>
        </section>
    );
};

export default ProjectPreview;