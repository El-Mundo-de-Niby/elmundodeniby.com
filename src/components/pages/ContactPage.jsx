// File: components/pages/ContactPage.jsx
import React, { useState } from 'react';
import { MessageSquare, Home } from 'lucide-react';
import FadeInOnScroll from '../common/FadeInOnScroll';

const ContactPage = ({ setPage }) => {
  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans"> {/* Reduced vertical padding */}
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeInOnScroll>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8 leading-tight"> {/* Reduced mb */}
            Let's Talk Your Ideas
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <p className="text-md md:text-lg text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed"> {/* Reduced mb */}
            Do you have an idea for a Discord bot? Do you need help with your online
            community or want to discuss a project? We are here to help.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={200}>
          <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl shadow-xl"> {/* Reduced padding here (p-5 instead of p-6) */}
            {/* Tabs - Only one button now, so no need for 'activeTab' logic */}
            <div className="flex justify-center mb-6 border-b border-gray-300 dark:border-gray-700"> {/* Reduced mb */}
              <button
                className={`py-2.5 px-5 text-lg font-semibold rounded-t-lg transition-colors duration-300 text-gray-900 dark:text-gray-100 border-b-2 border-gray-700 dark:border-gray-300 flex items-center`} // Reduced py and px
              >
                <MessageSquare size={20} className="mr-2" /> Contact Form
              </button>
            </div>

            {/* Tab Content - Only form content remains */}
            <div className="space-y-4"> {/* Reduced space between elements (space-y-4 instead of space-y-6) */}
              <p className="text-md text-gray-700 dark:text-gray-300 mb-2"> {/* Reduced mb */}
                Fill out the form with your project details or question. We will get back to you shortly.
              </p>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label> {/* Reduced mb */}
                <input
                  type="text"
                  id="fullName"
                  placeholder="Your full name"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm" // Reduced px/py and added text-sm
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label> {/* Reduced mb */}
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm" // Reduced px/py and added text-sm
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label> {/* Reduced mb */}
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject of your message"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm" // Reduced px/py and added text-sm
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label> {/* Reduced mb */}
                <textarea
                  id="message"
                  rows="4" // Reduced default rows
                  placeholder="Write your message here..."
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm" // Reduced px/py and added text-sm
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600" // Reduced px/py for button
              >
                Send Message
              </button>
            </div>
          </div>
        </FadeInOnScroll>

        {/* This section might need slight adjustment if you want it closer/further */}
        <FadeInOnScroll delay={300}>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-xl mt-10 text-center"> {/* Reduced mt slightly */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Join Our Community</h3>
            <p className="text-md text-gray-700 dark:text-gray-300 mb-6">
              Connect with other users, ask questions, and stay up-to-date with news.
            </p>
            <a
              href="https://discord.gg/elmundodeniby"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-lg hover:scale-105 transform"
            >
              Join Discord Server <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right ml-2"><path d="m9 18 6-6-6-6" /></svg>
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">We're waiting for you!</p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={400}>
          <div className="text-center mt-10"> {/* Reduced mt slightly */}
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

// Suggested reusable styles (updated for compactness):
// .form-label = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
// .form-input = "w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-sm"
// .btn-primary = "inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg hover:scale-105 transform dark:bg-gray-700 dark:hover:bg-gray-600"
// .tab-btn = "py-2.5 px-5 text-lg font-semibold rounded-t-lg transition-colors duration-300 flex items-center"
// .tab-active (implicitly applied to the single tab) = "text-gray-900 dark:text-gray-100 border-b-2 border-gray-700 dark:border-gray-300"