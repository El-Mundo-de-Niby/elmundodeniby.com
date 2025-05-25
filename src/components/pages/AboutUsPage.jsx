// File: components/pages/AboutUsPage.jsx
import React, { useEffect, useState } from 'react';
import { ChevronRight, Lightbulb, Users, Award, Home, Twitter, Github, Youtube, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

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

const AboutUsPage = () => { 
  const navigate = useNavigate(); // Inicializa useNavigate

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
                El Mundo de Niby was born from a passion for technology and a clear vision: to transform ambitious ideas into functional and aesthetically flawless digital realities. From our beginnings, we have been committed to excellence, innovation, and client satisfaction. Our journey has been marked by continuous learning, adaptation to new trends, and the constant search for creative solutions that truly make a difference.
              </p>
            </div>
            {/* Photo on the right */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://picsum.photos/seed/digitalstrategy/1200/700"
                alt="Our History"
                className="rounded-3xl shadow-xl w-full max-w-md md:max-w-none"
                style={{
                  clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0% 100%)', // Adjusted clip-path for a more dynamic shape
                  shapeOutside: 'polygon(0 15%, 100% 0, 100% 85%, 0% 100%)',
                }}
              />
            </div>
          </div>
        </FadeInOnScroll>


        {/* Section: Our Mission - Photo Left, Text Right */}
        <FadeInOnScroll delay={200}>
          <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-16 mb-32 md:mb-48">
            {/* Text on the right */}
            <div className="md:w-1/2 text-left mb-12 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-9 leading-tight">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Our mission is to empower businesses and individuals through cutting-edge technological solutions. We believe in technology as a catalyst for growth, efficiency, and creativity. We strive to build intuitive, robust, and scalable platforms that not only meet our clients' current needs but also anticipate future challenges, helping them stay ahead in a constantly evolving digital world.
              </p>
            </div>
            {/* Photo on the left */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://picsum.photos/seed/digitalstrategy/1200/700"
                alt="Our Mission"
                className="rounded-3xl shadow-xl w-full max-w-md md:max-w-none"
                style={{
                  clipPath: 'polygon(100% 15%, 0 0, 0 85%, 100% 100%)', // Adjusted clip-path
                  shapeOutside: 'polygon(100% 15%, 0 0, 0 85%, 100% 100%)',
                }}
              />
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

        {/* Section: Our Values - Grid of 3 Values */}
        <FadeInOnScroll delay={300}>
          <div className="text-center mb-24 md:mb-32">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-16 leading-tight">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Value 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col items-center border border-gray-100 dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-gray-700/50">
                <div className="mb-8 text-gray-900 dark:text-gray-100">
                  <Lightbulb size={64} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Innovation and Creativity</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  We are constantly exploring new technologies and ideas to offer fresh and effective solutions.
                </p>
              </div>
              {/* Value 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex flex-col items-center border border-gray-100 dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-gray-700/50">
                <div className="mb-8 text-gray-900 dark:text-gray-100">
                  <Users size={64} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Commitment and Transparency</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  We build lasting relationships based on trust, open communication, and mutual respect.
                </p>
              </div>
              {/* Value 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl
                flex flex-col items-center border border-gray-100 dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-gray-700/50">
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
              onClick={() => navigate('/')} // Usa navigate para ir a la ruta raíz
              className="inline-flex items-center bg-gray-900 dark:bg-blue-600 text-white dark:text-white px-12 py-6 rounded-full text-xl font-semibold hover:bg-gray-700 dark:hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-blue-800"
            >
              Back to Home <Home className="ml-3" size={24} />
            </button>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default AboutUsPage;