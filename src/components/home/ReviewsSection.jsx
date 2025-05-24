import React from 'react';
import FadeInOnScroll from '../common/FadeInOnScroll';
import { Star } from 'lucide-react';

const ReviewsSection = () => {
    const reviews = [
        {
            id: 1,
            text: "El Mundo de Niby transformed our online presence. Their attention to detail and focus on design are unparalleled.",
            author: "Ana García",
            title: "CEO of InnovaTech",
            rating: 5,
            avatar: "https://picsum.photos/60/60?random=1"
        },
        {
            id: 2,
            text: "Professionalism and creativity at every step. Working with Niby has been a fantastic experience, and the results are exceptional.",
            author: "Carlos Ruiz",
            title: "Marketing Director at Global Solutions",
            rating: 5,
            avatar: "https://picsum.photos/60/60?random=1"
        },
        {
            id: 3,
            text: "Absolutely impressed with Niby's work. They exceeded our expectations and delivered an impeccable final product.",
            author: "Sofía Pérez",
            title: "Founder of Digital Art",
            rating: 4,
            avatar: "https://picsum.photos/60/60?random=1"
        },
        {
            id: 4,
            text: "An incredibly talented and responsive team. Communication was excellent, and the project was delivered on time and within budget.",
            author: "Javier López",
            title: "CTO of NexoTech",
            rating: 5,
            avatar: "https://picsum.photos/60/60?random=1"
        },
        {
            id: 5,
            text: "I highly recommend El Mundo de Niby. Their expertise in digital strategy helped us achieve our growth objectives.",
            author: "Elena Martínez",
            title: "Project Manager at Global Solutions",
            rating: 4,
            avatar: "https://picsum.photos/60/60?random=1"
        },
        {
            id: 6,
            text: "From initial design to launch, the entire process was smooth and professional. We are very happy with the result.",
            author: "Pablo Sánchez",
            title: "Creative Director at Visionary Studios",
            rating: 5,
            avatar: "https://picsum.photos/60/60?random=1"
        },
        {
            id: 7,
            text: "Customer service is fantastic. They are always willing to help and solve any questions or problems.",
            author: "Laura Gómez",
            title: "Online Store Owner",
            rating: 4,
            avatar: "https://picsum.photos/60/60?random=1"
        },
        {
            id: 8,
            text: "Thanks to Niby, our brand now has a much stronger and more attractive online presence. Excellent work!",
            author: "Diego Fernández",
            title: "Entrepreneur",
            rating: 5,
            avatar: "https://picsum.photos/60/60?random=1"
        },
    ];

    // Duplicar las reseñas para el efecto de auto-scroll infinito
    // Renderizaremos el array base reviews 3 veces para asegurar un loop más largo y suave
    const infiniteReviews = [...reviews, ...reviews, ...reviews];

    return (
        <section id="clientes-section" className="min-h-screen flex items-center justify-center py-16 py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 max-w-7xl">
                <FadeInOnScroll>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-16 leading-tight tracking-tight">
                        What they say about us
                    </h2>
                </FadeInOnScroll>

                {/* Estilos para la animación de auto-scroll */}
                <style>
                    {`
          @keyframes scroll-reviews {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }

          .reviews-scroll-wrapper {
            overflow: hidden;
            position: relative;
            padding-bottom: 2rem;
          }

          .reviews-container {
            display: flex;
            width: max-content;
            animation: scroll-reviews 120s linear infinite;
          }

          .reviews-container:hover {
            animation-play-state: paused;
          }

          .review-card {
            flex: 0 0 auto;
            width: 380px;
            margin-right: 2rem;
            scroll-snap-align: start;
            white-space: normal;
          }

          @media (min-width: 640px) {
            .review-card {
              width: 420px;
            }
          }

          @media (min-width: 768px) {
            .review-card {
              width: 450px;
            }
          }

          @media (min-width: 1024px) {
            .review-card {
              width: 480px;
            }
          }
          `}
                </style>

                <div className="reviews-scroll-wrapper">
                    <div className="reviews-container">
                        {infiniteReviews.map((review, index) => (
                            <FadeInOnScroll key={`${review.id}-${index}`} delay={index * 50} className="review-card">
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center mb-6">
                                        <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-200 dark:border-gray-600" />
                                        <div className="flex">
                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                <Star key={i} className="text-yellow-500 fill-current" size={24} />
                                            ))}
                                            {Array.from({ length: 5 - review.rating }).map((_, i) => (
                                                <Star key={i + review.rating} className="text-gray-300 dark:text-gray-600" size={24} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 italic mb-6 leading-relaxed flex-grow">
                                        "{review.text}"
                                    </p>
                                    <div>
                                        <p className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">- {review.author}</p>
                                        <p className="text-base text-gray-600 dark:text-gray-400">{review.title}</p>
                                    </div>
                                </div>
                            </FadeInOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;