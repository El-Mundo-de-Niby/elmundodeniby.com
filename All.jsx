import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, ChevronRight, Lightbulb, Layout, Users, Award, MessageCircle, Mail,
  Home, Briefcase, Info, Sun, Moon, Sparkles, TrendingUp, Zap, Clock, Star, Heart,
  Settings, Bot, Globe, BarChart2, CheckCircle, UserPlus, Shield, Code, Server, Cpu,
  BookOpen, Compass, Target, LineChart, Facebook, Twitter, Instagram, Linkedin, ZapOff,
  Calendar, MessageSquare, Send
} from 'lucide-react';

// Componente reutilizable para animaciones de aparición al hacer scroll (simulando Framer Motion)
const FadeInOnScroll = ({ children, className = '', delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  return (
    <div
      className={`${className} transition-all duration-1000 ease-out ${ // Duración ajustada a 1000ms (1 segundo)
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

// Componente de Contador Animado
const AnimatedCounter = ({ end, duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 } // Inicia cuando el 50% del contador es visible
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [end, duration, hasStarted]);

  return <span ref={ref} className={className}>{count}</span>;
};

// Componente para imágenes con zoom y opacidad al scroll (Kodalogic-like)
const ScrollAnimatedImage = ({ src, alt, className = '' }) => {
  const imageRef = useRef(null);
  const [imageStyle, setImageStyle] = useState({
    transform: 'scale(0.8) translateY(50px)',
    opacity: 0.5,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress relative to the image section
        const startPoint = viewportHeight * 0.75;
        const endPoint = viewportHeight * 0.25;

        const scrollProgress = Math.max(0, Math.min(1, (startPoint - rect.top) / (startPoint - endPoint)));

        const newScale = 0.8 + (scrollProgress * 0.2);
        const newOpacity = 0.5 + (scrollProgress * 0.5);
        const newTranslateY = (1 - scrollProgress) * 50;

        setImageStyle({
          transform: `scale(${newScale}) translateY(${newTranslateY}px)`,
          opacity: newOpacity,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set correct state on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={`${className} transition-transform transition-opacity duration-1000 ease-out`} // Duración de 1000ms para suavidad
      style={imageStyle}
    />
  );
};

// Componente de la página "Sobre Nosotros"
const AboutUsPage = ({ setPage }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const simulatedContent = `
      <div class="space-y-8 md:space-y-12">
        <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">Nuestra Historia</h2>
        <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          El Mundo de Niby nació de una pasión compartida por la tecnología y el diseño. Fundada en 20XX, nuestra misión siempre ha sido clara: transformar ideas ambiciosas en realidades digitales funcionales y estéticamente impecables. Empezamos como un pequeño equipo de entusiastas y hemos crecido hasta convertirnos en un referente en soluciones digitales, manteniendo siempre nuestra esencia de innovación y cercanía con el cliente.
        </p>
        <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight pt-12">Nuestra Visión</h2>
        <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Visualizamos un futuro donde la tecnología es una herramienta accesible y poderosa para todos. Nos esforzamos por ser líderes en la creación de experiencias digitales que no solo resuelvan problemas, sino que también inspiren y conecten a las personas. Creemos en el poder de la colaboración y en construir relaciones duraderas basadas en la confianza y el éxito mutuo.
        </p>

        <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight pt-12">Nuestro Equipo</h2>
        <div class="flex flex-col md:flex-row items-center md:space-x-8 mt-8">
          <div class="md:w-1/2 mb-6 md:mb-0"> {/* Changed from md:w-1/3 to md:w-1/2 */}
            <img src="https://placehold.co/800x1000/cccccc/333333?text=Diego+Rodríguez" alt="Diego Rodríguez" class="rounded-2xl shadow-xl w-full h-auto object-cover" />
          </div>
          <div class="md:w-1/2 text-left">
            <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">CEO y Fundador</p>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              Diego Rodríguez (dewstouh)
            </h3>
            <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              ¡Hola! Soy Diego Rodríguez, conocido en la comunidad online como "dewstouh". Como
              fundador de El Mundo de Niby, mi viaje comenzó con una profunda fascinación por la
              tecnología y el poder de las comunidades online. Desde 2021, he canalizado esta pasión en
              la creación de bots de Discord que no son solo herramientas, sino verdaderos catalizadores
              de interacción y eficiencia.
            </p>
            <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Mi visión para El Mundo de Niby siempre ha sido trascender los comandos básicos. Busco
              ofrecer soluciones personalizadas que se integren perfectamente en la dinámica única de
              cada servidor, resolviendo problemas reales y desbloqueando nuevas posibilidades para
              administradores y miembros por igual. Cada proyecto es una oportunidad para innovar y
              entregar valor tangible.
            </p>
            <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Con experiencia en Node.js, TypeScript y una variedad de integraciones API, me especializo
              en transformar ideas complejas en bots funcionales, robustos y fáciles de usar. Desde la
              automatización de tareas de moderación hasta la implementación de sistemas de
              engagement con IA, mi objetivo es empoderar a las comunidades para que prosperen.
            </p>
          </div>
        </div>

        <div class="mt-16 md:mt-24 text-center">
          <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 leading-tight">
            Aprende con "Coding with Dew"
          </h2>
          <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Diego también comparte su conocimiento y pasión por el desarrollo de bots en su
            canal de YouTube "Coding with Dew". Encuentra tutoriales, consejos y proyectos
            paso a paso para crear tus propios bots de Discord.
          </p>
          <p class="text-md md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Desde principiantes hasta desarrolladores más experimentados, hay contenido para todos los interesados en el mundo de la automatización de Discord.
          </p>
          <div class="relative w-full max-w-2xl mx-auto h-64 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg flex items-center justify-center overflow-hidden mb-8">
            <img src="https://placehold.co/1280x720/e0e0e0/333333?text=Video+de+YouTube" alt="Placeholder de Video de YouTube" class="w-full h-full object-cover" />
            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <a href="https://youtube.com/codingwithdew" target="_blank" rel="noopener noreferrer" class="inline-flex items-center bg-gray-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors shadow-lg hover:scale-105 transform">
                Visitar Coding with Dew <ChevronRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div class="mt-16 md:mt-24 text-center">
          <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
            Nuestra Filosofía
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
              <Lightbulb className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Innovación Constante</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Buscamos siempre las soluciones más creativas y tecnológicamente avanzadas para llevar tu comunidad al siguiente nivel.
              </p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
              <Users className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Colaboración Cercana</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Trabajamos mano a mano contigo para entender profundamente tu visión y materializarla con precisión.
              </p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
              <Award className="mb-4 text-gray-700 dark:text-gray-300" size={40} />
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Calidad y Eficiencia</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Entregamos bots robustos, fiables y optimizados para el mejor rendimiento, asegurando una experiencia fluida.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
    setContent(simulatedContent);
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"><p>Cargando contenido...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-red-500"><p>{error}</p></div>;

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInOnScroll>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12 leading-tight">
            Sobre El Mundo de Niby
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </FadeInOnScroll>
        <FadeInOnScroll delay={200}>
          <div className="text-center mt-12">
            <button
              onClick={() => setPage('home')}
              className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-full text-md font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Volver a Inicio <Home className="ml-2" size={18} />
            </button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

// Componente de la página de Contacto
const ContactPage = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'meeting'

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInOnScroll>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12 leading-tight">
            Hablemos de tu Proyecto
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center mb-10 leading-relaxed">
            ¿Tienes una idea para un bot de Discord? ¿Necesitas ayuda con tu comunidad
            online o quieres discutir un proyecto? Estamos aquí para ayudarte.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={200}>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
            {/* Tabs */}
            <div className="flex justify-center mb-8 border-b border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('form')}
                className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 ${activeTab === 'form'
                    ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-700 dark:border-gray-300' // Darker border for active tab
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  } flex items-center`}
              >
                <MessageSquare size={20} className="mr-2" /> Formulario de Contacto
              </button>
              <button
                onClick={() => setActiveTab('meeting')}
                className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 ${activeTab === 'meeting'
                    ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-700 dark:border-gray-300' // Darker border for active tab
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  } flex items-center`}
              >
                <Calendar size={20} className="mr-2" /> Reservar una Reunión
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'form' && (
              <div className="space-y-6">
                <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
                  Rellena el formulario con los detalles de tu proyecto o pregunta. Te responderemos a la brevedad.
                </p>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Tu nombre completo"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Asunto</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Asunto de tu mensaje"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Enviar Mensaje
                </button>
              </div>
            )}

            {activeTab === 'meeting' && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Para reservar una reunión, por favor, contáctanos directamente por email o a través del formulario de contacto y coordinaremos una cita.
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  ¡Esperamos hablar contigo pronto!
                </p>
              </div>
            )}
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={300}>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Únete a Nuestra Comunidad</h3>
            <p className="text-md text-gray-700 dark:text-gray-300 mb-6">
              Conéctate con otros usuarios, haz preguntas y mantente al día con las novedades.
            </p>
            <a
              href="https://discord.gg/elmundodeniby" // Updated Discord link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors shadow-lg hover:scale-105 transform"
            >
              Entrar al Servidor de Discord <ChevronRight className="ml-2" size={20} />
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">¡Te esperamos!</p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={400}>
          <div className="text-center mt-12">
            <button
              onClick={() => setPage('home')}
              className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-full text-md font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Volver a Inicio <Home className="ml-2" size={18} />
            </button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};


