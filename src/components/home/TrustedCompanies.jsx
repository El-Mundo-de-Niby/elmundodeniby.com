import React from 'react';
import FadeInOnScroll from '../common/FadeInOnScroll';

const TrustedCompanies = () => {
    const trustedCompanies = [
        'https://picsum.photos/150/50?random=1',
        'https://picsum.photos/150/50?random=1',
        'https://picsum.photos/150/50?random=1',
        'https://picsum.photos/150/50?random=1',
        'https://picsum.photos/150/50?random=1',
        'https://picsum.photos/150/50?random=1',
    ];
    // Duplicar las empresas para el bucle infinito del carrusel
    const duplicatedCompanies = [...trustedCompanies, ...trustedCompanies];

    return (
        <section id="trusted-companies-section" className="bg-white dark:bg-gray-950 py-12 md:py-20 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <FadeInOnScroll>
                    <h3 className="text-xl md:text-3xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-10 tracking-wide">
                        Trusted by
                    </h3>
                </FadeInOnScroll>
                <style>
                    {`
          @keyframes scroll-logos {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .logos-container-wrapper {
            overflow: hidden;
          }
          .logos-container {
            display: flex;
            width: max-content;
            animation: scroll-logos 90s linear infinite;
          }
          .logos-container:hover {
            animation-play-state: paused;
          }
          .logo-item {
            flex: 0 0 auto;
            width: 180px;
            height: 60px;
            margin: 0 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-item img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            filter: grayscale(100%) brightness(180%);
            opacity: 0.6;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, filter 0.3s ease-in-out;
          }
          .logo-item img:hover {
            opacity: 1;
            filter: grayscale(0%) brightness(100%);
            transform: scale(1.05);
          }
          `}
                </style>
                <div className="logos-container-wrapper">
                    <div className="logos-container">
                        {duplicatedCompanies.map((logo, index) => (
                            <div key={index} className="logo-item">
                                <img src={logo} alt={`Company Logo ${index}`} />
                            </div>
                        ))}
                        {duplicatedCompanies.map((logo, index) => (
                            <div key={`dup-${index}`} className="logo-item">
                                <img src={logo} alt={`Company Logo ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedCompanies;