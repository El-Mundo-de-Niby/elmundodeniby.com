// src/components/pages/ShopPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Home } from 'lucide-react';
import BotCard from './shop/BotCard';
import FadeInOnScroll from '../common/FadeInOnScroll';

const ShopPage = () => {
    const navigate = useNavigate();

    const availableBots = [
        {
            id: 'bot001',
            name: 'Moderator Pro',
            description: 'Advanced moderation bot with auto-mute, kick, ban, and custom command capabilities. Keep your server safe and clean.',
            price: 29.99,
            imageUrl: 'https://picsum.photos/seed/moderatorpro/400/300',
            features: ['Auto-moderation', 'Custom Commands', 'Logging', 'Role Management'],
        },
        {
            id: 'bot002',
            name: 'Music Master',
            description: 'High-quality music streaming bot that supports YouTube, Spotify, SoundCloud, and more. Create playlists and enjoy with friends.',
            price: 19.99,
            imageUrl: 'https://picsum.photos/seed/musicmaster/400/300',
            features: ['Multi-source Streaming', 'Playlist System', 'DJ Roles', 'Volume Control'],
        },
        {
            id: 'bot003',
            name: 'Welcome Wizard',
            description: 'Greet new members with customizable welcome messages, assign auto-roles, and provide server information seamlessly.',
            price: 9.99,
            imageUrl: 'https://picsum.photos/seed/welcomewizard/400/300',
            features: ['Custom Welcome Banners', 'Auto-Roles', 'Captcha Verification', 'Farewell Messages'],
        },
        {
            id: 'bot004',
            name: 'Giveaway Guru',
            description: 'Easily manage and run giveaways on your server. Set requirements, choose winners automatically, and boost engagement.',
            price: 14.99,
            imageUrl: 'https://picsum.photos/seed/giveawayguru/400/300',
            features: ['Multiple Winners', 'Role Requirements', 'Scheduled Giveaways', 'Fair Winner Picking'],
        },
        {
            id: 'bot005',
            name: 'Stats Sentinel',
            description: 'Track server statistics, member activity, message counts, and more. Get insights into your community\'s growth.',
            price: 24.99,
            imageUrl: 'https://picsum.photos/seed/statssentinel/400/300',
            features: ['Activity Tracking', 'Graphical Reports', 'Leaderboards', 'Export Data'],
        },
        {
            id: 'bot006',
            name: 'Support Spark',
            description: 'Create a ticket system for your server support. Manage queries efficiently with organized channels and staff assignments.',
            price: 22.50,
            imageUrl: 'https://picsum.photos/seed/supportspark/400/300',
            features: ['Ticket System', 'Staff Assignment', 'Custom Responses', 'Transcript Logging'],
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
            <div className="container mx-auto px-6 max-w-7xl">
                <FadeInOnScroll>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                        El Mundo de Niby Bot Shop
                    </h1>
                </FadeInOnScroll>
                <FadeInOnScroll delay={100}>
                    <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center mb-16 leading-relaxed max-w-3xl mx-auto">
                        Discover our pre-built Discord bots, ready to enhance your server. Each bot is crafted with care and packed with features.
                    </p>
                </FadeInOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
                    {availableBots.map((bot, index) => (
                        <BotCard key={bot.id} bot={bot} />
                    ))}
                </div>

                <FadeInOnScroll delay={200}>
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                            Not what you're looking for?
                        </h2>
                        <button
                            onClick={() => navigate('/create-bot')}
                            className="inline-flex items-center bg-gray-900 text-white px-10 py-5 rounded-full text-xl font-semibold
                         hover:bg-gray-700 dark:bg-blue-600 dark:hover:bg-blue-700
                         transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl transform hover:scale-105"
                        >
                            Create Your Own Bot! <Bot size={24} className="ml-3" />
                        </button>
                    </div>
                </FadeInOnScroll>

                <FadeInOnScroll delay={300}>
                    <div className="text-center mt-16">
                        <button
                            onClick={() => navigate('/create-bot')}
                            className="inline-flex items-center bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-6 py-3 rounded-full text-md font-semibold 
                               hover:bg-gray-200 dark:hover:bg-gray-700 
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

export default ShopPage;