// Archivo: components/common/FadeInOnScroll.jsx
import React, { useRef, useState, useEffect } from 'react';

const FadeInOnScroll = ({ children, className = '', delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  return (
    <div
      className={`${className} transition-all duration-1000 ease-out ${ // Duración ajustada a 1000ms (1 segundo)
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
