import React, { useState, useEffect, useRef } from 'react';
import './Stats.css';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateValue = (start, end, duration, setter) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setter(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, 12, 2000, setCount1);
    animateValue(0, 10000, 2000, setCount2);
    animateValue(0, 14, 2000, setCount3);
    animateValue(0, 50, 2000, setCount4);

  }, [isVisible]);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        
        <div className="stat-box">
          <h3 className="stat-number">{count1}</h3>
          <p className="stat-label">Weddings</p>
        </div>

        <div className="stat-box">
          <h3 className="stat-number">
            {count2 >= 1000 ? `${(count2 / 1000).toFixed(0)},000` : count2}
            <span className="stat-plus">+</span>
          </h3>
          <p className="stat-label">Moments Captured</p>
        </div>

        <div className="stat-box">
          <h3 className="stat-number">{count3}<span className="stat-plus">+</span></h3>
          <p className="stat-label">Years Experience</p>
        </div>

        <div className="stat-box">
          <h3 className="stat-number">{count4}<span className="stat-plus">+</span></h3>
          <p className="stat-label">Destinations</p>
        </div>

      </div>
    </section>
  );
};

export default Stats;