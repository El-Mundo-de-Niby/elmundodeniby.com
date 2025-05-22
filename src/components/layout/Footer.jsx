// Archivo: components/layout/Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import FadeInOnScroll from '../common/FadeInOnScroll';

const Footer = ({ navigateTo }) => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
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
              <li><span onClick={() => navigateTo('home')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Inicio</span></li>
              <li><span onClick={() => navigateTo('servicios-section')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Servicios</span></li>
              <li><span onClick={() => navigateTo('especialidades-section')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Nuestros Bots</span></li>
              <li><span onClick={() => navigateTo('clientes-section')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Clientes</span></li>
              <li><span onClick={() => navigateTo('about')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Sobre Nosotros</span></li>
              <li><span onClick={() => navigateTo('contact')} className="cursor-pointer text-gray-400 hover:text-white transition-colors">Contacto</span></li>
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
  );
};

export default Footer;
