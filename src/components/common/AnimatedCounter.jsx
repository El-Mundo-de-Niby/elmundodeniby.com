// Archivo: components/common/AnimatedCounter.jsx
import React, { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ end, duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [end, duration, hasStarted]);

  return <span ref={ref} className={className}>{count}</span>;
};

export default AnimatedCounter;