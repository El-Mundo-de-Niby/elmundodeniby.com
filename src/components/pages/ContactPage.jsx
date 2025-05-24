// File: components/pages/ContactPage.jsx
import React, { useState } from 'react';
import { MessageSquare, Calendar, ChevronRight, Home } from 'lucide-react';
import FadeInOnScroll from '../common/FadeInOnScroll';

const ContactPage = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'meeting'

  return (
    <section className="py-32 md:py-48 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInOnScroll>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12 leading-tight">
            Let's Talk Your Ideas
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center mb-10 leading-relaxed">
            Do you have an idea for a Discord bot? Do you need help with your online
            community or want to discuss a project? We are here to help.
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
                <MessageSquare size={20} className="mr-2" /> Contact Form
              </button>
              <button
                onClick={() => setActiveTab('meeting')}
                className={`py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 ${activeTab === 'meeting'
                  ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-700 dark:border-gray-300' // Darker border for active tab
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  } flex items-center`}
              >
                <Calendar size={20} className="mr-2" /> Book a Meeting
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'form' && (
              <div className="space-y-6">
                <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
                  Fill out the form with your project details or question. We will get back to you shortly.
                </p>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject of your message"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Send Message
                </button>
              </div>
            )}

            {activeTab === 'meeting' && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  To book a meeting, please contact us directly by email or through the contact form, and we will coordinate an appointment.
                </p>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  We look forward to talking with you soon!
                </p>
              </div>
            )}
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={300}>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Join Our Community</h3>
            <p className="text-md text-gray-700 dark:text-gray-300 mb-6">
              Connect with other users, ask questions, and stay up-to-date with news.
            </p>
            <a
              href="https://discord.gg/elmundodeniby" // Updated Discord link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-lg hover:scale-105 transform"
            >
              Join Discord Server <ChevronRight className="ml-2" size={20} />
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">We're waiting for you!</p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={400}>
          <div className="text-center mt-12">
            <button
              onClick={() => setPage('home')}
              className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-full text-md font-semibold hover:bg-gray-700 transition duration-300 shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Back to Home <Home className="ml-2" size={18} />
            </button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default ContactPage;

// Suggested reusable styles:
// .form-label = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
// .form-input = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200"
// .btn-primary = "inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
// .tab-btn = "py-3 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 flex items-center"
// .tab-active = "text-gray-900 dark:text-gray-100 border-b-2 border-gray-700 dark:border-gray-300"