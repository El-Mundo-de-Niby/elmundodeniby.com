// File: components/pages/AboutUsPage.jsx
import React, { useEffect, useState } from 'react';
import { ChevronRight, Lightbulb, Users, Award, Home, Twitter, Github, Youtube, Linkedin } from 'lucide-react';

// Basic FadeInOnScroll component (if not already provided)
const FadeInOnScroll = ({ children, delay = 0, duration = 800, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current); // Stop observing once visible
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    observer.observe(domRef.current);

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${className} transition-all ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
      ref={domRef}
    >
      {children}
    </div>
  );
};

const AboutUsPage = ({ setPage }) => {
  return (
    // Main section: Add dark mode background and text colors
    <section className="py-32 md:py-48 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <div className="container mx-auto px-6 max-w-[75%]">

        {/* Main Title Section */}
        <FadeInOnScroll>
          <div className="text-center mb-32">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
              About El Mundo de Niby
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Ambitious ideas into functional and aesthetically flawless digital realities.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Section: Our History - Text Left, Photo Right */}
        <FadeInOnScroll delay={100}>
          <div className="flex flex-col md:flex-row items-center md:space-x-16 mb-32 md:mb-48">
            {/* Text on the left */}
            <div className="md:w-1/2 text-left mb-12 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-9 leading-tight">
                Our History
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                El Mundo de Niby was born from a shared passion for technology and design.
                Founded in 20XX, our mission has always been clear: to transform ambitious ideas
                into functional and aesthetically flawless digital realities. We started as
                a small team of enthusiasts and have grown to become a benchmark
                in digital solutions, always maintaining our essence of innovation and close customer
                relationships.
              </p>
            </div>
            {/* Photo on the right */}
            <div className="md:w-1/2 relative group">
              <img src="https://picsum.photos/1000/700?random=1" alt="Our History" className="rounded-3xl shadow-2xl w-full h-auto object-cover border border-gray-200 dark:border-gray-600 transition-transform duration-500 group-hover:scale-105" />
              {/* Dark mode border color for hover effect */}
              <div className="absolute inset-0 rounded-3xl border-4 border-gray-900 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Section: Our Vision - Photo Left, Text Right */}
        <FadeInOnScroll delay={200}>
          <div className="flex flex-col md:flex-row items-center md:space-x-16 mb-32 md:mb-48">
            {/* Photo on the left */}
            <div className="md:w-1/2 relative group mb-12 md:mb-0">
              <img src="https://picsum.photos/1000/700?random=2" alt="Our Vision" className="rounded-3xl shadow-2xl w-full h-auto object-cover border border-gray-200 dark:border-gray-600 transition-transform duration-500 group-hover:scale-105" />
              {/* Dark mode border color for hover effect */}
              <div className="absolute inset-0 rounded-3xl border-4 border-gray-900 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            {/* Text on the right */}
            <div className="md:w-1/2 text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-9 leading-tight">
                Our Vision
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                We envision a future where technology is an accessible and powerful tool for everyone.
                We strive to be leaders in creating digital experiences that not only solve
                problems but also inspire and connect people. We believe in the power of
                collaboration and in building solutions that anticipate tomorrow's needs.
              </p>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Section: Our Team - Diego Rodríguez */}
        <FadeInOnScroll delay={300}>
          <div className="text-center mb-32 md:mb-48">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-16">
              Meet Our Founder
            </h2>
            {/* Card background, text, and border for dark mode */}
            <div className="flex flex-col items-center max-w-2xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl dark:shadow-xl dark:shadow-gray-700/50 border border-gray-100 dark:border-gray-700">
              <div className="mb-10 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                {/* Image border color for dark mode */}
                <img src="https://picsum.photos/seed/diegorodriguez/800/1000" alt="Diego Rodríguez" className="rounded-full shadow-xl w-64 h-64 object-cover border-4 border-gray-300 dark:border-gray-500" />
              </div>
              <p className="text-base font-medium text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wider">CEO & Founder</p>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Diego Rodríguez <span className="font-normal text-gray-700 dark:text-gray-300">(dewstouh)</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed px-4">
                Hi! I'm Diego Rodríguez, known in the online community as "dewstouh".
                My journey in software development has focused on creating innovative
                solutions and teaching programming through my channel "Coding with Dew".
                I firmly believe in the power of technology to transform lives and businesses.
              </p>
              {/* Social Media Links: Add dark mode text colors and specific hover colors */}
              <div className="flex space-x-6 mt-8">
                <a href="https://www.linkedin.com/in/diegorodriguez" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={32} className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300" />
                </a>
                <a href="https://twitter.com/yourtwitterhandle" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={32} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a href="https://github.com/yourgithubprofile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={32} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300" />
                </a>
                <a href="https://www.youtube.com/@CodingWithDew" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube size={32} className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Section: Learn with "Coding with Dew" */}
        <FadeInOnScroll delay={400}>
          <div className="text-center mb-32 md:mb-48">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-8">
              Learn with "Coding with Dew"
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-16">
              Discover tutorials, projects, and programming tips to boost your skills, including complete guides to creating your own Discord bots.
            </p>
            {/* Video placeholder and button for dark mode */}
            <div className="relative w-full max-w-5xl mx-auto aspect-video bg-gray-200 dark:bg-gray-700 rounded-3xl shadow-2xl dark:shadow-xl dark:shadow-gray-700/50 overflow-hidden group">
              <img src="https://picsum.photos/seed/youtubechannel/1280/720" alt="Video Placeholder" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <a href="https://www.youtube.com/@CodingWithDew" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-lg transform hover:scale-105">
                  Visit Channel <ChevronRight className="ml-3" size={24} />
                </a>
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Section: Our Philosophy */}
        <FadeInOnScroll delay={500}>
          <div className="text-center mb-32 md:mb-48">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-16">
              Our Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {/* Philosophy Card 1 - Dark mode styles */}
              <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-gray-700/50">
                <div className="mb-8 text-gray-900 dark:text-gray-100">
                  <Lightbulb size={64} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Constant Innovation</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  We always seek the most creative and technologically advanced solutions,
                  staying at the forefront of the latest trends.
                </p>
              </div>
              {/* Philosophy Card 2 - Dark mode styles */}
              <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-gray-700/50">
                <div className="mb-8 text-gray-900 dark:text-gray-100">
                  <Users size={64} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Close Collaboration</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  We work hand-in-hand with you to understand your vision, your goals,
                  and materialize your ideas with precision and dedication.
                </p>
              </div>
              {/* Philosophy Card 3 - Dark mode styles */}
              <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-gray-700/50">
                <div className="mb-8 text-gray-900 dark:text-gray-100">
                  <Award size={64} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quality and Efficiency</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  We deliver robust, optimized, and scalable solutions,
                  guaranteeing the best performance and a flawless user experience.
                </p>
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Back to Home Button - Dark mode styles */}
        <FadeInOnScroll delay={600}>
          <div className="text-center mt-24">
            <button
              onClick={() => setPage('home')}
              className="inline-flex items-center bg-gray-900 dark:bg-blue-600 text-white dark:text-white px-12 py-6 rounded-full text-xl font-semibold hover:bg-gray-700 dark:hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-blue-800"
            >
              Back to Home <Home className="ml-4" size={24} />
            </button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default AboutUsPage;