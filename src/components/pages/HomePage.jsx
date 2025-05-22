// Archivo: components/pages/HomePage.jsx
import FadeInOnScroll from '../common/FadeInOnScroll';
import ScrollAnimatedImage from '../common/ScrollAnimatedImage';
import AnimatedCounter from '../common/AnimatedCounter';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, ChevronRight, Lightbulb, Layout, Users, Award, MessageCircle, Mail,
  Home, Briefcase, Info, Sun, Moon, Sparkles, TrendingUp, Zap, Clock, Star, Heart,
  Settings, Bot, Globe, BarChart2, CheckCircle, UserPlus, Shield, Code, Server, Cpu,
  BookOpen, Compass, Target, LineChart, Facebook, Twitter, Instagram, Linkedin, ZapOff,
  Calendar, MessageSquare, Send
} from 'lucide-react';

const HomePage = ({ heroScrollY, navigateTo }) => { // Added navigateTo prop
  const reviews = [
    {
      id: 1,
      text: "El Mundo de Niby transformó nuestra presencia online. Su atención al detalle y su enfoque en el diseño son inigualables.",
      author: "Ana García",
      title: "CEO de InnovaTech",
      rating: 5,
      avatar: "https://placehold.co/60x60/a0a0a0/ffffff?text=AG"
    },
    {
      id: 2,
      text: "Profesionalismo y creatividad en cada paso. Trabajar con Niby ha sido una experiencia fantástica y los resultados son excepcionales.",
      author: "Carlos Ruiz",
      title: "Director de Marketing en Soluciones Globales",
      rating: 5,
      avatar: "https://placehold.co/60x60/a0a0a0/ffffff?text=CR"
    },
    {
      id: 3,
      text: "Absolutamente impresionados con el trabajo de Niby. Superaron nuestras expectativas y entregaron un producto final impecable.",
      author: "Sofía Pérez",
      title: "Fundadora de Arte Digital",
      rating: 4,
      avatar: "https://placehold.co/60x60/a0a0a0/ffffff?text=SP"
    },
    {
      id: 4,
      text: "Un equipo increíblemente talentoso y receptivo. La comunicación fue excelente y el proyecto se entregó a tiempo y dentro del presupuesto.",
      author: "Javier López",
      title: "CTO de NexoTech",
      rating: 5,
      avatar: "https://placehold.co/60x60/a0a0a0/ffffff?text=JL"
    },
    {
      id: 5,
      text: "Recomiendo encarecidamente El Mundo de Niby. Su experiencia en estrategia digital nos ayudó a alcanzar nuestros objetivos de crecimiento.",
      author: "Elena Martínez",
      title: "Gerente de Proyectos en Global Solutions",
      rating: 4,
      avatar: "https://placehold.co/60x60/a0a0a0/ffffff?text=EM"
    },
    {
      id: 6,
      text: "Desde el diseño inicial hasta el lanzamiento, todo el proceso fue fluido y profesional. Estamos muy contentos con el resultado.",
      author: "Pablo Sánchez",
      title: "Director Creativo en Visionary Studios",
      rating: 5,
      avatar: "https://placehold.co/60x60/a0a0a0/ffffff?text=PS"
    },
    {
      id: 7,
      text: "La atención al cliente es fantástica. Siempre están dispuestos a ayudar y resolver cualquier duda o problema.",
      author: "Laura Gómez",
      title: "Propietaria de Tienda Online",
      rating: 4,
      avatar: "https://placehold.co/60x60/a0a0a0/ffffff?text=LG"
    },
    {
      id: 8,
      text: "Gracias a Niby, nuestra marca tiene ahora una presencia online mucho más fuerte y atractiva. ¡Un trabajo excelente!",
      author: "Diego Fernández",
      title: "Emprendedor",
      rating: 5,
      avatar: "https://placehold.co/60x60/a0a0a0/ffffff?text=DF"
    },
  ];

  // Duplicar las reseñas para el efecto de auto-scroll infinito
  const duplicatedReviews = [...reviews, ...reviews];

  const trustedCompanies = [
    'https://placehold.co/150x50/e0e0e0/333333?text=Compañía+A',
    'https://placehold.co/150x50/e0e0e0/333333?text=Compañía+B',
    'https://placehold.co/150x50/e0e0e0/333333?text=Compañía+C',
    'https://placehold.co/150x50/e0e0e0/333333?text=Compañía+D',
    'https://placehold.co/150x50/e0e0e0/333333?text=Compañía+E',
    'https://placehold.co/150x50/e0e0e0/333333?text=Compañía+F',
  ];
  // Duplicar las empresas para el bucle infinito del carrusel
  const duplicatedCompanies = [...trustedCompanies, ...trustedCompanies];


  return (
    <>
      {/* Sección Hero con Parallax de Fondo y Texto - Estilo Apple */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black dark:from-black dark:to-gray-900 text-white py-20 md:py-32 text-center overflow-hidden flex items-center justify-center min-h-[80vh] md:min-h-[90vh]">
        {/* Imagen de fondo con baja opacidad y parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(https://placehold.co/1920x1080/000000/FFFFFF/png?text=Fondo+Sutil)`,
            transform: `translateY(${heroScrollY * 0.1}px)`, // Parallax para la imagen de fondo
          }}
        ></div>
        {/* Fondo sutilmente animado (simulando un un color profundo) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-black"
          style={{ transform: `translateY(${heroScrollY * 0.15}px)` }}
        ></div>
        <div className="relative container mx-auto px-4 max-w-5xl z-10">
          {/* Logo de Niby */}
          <FadeInOnScroll delay={0}>
            <img src="https://placehold.co/100x100/ffffff/000000?text=Niby" alt="Logo de Niby" className="mx-auto mb-8 rounded-full" />
          </FadeInOnScroll>

          {/* Contenedor para el texto con parallax y opacidad */}
          <div
            className="text-center"
            style={{ opacity: Math.max(0, 1 - heroScrollY / 500) }} // Opacidad del texto disminuye al scroll
          >
            <FadeInOnScroll delay={100}>
              <h1
                className="text-4xl md:text-7xl font-extrabold leading-none mb-3 text-white"
                style={{ transform: `translateY(${heroScrollY * 0.03}px)` }}
              >
                Donde la inteligencia digital cobra vida
              </h1>
            </FadeInOnScroll>
            <FadeInOnScroll delay={200}>
              <p
                className="text-2xl md:text-4xl font-semibold leading-tight mb-4 text-gray-300"
                style={{ transform: `translateY(${heroScrollY * 0.07}px)` }}
              >
                Transformamos ideas en experiencias que cautivan.
              </p>
            </FadeInOnScroll>
          </div>
          <FadeInOnScroll delay={300}>
            <a href="#especialidades-section" className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors shadow-lg hover:scale-105 transform">
              Descubre los bots <ChevronRight className="ml-2" size={20} />
            </a>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Sección "Trusted Companies" */}
      <section id="trusted-companies-section" className="bg-white dark:bg-gray-900 py-8 md:py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h3 className="text-xl md:text-2xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-8">
              Confían en Nosotros
            </h3>
          </FadeInOnScroll>
          <style>
            {`
            @keyframes scroll-logos {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); } /* Scrolls the full width of the original content */
            }
            .logos-container-wrapper {
              overflow: hidden;
            }
            .logos-container {
              display: flex;
              width: max-content; /* Ensure container takes full width of all logos */
              animation: scroll-logos 90s linear infinite; /* Duración ajustada para ser más lenta y suave */
            }
            .logos-container:hover {
              animation-play-state: paused;
            }
            .logo-item {
              flex: 0 0 auto;
              width: 150px; /* Fixed width for each logo */
              height: 50px;
              margin: 0 1.5rem; /* Spacing between logos */
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .logo-item img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              filter: grayscale(100%) brightness(150%); /* Subtle grayscale for logos */
              opacity: 0.7;
              transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            }
            .logo-item img:hover {
              opacity: 1;
              filter: grayscale(0%) brightness(100%);
              transform: scale(1.1);
            }
            `}
          </style>
          <div className="logos-container-wrapper">
            <div className="logos-container">
              {/* Render duplicated companies twice for seamless loop */}
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

      {/* Sección de Imagen con Animación al Scroll (Kodalogic-like) */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FadeInOnScroll>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-12 leading-tight">
              Visualiza el Futuro
            </h2>
          </FadeInOnScroll>
          <div className="relative h-96 md:h-[500px] flex items-center justify-center">
            <ScrollAnimatedImage
              src="https://placehold.co/1000x600/cccccc/333333?text=Tu+Proyecto+Aquí"
              alt="Placeholder de Proyecto Animado"
              className="rounded-xl shadow-2xl object-cover w-full h-full"
            />
          </div>
          <FadeInOnScroll delay={200}>
            <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 mt-8 leading-relaxed">
              Cada detalle, cada interacción, diseñado para la excelencia.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Sección "Nuestros Bots" (anteriormente Especialidades) */}
      <section id="especialidades-section" className="py-16 md:py-24 bg-white dark:bg-gray-900 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInOnScroll>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-12 leading-tight">
              Nuestros Bots
            </h2>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeInOnScroll delay={0}>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col items-center justify-center"> {/* Scale y sombra ajustados */}
                <Bot className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Bots de Discord a Medida</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  Desarrollamos bots únicos, perfectamente adaptados a las necesidades específicas de tu servidor.
                </p>
                <button className="text-sm text-gray-700 dark:text-gray-300 hover:underline transition-colors">Ver más</button>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={100}>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col items-center justify-center"> {/* Scale y sombra ajustados */}
                <Users className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Automatización Comunitaria</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  Optimiza la gestión de tu comunidad con flujos de trabajo automatizados y eficientes.
                </p>
                <button className="text-sm text-gray-700 dark:text-gray-300 hover:underline transition-colors">Ver más</button>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={200}>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col items-center justify-center"> {/* Scale y sombra ajustados */}
                <Server className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Gestión Avanzada de Servidores</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  Herramientas potentes para moderación, asignación de roles y administración de miembros.
                </p>
                <button className="text-sm text-gray-700 dark:text-gray-300 hover:underline transition-colors">Ver más</button>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={300}>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col items-center justify-center"> {/* Scale y sombra ajustados */}
                <Cpu className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Integración de IA y APIs</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  Bots inteligentes con capacidades de IA e integración con servicios externos.
                </p>
                <button className="text-sm text-gray-700 dark:text-gray-300 hover:underline transition-colors">Ver más</button>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Sección de Contadores */}
      <section className="py-16 md:py-24 bg-gray-200 dark:bg-gray-800 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInOnScroll>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-12 leading-tight">
              Nuestra Comunidad en Números
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
            <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
              Resultados que hablan por sí mismos. Estamos orgullosos de lo que hemos construido junto a nuestros clientes.
            </p>
          </FadeInOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeInOnScroll delay={200}>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-full">
                <Users className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
                <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  <AnimatedCounter end={1200} />+
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-md mt-2">Miembros en Discord</p>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={300}>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-full">
                <Bot className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
                <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  <AnimatedCounter end={50} />+
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-md mt-2">Bots Únicos Creados</p>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={400}>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-full">
                {/* Estrellas ahora en gris */}
                <Star className="mb-4 text-gray-700 dark:text-gray-100 fill-current" size={40} />
                <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  <AnimatedCounter end={98} />%
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-md mt-2">Recomendaciones Positivas</p>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll delay={500}>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-full">
                <Server className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
                <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  <AnimatedCounter end={30} />+
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-md mt-2">Servidores Potenciados</p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>


      {/* Sección de Servicios - Estilo Apple (grandes bloques de características) */}
      <section id="servicios-section" className="py-16 md:py-24 bg-white dark:bg-gray-900 text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeInOnScroll>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-12 leading-tight">
              Nuestros Servicios
            </h2>
          </FadeInOnScroll>

          {/* Servicio 1 */}
          <FadeInOnScroll className="mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <ScrollAnimatedImage src="https://placehold.co/800x500/e0e0e0/333333?text=Estrategia+Digital" alt="Estrategia Digital" className="rounded-xl shadow-xl w-full h-auto object-cover" />
              </div>
              <div className="md:w-1/2 text-left">
                <FadeInOnScroll delay={100}>
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                    Estrategia Digital a Medida
                  </h3>
                </FadeInOnScroll>
                <FadeInOnScroll delay={200}>
                  <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Diseñamos hojas de ruta digitales personalizadas que alinean tus objetivos de negocio con soluciones innovadoras y escalables. Analizamos el mercado, tu audiencia y tus metas para trazar el camino más efectivo hacia el éxito online.
                  </p>
                </FadeInOnScroll>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Servicio 2 */}
          <FadeInOnScroll className="mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-8">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <ScrollAnimatedImage src="https://placehold.co/800x500/e0e0e0/333333?text=Dise%C3%B1o+Web" alt="Diseño y Desarrollo Web" className="rounded-xl shadow-xl w-full h-auto object-cover" />
              </div>
              <div className="md:w-1/2 text-left">
                <FadeInOnScroll delay={100}>
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                    Diseño y Desarrollo Web de Vanguardia
                  </h3>
                </FadeInOnScroll>
                <FadeInOnScroll delay={200}>
                  <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Creamos experiencias web intuitivas y visualmente impactantes. Desde el concepto hasta el lanzamiento, construimos plataformas robustas, seguras y optimizadas para cualquier dispositivo, asegurando una presencia online inolvidable.
                  </p>
                </FadeInOnScroll>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Servicio 3 */}
          <FadeInOnScroll>
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <ScrollAnimatedImage src="https://placehold.co/800x500/e0e0e0/333333?text=Marketing+Digital" alt="Marketing Digital" className="rounded-xl shadow-xl w-full h-auto object-cover" />
              </div>
              <div className="md:w-1/2 text-left">
                <FadeInOnScroll delay={100}>
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                    Marketing Digital con Resultados Reales
                  </h3>
                </FadeInOnScroll>
                <FadeInOnScroll delay={200}>
                  <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Aumentamos tu visibilidad y atraemos a tu público objetivo con estrategias de marketing digital inteligentes. Desde SEO hasta campañas de PPC y redes sociales, maximizamos tu retorno de inversión con un enfoque medible.
                  </p>
                </FadeInOnScroll>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Sección de Clientes/Testimonios - Más pequeña y compacta */}
      <section id="clientes-section" className="py-16 md:py-24 bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInOnScroll>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12 leading-tight">
              Lo que Dicen Nuestros Clientes
            </h2>
          </FadeInOnScroll>

          {/* Estilos para la animación de auto-scroll */}
          <style>
            {`
            @keyframes scroll-reviews {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); } /* Scrolls half of the duplicated content */
            }

            .reviews-scroll-wrapper {
              overflow: hidden;
              position: relative;
              padding-bottom: 1rem; /* Space for shadow if needed */
            }

            .reviews-container {
              display: flex;
              width: max-content; /* Ensure container takes full width of all reviews */
              animation: scroll-reviews 180s linear infinite; /* Duración ajustada para ser más lenta y suave */
            }

            .reviews-container:hover {
              animation-play-state: paused;
            }

            .review-card {
              flex: 0 0 auto; /* Prevents cards from shrinking */
              width: 320px; /* Fixed width for each card */
              margin-right: 1.5rem; /* gap-6 in Tailwind is 1.5rem */
              scroll-snap-align: start; /* Optional: for manual snapping */
              white-space: normal; /* Ensure text wraps within the card */
            }

            /* Responsive adjustments for review cards */
            @media (min-width: 640px) { /* sm breakpoint */
              .review-card {
                width: 350px; /* Slightly wider on small screens */
              }
            }

            @media (min-width: 768px) { /* md breakpoint */
              .review-card {
                width: 380px; /* Wider on medium screens */
              }
            }

            @media (min-width: 1024px) { /* lg breakpoint */
              .review-card {
                width: 400px; /* Wider on large screens */
              }
            }
            `}
          </style>

          <div className="reviews-scroll-wrapper">
            <div className="reviews-container">
              {/* Render duplicated reviews twice for seamless loop */}
              {duplicatedReviews.map((review, index) => (
                <FadeInOnScroll key={index} delay={index * 50} className="review-card">
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between">
                    <div className="flex items-center mb-4">
                      <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full mr-3 object-cover" />
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="text-gray-700 dark:text-gray-100 fill-current" size={18} />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <Star key={i + review.rating} className="text-gray-300 dark:text-gray-600" size={18} />
                      ))}
                    </div>
                    <p className="text-md md:text-lg text-gray-800 dark:text-gray-200 italic mb-4 leading-relaxed">
                      "{review.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-md text-gray-900 dark:text-gray-100">- {review.author}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.title}</p>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
              {duplicatedReviews.map((review, index) => (
                <FadeInOnScroll key={`dup-${index}`} delay={index * 50} className="review-card">
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between">
                    <div className="flex items-center mb-4">
                      <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full mr-3 object-cover" />
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="text-gray-700 dark:text-gray-100 fill-current" size={18} />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <Star key={i + review.rating} className="text-gray-300 dark:text-gray-600" size={18} />
                      ))}
                    </div>
                    <p className="text-md md:text-lg text-gray-800 dark:text-gray-200 italic mb-4 leading-relaxed">
                      "{review.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-md text-gray-900 dark:text-gray-100">- {review.author}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.title}</p>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Llamada a la Acción (CTA) */}
      <section id="cta-section" className="bg-gradient-to-br from-gray-900 to-black dark:from-black dark:to-gray-900 py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeInOnScroll>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
              Únete al mundo de Niby
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
            <p className="text-md md:text-lg text-gray-300 mb-10">
              Transforma tu comunidad con nuestros bots inteligentes y soluciones digitales.
            </p>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200}>
            <a onClick={() => navigateTo('contact')} className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors shadow-lg hover:scale-105 transform cursor-pointer">
              Contáctanos <ChevronRight className="ml-2" size={20} />
            </a>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
};

export default HomePage;
