// src/components/pages/ServiceDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Zap, CheckCircle, Shield, Brain, Server, ArrowRight } from 'lucide-react';
import FadeInOnScroll from '../../common/FadeInOnScroll';
import NotFoundPage from '../NotFoundPage';

// Datos de ejemplo para los detalles de los servicios
const serviceDetailsData = {
    'custom-bots': {
        title: "Custom Discord Bot Development",
        icon: Zap,
        colorName: "blue", // Usaremos esto para buscar en el mapeo de clases
        tagline: "Your Vision, Our Code: Bots Built from Scratch.",
        imageUrl: "https://picsum.photos/seed/custombots_service/1200/500",
        description: "Need a bot that does exactly what you envision? Our custom bot development service is designed to bring your unique ideas to life. We work closely with you from concept to deployment, ensuring every feature aligns with your server's specific requirements and goals.",
        sections: [
            {
                title: "What We Offer",
                points: [
                    "Tailored functionality for any purpose: moderation, utility, games, API integrations, and more.",
                    "Clean, efficient, and scalable code built with best practices.",
                    "Private hosting options for maximum control and performance.",
                    "Ongoing maintenance and support packages available.",
                    "Full consultation to understand your needs and provide the best solution."
                ]
            },
            {
                title: "The Process",
                points: [
                    "1. Discovery & Consultation: We discuss your ideas, requirements, and server goals.",
                    "2. Planning & Design: We outline the bot's features, architecture, and user flow.",
                    "3. Development: Our expert coders bring the design to life.",
                    "4. Testing & QA: Rigorous testing to ensure stability and performance.",
                    "5. Deployment & Handover: We help you deploy the bot and provide necessary documentation."
                ]
            },
            {
                title: "Why Choose Custom?",
                points: [
                    "Unmatched flexibility: Get features no off-the-shelf bot can offer.",
                    "Perfect integration: Designed specifically for your community's workflow.",
                    "Full ownership (optional): You can own the source code.",
                    "Dedicated support: Direct access to the developers who built your bot."
                ]
            }
        ],
        cta: {
            text: "Start Your Custom Bot Project",
            link: "/contact?subject=Custom%20Bot%20Project"
        }
    },
    'community-automation': {
        title: "Community Automation Solutions",
        icon: Shield,
        colorName: "green",
        tagline: "Streamline Your Server, Engage Your Members.",
        imageUrl: "https://picsum.photos/seed/automation_service/1200/500",
        description: "Automate repetitive tasks and enhance member engagement with our smart community automation bots. From welcoming new users to managing roles and events, we build solutions that save you time and improve your server's efficiency.",
        sections: [
            {
                title: "Automation Capabilities",
                points: [
                    "Automated welcome messages and role assignments.",
                    "Scheduled announcements and event reminders.",
                    "Auto-responses to frequently asked questions.",
                    "Integration with server rules and moderation actions.",
                    "Customizable workflows to fit your community structure."
                ]
            },
            {
                title: "Benefits",
                points: [
                    "Reduce staff workload and manual intervention.",
                    "Ensure consistent member experiences.",
                    "Improve server organization and information flow.",
                    "Boost member activity with automated engagement prompts."
                ]
            }
        ],
        cta: {
            text: "Automate Your Community",
            link: "/contact?subject=Community%20Automation"
        }
    },
    'server-management': {
        title: "Advanced Server Management Bots",
        icon: Server,
        colorName: "indigo",
        tagline: "Powerful Tools for Effortless Server Control.",
        imageUrl: "https://picsum.photos/seed/management_service/1200/500",
        description: "Take full control of your Discord server with our advanced management bots. We provide robust tools for moderation, dynamic role assignment, comprehensive logging, and efficient member and channel administration.",
        sections: [
            {
                title: "Key Management Features",
                points: [
                    "Advanced moderation: Customizable filters, auto-warn/mute/kick/ban systems.",
                    "Dynamic role management: Reaction roles, level-based roles, temporary roles.",
                    "Comprehensive logging: Track messages, edits, deletions, member joins/leaves, voice activity.",
                    "Channel management tools: Auto-archiving, temporary channels, channel templates.",
                    "Server backup and restore utilities (for certain configurations)."
                ]
            },
            {
                title: "Advantages",
                points: [
                    "Maintain a safe and organized server environment.",
                    "Simplify complex administrative tasks.",
                    "Gain better insights into server activity.",
                    "Empower your moderation team with efficient tools."
                ]
            }
        ],
        cta: {
            text: "Enhance Your Server Management",
            link: "/contact?subject=Server%20Management"
        }
    },
    'ai-api-integration': {
        title: "AI & API Integration Bots",
        icon: Brain,
        colorName: "purple",
        tagline: "Intelligent Bots, Connected Experiences.",
        imageUrl: "https://picsum.photos/seed/ai_api_service/1200/500",
        description: "Leverage the power of Artificial Intelligence and external APIs to create truly unique and intelligent Discord bots. We can integrate with various AI models, databases, and third-party services to provide advanced functionalities.",
        sections: [
            {
                title: "Possible Integrations",
                points: [
                    "AI-powered chatbots for natural language interaction (e.g., OpenAI GPT, Gemini).",
                    "Image generation and recognition bots.",
                    "Sentiment analysis for community feedback.",
                    "Integration with game APIs for stats, leaderboards, and updates.",
                    "Connection to your existing databases or web services.",
                    "Custom API development for unique data flows."
                ]
            },
            {
                title: "Why Integrate?",
                points: [
                    "Offer unique and cutting-edge features to your members.",
                    "Automate complex decision-making processes.",
                    "Provide personalized and context-aware interactions.",
                    "Extend your server's capabilities beyond Discord's native functions."
                ]
            }
        ],
        cta: {
            text: "Explore AI & API Solutions",
            link: "/contact?subject=AI%20API%20Integration"
        }
    }
};

