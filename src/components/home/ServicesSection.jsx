import React from 'react';
import FadeInOnScroll from '../common/FadeInOnScroll';
import ScrollAnimatedImage from '../common/ScrollAnimatedImage';

const ServicesSection = () => {
    return (
        <section id="servicios-section" className="min-h-screen flex items-center justify-center py-16 py-20 md:py-32 bg-white dark:bg-gray-950 text-center">
            <div className="container mx-auto px-6 max-w-7xl">
                <FadeInOnScroll>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-16 leading-tight tracking-tight">
                        What we do
                    </h2>
                </FadeInOnScroll>

                {/* Servicio 1 - Digital Strategy */}
                <FadeInOnScroll className="mb-20 md:mb-32">
                    <div className="flex flex-col md:flex-row items-center md:space-x-12">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            {/* Using Picsum Photos with a seed for consistency */}
                            <ScrollAnimatedImage
                                src="https://www.smartinsights.com/wp-content/uploads/2023/02/What-is-digital-strategy.png"
                                alt="Digital Strategy"
                                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                            />
                        </div>
                        <div className="md:w-1/2 text-left">
                            <FadeInOnScroll delay={100}>
                                <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight tracking-tight">
                                    Custom Digital Strategy
                                </h3>
                            </FadeInOnScroll>
                            <FadeInOnScroll delay={200}>
                                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                    We design personalized digital roadmaps that align your business objectives with innovative and scalable solutions. We analyze the market, your audience, and your goals to chart the most effective path to online success.
                                </p>
                            </FadeInOnScroll>
                        </div>
                    </div>
                </FadeInOnScroll>

                {/* Servicio 2 - Web Design and Development */}
                <FadeInOnScroll className="mb-20 md:mb-32">
                    <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-12">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            {/* Using Picsum Photos with a different seed */}
                            <ScrollAnimatedImage
                                src="https://careertraining.nsu.edu/common/images/1/16890/learn-web-design.jpg"
                                alt="Web Design and Development"
                                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                            />
                        </div>
                        <div className="md:w-1/2 text-left">
                            <FadeInOnScroll delay={100}>
                                <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight tracking-tight">
                                    Cutting-Edge Web Design and Development
                                </h3>
                            </FadeInOnScroll>
                            <FadeInOnScroll delay={200}>
                                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                    We create intuitive and visually stunning web experiences. From concept to launch, we build robust, secure, and optimized platforms for any device, ensuring an unforgettable online presence.
                                </p>
                            </FadeInOnScroll>
                        </div>
                    </div>
                </FadeInOnScroll>

                {/* Servicio 3 - Digital Marketing */}
                <FadeInOnScroll>
                    <div className="flex flex-col md:flex-row items-center md:space-x-12">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            {/* Using Picsum Photos with another seed */}
                            <ScrollAnimatedImage
                                src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/blog/posts/digital-marketing-skills.jpg&w=1200&h=630"
                                alt="Digital Marketing"
                                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                            />
                        </div>
                        <div className="md:w-1/2 text-left">
                            <FadeInOnScroll delay={100}>
                                <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight tracking-tight">
                                    Digital Marketing with Real Results
                                </h3>
                            </FadeInOnScroll>
                            <FadeInOnScroll delay={200}>
                                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                    We increase your visibility and attract your target audience with intelligent digital marketing strategies. From SEO to PPC campaigns and social media, we maximize your return on investment with a measurable approach.
                                </p>
                            </FadeInOnScroll>
                        </div>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
};

export default ServicesSection;