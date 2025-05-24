// File: components/layout/Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import FadeInOnScroll from '../common/FadeInOnScroll';

const Footer = ({ navigateTo }) => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black dark:from-black dark:to-gray-950 py-12 duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <FadeInOnScroll delay={0}>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-100">El Mundo de Niby</h3>
            <p className="text-gray-400 text-md">
              Innovation and design for a digital future.
            </p>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll delay={100}>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><span onClick={() => navigateTo('home')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Home</span></li>
              <li><span onClick={() => navigateTo('servicios-section')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Services</span></li>
              <li><span onClick={() => navigateTo('especialidades-section')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Our Bots</span></li>
              <li><span onClick={() => navigateTo('clientes-section')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Clients</span></li>
              <li><span onClick={() => navigateTo('about')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">About Us</span></li>
              <li><span onClick={() => navigateTo('contact')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Contact</span></li>
            </ul>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll delay={200}>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-100">Contact</h3>
            <p className="text-gray-400 text-md">
              Email: contact@elmundodeniby.com<br />
              Phone: +34 123 456 789<br />
              Address: Fictitious Street 123, Madrid, Spain
            </p>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll delay={300}>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-100">Social Media</h3>
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
          © {new Date().getFullYear()} El Mundo de Niby. All rights reserved.
        </div>
      </FadeInOnScroll>
    </footer>
  );
};

export default Footer;