// Mapeo de nombres de color a clases de Tailwind
const colorClasses = {
    blue: {
        text: "text-blue-500 dark:text-blue-400",
        border: "border-blue-500/50 dark:border-blue-400/50",
        bg: "bg-blue-600",
        hoverBg: "hover:bg-blue-700",
    },
    green: {
        text: "text-green-500 dark:text-green-400",
        border: "border-green-500/50 dark:border-green-400/50",
        bg: "bg-green-600",
        hoverBg: "hover:bg-green-700",
    },
    indigo: {
        text: "text-indigo-500 dark:text-indigo-400",
        border: "border-indigo-500/50 dark:border-indigo-400/50",
        bg: "bg-indigo-600",
        hoverBg: "hover:bg-indigo-700",
    },
    purple: {
        text: "text-purple-500 dark:text-purple-400",
        border: "border-purple-500/50 dark:border-purple-400/50",
        bg: "bg-purple-600",
        hoverBg: "hover:bg-purple-700",
    },
    default: { // Un color por defecto si no se especifica o no coincide
        text: "text-gray-500 dark:text-gray-400",
        border: "border-gray-500/50 dark:border-gray-400/50",
        bg: "bg-gray-600",
        hoverBg: "hover:bg-gray-700",
    }
};

const ServiceDetailPage = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const service = serviceDetailsData[serviceId];

    if (!service) {
        return <NotFoundPage />;
    }

    const AccentIcon = service.icon; // Usar ServiceIconDefault si no hay icono
    const currentThemeColors = colorClasses[service.colorName] || colorClasses.default;

    return (
        <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
            <div className="container mx-auto px-6 max-w-4xl">
                <FadeInOnScroll>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-10 group"
                    >
                        <ArrowLeft size={20} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to Services
                    </button>
                </FadeInOnScroll>

                <article>
                    <FadeInOnScroll>
                        <div className="mb-8 text-center">
                            <AccentIcon size={64} className={`mx-auto mb-4 ${currentThemeColors.text}`} strokeWidth={1.5} />
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight">
                                {service.title}
                            </h1>
                            {service.tagline && (
                                <p className="text-xl text-gray-600 dark:text-gray-400">{service.tagline}</p>
                            )}
                        </div>
                    </FadeInOnScroll>

                    {service.imageUrl && (
                        <FadeInOnScroll delay={100}>
                            <img
                                src={service.imageUrl}
                                alt={service.title}
                                className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-2xl mb-12"
                            />
                        </FadeInOnScroll>
                    )}

                    <FadeInOnScroll delay={200}>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
                            <p>{service.description}</p>
                        </div>
                    </FadeInOnScroll>

                    {service.sections && service.sections.map((section, index) => (
                        <FadeInOnScroll key={index} delay={300 + index * 100} className="mb-10">
                            <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b-2 ${currentThemeColors.border} flex items-center`}>
                                <AccentIcon size={24} className={`mr-3 ${currentThemeColors.text}`} strokeWidth={2} />
                                {section.title}
                            </h2>
                            <ul className="space-y-3 pl-1">
                                {section.points.map((point, pIndex) => (
                                    <li key={pIndex} className="flex items-start">
                                        <CheckCircle size={20} className={`mr-3 mt-1 flex-shrink-0 ${currentThemeColors.text}`} />
                                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </FadeInOnScroll>
                    ))}

                    {service.cta && (
                        <FadeInOnScroll delay={400 + (service.sections?.length || 0) * 100} className="mt-16 text-center">
                            <button
                                onClick={() => navigate(service.cta.link)}
                                className={`inline-flex items-center ${currentThemeColors.bg} text-white px-10 py-4 rounded-full text-lg font-semibold
                             ${currentThemeColors.hoverBg} transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105`}
                            >
                                {service.cta.text}
                                <ArrowRight size={20} className="ml-3" />
                            </button>
                        </FadeInOnScroll>
                    )}
                </article>

                <FadeInOnScroll delay={500 + (service.sections?.length || 0) * 100}>
                    <div className="text-center mt-20">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-6 py-3 rounded-full text-md font-semibold
                           hover:bg-gray-300 dark:hover:bg-gray-600
                           transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <Home className="mr-2" size={18} /> Back to Home
                        </button>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
};

export default ServiceDetailPage;