// Componente de la página principal (Home)
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
              Our Services
            </h2>
            <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mt-12 leading-relaxed max-w-3xl mx-auto">
              This is just a quick summary.
            </p>
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

// Componente del Chatbot
const Chatbot = ({ navigateTo, setIsChatbotOpen }) => { // navigateTo and setIsChatbotOpen are now props
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide it in runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const aiResponseText = result.candidates[0].content.parts[0].text;
        setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: aiResponseText }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Lo siento, no pude generar una respuesta. Por favor, intenta de nuevo.' }]);
      }
    } catch (error) {
      console.error('Error al comunicarse con la IA:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: 'Hubo un error al conectar con la IA. Por favor, inténtalo más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold text-lg border-b border-gray-200 dark:border-gray-600">
        Soporte de IA
        <p className="text-sm font-normal text-gray-600 dark:text-gray-300 mt-1">Pregunta a nuestra IA o contáctanos</p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            ¡Hola! ¿En qué puedo ayudarte hoy?
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl shadow-sm ${msg.sender === 'user'
                  ? 'bg-gray-900 text-white dark:bg-gray-700'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-xl shadow-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100">
              <span className="animate-pulse">Escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Primary input field and send button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center bg-gray-100 dark:bg-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent mr-2 transition-colors duration-200"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-gray-900 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600"
          disabled={isLoading}
        >
          <Send size={20} />
        </button>
      </div>

      {/* Alternative contact options */}
      <div className="p-4 pt-0 bg-gray-100 dark:bg-gray-700 flex flex-col items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
          ¿No encontraste lo que buscabas con la IA?
        </p>

        <button
          onClick={() => {
            navigateTo('contact');
            setIsChatbotOpen(false); // Close chatbot when navigating to contact page
          }}
          className="w-full inline-flex items-center justify-center bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100 px-4 py-3 rounded-full text-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors shadow-md hover:scale-[1.02] transform mb-2"
        >
          <Mail size={20} className="mr-2" /> Contactar por Email
        </button>

        <a
          href="https://discord.gg/elmundodeniby"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100 px-4 py-3 rounded-full text-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors shadow-md hover:scale-[1.02] transform"
        >
          <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_white_RGB.png" alt="Discord Icon" className="w-5 h-5 mr-2 invert dark:invert-0" />
          Unirse a Discord
        </a>
      </div>
    </div>
  );
};


// Componente principal de la aplicación
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'about', or 'contact'
  const [darkMode, setDarkMode] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot visibility

  // Función para alternar el menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para cambiar de página o hacer scroll a una sección
  const navigateTo = (target) => {
    if (target === 'home' || target === 'about' || target === 'contact') {
      setCurrentPage(target);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    } else {
      // If already on home page, scroll to section
      if (currentPage !== 'home') {
        setCurrentPage('home');
        // Give React a moment to render the HomePage before scrolling
        setTimeout(() => {
          const section = document.getElementById(target);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const section = document.getElementById(target);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
    // Close chatbot if navigating away from home or to a specific section
    if (target !== 'home' && target !== 'contact') { // Keep chatbot open if navigating to contact page
      setIsChatbotOpen(false);
    }
  };

  // Efecto para cerrar el menú móvil si el tamaño de la pantalla cambia a escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint para Tailwind
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efecto para el efecto parallax en la sección Hero
  useEffect(() => {
    const handleScroll = () => {
      setHeroScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para aplicar la clase 'dark' al body/html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  return (
    <div className="font-inter antialiased text-gray-800 bg-white dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
      {/* Encabezado */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" onClick={() => navigateTo('home')} className="text-2xl font-bold text-gray-900 dark:text-gray-100 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            El Mundo de Niby
          </a>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#" onClick={() => navigateTo('home')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Home size={20} className="mr-1" /> Inicio
            </a>
            <a href="#" onClick={() => navigateTo('servicios-section')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Briefcase size={20} className="mr-1" /> Servicios
            </a>
            <a href="#" onClick={() => navigateTo('especialidades-section')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Sparkles size={20} className="mr-1" /> Nuestros Bots
            </a>
            <a href="#" onClick={() => navigateTo('clientes-section')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Users size={20} className="mr-1" /> Clientes
            </a>
            <a href="#" onClick={() => navigateTo('about')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Info size={20} className="mr-1" /> Sobre Nosotros
            </a>
            <a href="#" onClick={() => navigateTo('contact')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Mail size={20} className="mr-1" /> Contacto
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={toggleMenu} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none rounded-md p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 py-4 px-4 transition-colors duration-300">
            <nav className="flex flex-col space-y-2">
              <a href="#" onClick={() => navigateTo('home')} className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Home size={20} className="mr-2" /> Inicio
              </a>
              <a href="#" onClick={() => navigateTo('servicios-section')} className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Briefcase size={20} className="mr-2" /> Servicios
              </a>
              <a href="#" onClick={() => navigateTo('especialidades-section')} className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Sparkles size={20} className="mr-2" /> Nuestros Bots
              </a>
              <a href="#" onClick={() => navigateTo('clientes-section')} className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Users size={20} className="mr-2" /> Clientes
              </a>
              <a href="#" onClick={() => navigateTo('about')} className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Info size={20} className="mr-2" /> Sobre Nosotros
              </a>
              <a href="#" onClick={() => navigateTo('contact')} className="flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 font-medium py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Mail size={20} className="mr-2" /> Contacto
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {currentPage === 'home' && <HomePage heroScrollY={heroScrollY} navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutUsPage setPage={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage setPage={setCurrentPage} />}
      </main>

      {/* Botón flotante de soporte */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Abrir chat de soporte"
        >
          {isChatbotOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* Modal/Overlay del Chatbot */}
      {isChatbotOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[500px] md:w-96 md:h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right scale-100">
          <Chatbot navigateTo={navigateTo} setIsChatbotOpen={setIsChatbotOpen} />
        </div>
      )}

      {/* Pie de página */}
      <footer id="footer" className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <FadeInOnScroll delay={0}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-100">El Mundo de Niby</h3>
              <p className="text-gray-400 text-md">
                Innovación y diseño para un futuro digital.
              </p>
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-100">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={() => navigateTo('home')} className="text-gray-400 hover:text-white transition-colors text-md">Inicio</a></li>
                <li><a href="#" onClick={() => navigateTo('servicios-section')} className="text-gray-400 hover:text-white transition-colors text-md">Servicios</a></li>
                <li><a href="#" onClick={() => navigateTo('especialidades-section')} className="text-gray-400 hover:text-white transition-colors text-md">Nuestros Bots</a></li>
                <li><a href="#" onClick={() => navigateTo('clientes-section')} className="text-gray-400 hover:text-white transition-colors text-md">Clientes</a></li>
                <li><a href="#" onClick={() => navigateTo('about')} className="text-gray-400 hover:text-white transition-colors text-md">Sobre Nosotros</a></li>
                <li><a href="#" onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-white transition-colors text-md">Contacto</a></li>
              </ul>
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-100">Contacto</h3>
              <p className="text-gray-400 text-md">
                Email: info@elmundodeniby.com<br />
                Teléfono: +34 123 456 789<br />
                Dirección: Calle Ficticia 123, Madrid, España
              </p>
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll delay={300}>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-100">Redes Sociales</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
        <FadeInOnScroll delay={400}>
          <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} El Mundo de Niby. Todos los derechos reservados.
          </div>
        </FadeInOnScroll>
      </footer>
    </div>
  );
};

export default App;
