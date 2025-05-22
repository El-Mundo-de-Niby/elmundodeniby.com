// Archivo: components/common/ScrollAnimatedImage.jsx
import React, { useRef, useState, useEffect } from 'react';

const ScrollAnimatedImage = ({ src, alt, className = '' }) => {
  const imageRef = useRef(null);
  const [imageStyle, setImageStyle] = useState({
    transform: 'scale(0.8) translateY(50px)',
    opacity: 0.5,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const startPoint = viewportHeight * 0.75;
        const endPoint = viewportHeight * 0.25;

        const scrollProgress = Math.max(0, Math.min(1, (startPoint - rect.top) / (startPoint - endPoint)));

        const newScale = 0.8 + (scrollProgress * 0.2);
        const newOpacity = 0.5 + (scrollProgress * 0.5);
        const newTranslateY = (1 - scrollProgress) * 50;

        setImageStyle({
          transform: `scale(${newScale}) translateY(${newTranslateY}px)`,
          opacity: newOpacity,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={`${className} transition-transform transition-opacity duration-1000 ease-out`}
      style={imageStyle}
    />
  );
};

export default ScrollAnimatedImage;
