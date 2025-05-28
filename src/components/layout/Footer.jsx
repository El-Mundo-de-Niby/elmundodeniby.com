// File: src/components/layout/Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Mail, Phone, ArrowUpCircle, ShoppingBag, Info, Bot, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FadeInOnScroll from '../common/FadeInOnScroll';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const footerSections = [
    {
      title: 'Explore',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop', icon: ShoppingBag },
        { name: 'Create a Bot', path: '/create-bot', icon: Bot },
        { name: 'About Us', path: '/about', icon: Users },
        { name: 'Contact', path: '/contact', icon: Mail },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'FAQs', path: '/faqs' }, // Example, assuming you might add these pages
        { name: 'Support', path: '/contact' },
        { name: 'Blog', path: '/blog' }, // Example
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' }, // Example
        { name: 'Terms of Service', path: '/terms-of-service' }, // Example
        { name: 'Cookie Policy', path: '/cookie-policy' }, // Example
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/elmundodeniby', icon: Facebook, label: "Facebook page for El Mundo de Niby" },
    { name: 'Twitter', href: 'https://twitter.com/elmundodeniby', icon: Twitter, label: "Twitter profile for El Mundo de Niby" },
    { name: 'Instagram', href: 'https://instagram.com/elmundodeniby', icon: Instagram, label: "Instagram profile for El Mundo de Niby" },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/elmundodeniby', icon: Linkedin, label: "LinkedIn page for El Mundo de Niby" },
    { name: 'YouTube', href: 'https://www.youtube.com/@codingwithdew3066', icon: Youtube, label: "Coding with Dew YouTube Channel" },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Upper Footer Section */}
        <FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-block mb-5 text-3xl font-extrabold text-white hover:text-blue-400 transition-colors">
                El Mundo de Niby
              </Link>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                Crafting intelligent Discord bots and innovative digital solutions to elevate your community.
              </p>
              <div className="flex items-center text-sm">
                <MapPin size={16} className="mr-2 text-blue-400 flex-shrink-0" />
                <span>Madrid, Spain</span>
              </div>
              <a href="mailto:contact@elmundodeniby.com" className="mt-2 flex items-center text-sm hover:text-blue-400 transition-colors group">
                <Mail size={16} className="mr-2 text-blue-400 flex-shrink-0 group-hover:animate-pulse" />
                contact@elmundodeniby.com
              </a>
              <a href="tel:+34123456789" className="mt-2 flex items-center text-sm hover:text-blue-400 transition-colors group">
                <Phone size={16} className="mr-2 text-blue-400 flex-shrink-0 group-hover:animate-pulse" />
                Not available
              </a>
            </div>

            {/* Link Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-5 tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm hover:text-blue-400 transition-colors duration-200 flex items-center group"
                      >
                        {link.icon && <link.icon size={16} className="mr-2 opacity-70 group-hover:opacity-100 group-hover:text-blue-400 transition-all" />}
                        {link.name}
                        <ArrowUpCircle size={14} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:text-blue-400 transition-opacity -rotate-45 transform group-hover:rotate-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeInOnScroll>

        {/* Separator */}
        <FadeInOnScroll delay={100}>
          <hr className="border-gray-700 dark:border-gray-800 my-10" />
        </FadeInOnScroll>

        {/* Bottom Bar: Copyright and Social Links */}
        <FadeInOnScroll delay={200}>
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} El Mundo de Niby. All Rights Reserved.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 hover:text-blue-400 transition-transform duration-200 ease-in-out hover:scale-110"
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </FadeInOnScroll>

        {/* Back to top button - optional, but good for long pages */}
        <FadeInOnScroll delay={300}>
          <div className="mt-12 text-center">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 transition-colors text-xs group"
              aria-label="Back to top"
            >
              Back to Top <ArrowUpCircle size={18} className="ml-2 group-hover:animate-bounce" />
            </button>
          </div>
        </FadeInOnScroll>

      </div>
    </footer>
  );
};

export default Footer;