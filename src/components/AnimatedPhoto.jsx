import React, { useEffect, useRef, useState } from 'react';

const AnimatedPhoto = ({ img, title, index, animClass }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Jab screen par aaye toh true kar do
            observer.unobserve(entry.target); // Ek baar animate hone ke baad observe karna band kar do
          }
        });
      },
      { threshold: 0.1 } // Jab 10% image screen par dikhe tab trigger ho
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      // Agar visible hai toh animation class lagao, warna hidden class
      className={`specific-photo-box ${isVisible ? animClass : 'hidden'}`}
      style={{ animationDelay: `${(index % 3) * 0.15}s` }} // 3 images ke group ke hisaab se delay
    >
      <img src={img} alt={`${title} - ${index}`} />
    </div>
  );
};

export default AnimatedPhoto;