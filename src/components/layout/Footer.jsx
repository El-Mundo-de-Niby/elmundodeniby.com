// File: components/layout/Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react'; // Añadidos iconos para Contact Info
import { Link } from 'react-router-dom'; // Importa Link
import FadeInOnScroll from '../common/FadeInOnScroll';

const Footer = () => {
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
              <li><Link to="/" className="cursor-pointer text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="cursor-pointer text-gray-400 hover:text-white transition-colors">Services</Link></li> {/* Asume una ruta /services */}
              <li><Link to="/specialties" className="cursor-pointer text-gray-400 hover:text-white transition-colors">Specialties</Link></li> {/* Asume una ruta /specialties */}
              <li><Link to="/about" className="cursor-pointer text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="cursor-pointer text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll delay={200}>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-100">Contact Info</h3>
            <ul className="space-y-2 text-gray-400 text-md">
              <li className="flex items-center justify-center md:justify-start">
                <Mail size={18} className="mr-2" />
                <a href="mailto:info@niby.com" className="hover:text-white transition-colors">info@niby.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone size={18} className="mr-2" />
                <a href="tel:+34123456789" className="hover:text-white transition-colors">+34 123 456 789</a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <MapPin size={18} className="mr-2" />
                Madrid, Spain
              </li>
            </ul>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll delay={300}>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-100">Social Media</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
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