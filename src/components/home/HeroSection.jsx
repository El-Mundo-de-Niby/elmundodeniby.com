import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const subtitles = [
        "We build custom Discord bots for your server.",
        "High-end automation with thoughtful design.",
        "We code, host, and maintain your bots.",
        "Full control. No third-party limits.",
        "Clean code. Private hosting. Premium service.",
        "The professional way to build Discord bots.",
        "Tailored development — no shortcuts, no fluff.",
        "Performance, stability, and real support.",
        "Upgrade your server with real engineering.",
    ];

    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
    const [bgImageUrl, setBgImageUrl] = useState('');
    const [parallaxOffset, setParallaxOffset] = useState(0);

    const titleRef = useRef(null);
    const actionsRef = useRef(null);
    const heroRef = useRef(null);
    const bgRef = useRef(null);

    const updateBgImage = () => {
        setBgImageUrl(`https://i.imgur.com/9Bk43XP.png`);
    };

    useEffect(() => {
        const animateInitialElements = () => {
            if (titleRef.current) {
                titleRef.current.classList.remove('opacity-0', 'translate-y-4');
                titleRef.current.classList.add('opacity-100', 'translate-y-0');
            }
            if (actionsRef.current) {
                actionsRef.current.classList.remove('opacity-0', 'translate-y-4');
                actionsRef.current.classList.add('opacity-100', 'translate-y-0');
            }
        };

        const initialElementsTimer = setTimeout(animateInitialElements, 100);
        updateBgImage();

        const rotationInterval = setInterval(() => {
            setCurrentSubtitleIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
        }, 4000);

        return () => {
            clearTimeout(initialElementsTimer);
            clearInterval(rotationInterval);
        };
    }, [subtitles.length]);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let scrollTimeout;

        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const currentScrollY = window.scrollY;
                const heroSection = heroRef.current;

                if (heroSection) {
                    const rect = heroSection.getBoundingClientRect();
                    const isHeroInView = rect.top < window.innerHeight && rect.bottom > 0;

                }

                lastScrollY = currentScrollY;
            }, 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    useEffect(() => {
        const handleParallax = () => {
            const scrollY = window.scrollY;
            const offset = scrollY * 0.2;
            setParallaxOffset(offset);
        };

        const onScroll = () => requestAnimationFrame(handleParallax);

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const subtitleVariants = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -15 },
    };

    const navigate = useNavigate()

    return (
        <section
            ref={heroRef}
            className="
                relative min-h-screen flex items-center justify-center py-16 p-6 sm:p-10
                font-sans overflow-hidden text-center
                bg-gradient-to-br from-white via-gray-50 to-white
                dark:from-gray-900 dark:via-black dark:to-gray-900
            "
        >
            {bgImageUrl && (
                <div
                    key={bgImageUrl}
                    ref={bgRef}
                    className="
                        absolute inset-0 z-0 bg-cover bg-center
                        transition-opacity duration-1000 ease-in-out
                    "
                    style={{
                        backgroundImage: `url('${bgImageUrl}')`,
                        opacity: 0.15,
                        transform: `translateY(${parallaxOffset}px)`,
                        willChange: 'transform',
                    }}
                />
                
            )}
            <div className="absolute top-0 left-0 w-full h-48 z-10 pointer-events-none bg-gradient-to-b from-white/90 via-white/25 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent" />
            <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
                <h1
                    ref={titleRef}
                    className="
                        text-5xl sm:text-6xl md:text-7xl lg:text-[5.5em] xl:text-[6em] font-extrabold tracking-tight leading-[1.05] mb-6 sm:mb-8
                        opacity-0 transform translate-y-4
                        transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200
                        text-gray-900 dark:text-gray-100
                    "
                >
                    Change the way you Discord
                </h1>

                <div className="min-h-[60px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentSubtitleIndex}
                            variants={subtitleVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{
                                duration: 0.6,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="
                                text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed mb-10 sm:mb-12
                                max-w-2xl
                                text-gray-700 dark:text-gray-300
                            "
                        >
                            {subtitles[currentSubtitleIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div
                    ref={actionsRef}
                    className="
                        flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6
                        mt-8
                        opacity-0 transform translate-y-4
                        transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-600
                    "
                >
                    <button 
                    className="
                        bg-gray-900 text-white px-5 py-3 font-semibold hover:bg-gray-700
                        px-8 py-3.5 rounded-full text-lg sm:text-xl font-semibold whitespace-nowrap cursor-pointer
                        transition-all duration-300 ease-in-out
                        bg-apple-blue text-white 
                        shadow-lg 
                    "
                    onClick={() => navigate('create-bot')}

>
                        Start a Bot
                    </button>

                    <button className="
                        px-8 py-3.5 rounded-full text-lg sm:text-xl font-semibold whitespace-nowrap cursor-pointer
                        transition-colors duration-300 ease-in-out
                        bg-gray-200 text-gray-900 shadow-lg
                        hover:bg-gray-300
                        dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500
                    " onClick={() => navigate('shop')}>
                        Shop
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
