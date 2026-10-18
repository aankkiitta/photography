import React, { useState, useEffect } from 'react';
import './PortfolioCarousel.css';

const PortfolioCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeText, setFadeText] = useState(false);

  const items = [
    { title: "Wedding", subtitle: "Love, captured forever.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" },
    { title: "Fashion", subtitle: "Style in every frame.", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop" },
    { title: "Portrait", subtitle: "Every face tells a story.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
    { title: "Travel", subtitle: "Moments from everywhere.", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop" },
    { title: "Nature", subtitle: "Beauty in every detail.", img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=600&auto=format&fit=crop" },
    { title: "Commercial", subtitle: "Stories that sell.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop" },
    { title: "Architecture", subtitle: "Spaces with character.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" },
    { title: "Events", subtitle: "Moments worth remembering.", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop" },
  ];

  useEffect(() => {
    setFadeText(false);
    const timer = setTimeout(() => {
      setFadeText(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length]);

  const getItemClass = (index) => {
    const offset = index - currentIndex;
    if (offset === 0) return 'active';
    if (offset === -1) return 'prev';
    if (offset === 1) return 'next';
    if (offset === -2) return 'prev-2';
    if (offset === 2) return 'next-2';
    return '';
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <section className="portfolio-section" id="portfolio">
      
      {/* NAYE SVG ARROW BUTTONS */}
      <button className="arrow-btn left-arrow" onClick={handlePrev} disabled={currentIndex === 0} aria-label="Previous">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 17 6 12 13 7"></polyline>
          <polyline points="20 17 13 12 20 7"></polyline>
        </svg>
      </button>

      <button className="arrow-btn right-arrow" onClick={handleNext} disabled={currentIndex === items.length - 1} aria-label="Next">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="11 17 18 12 11 7"></polyline>
          <polyline points="4 17 11 12 4 7"></polyline>
        </svg>
      </button>

      <div className="carousel-wrapper-main">
        
        <div className="section-header">
          <h2 className="section-title">OUR <span>PORTFOLIO</span></h2>
          <p className="section-description">
            From timeless weddings to bold fashion and unforgettable events, explore our world through the lens.
          </p>
        </div>

        <div className="carousel">
          {items.map((item, index) => (
            <div 
              key={index}
              className={`carousel-item ${getItemClass(index)}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={item.img} alt={item.title} />
            </div>
          ))}
        </div>

        <div className={`text-section ${fadeText ? 'show' : ''}`}>
          <h2 className="category-title">{items[currentIndex].title}</h2>
          <p className="category-subtitle">{items[currentIndex].subtitle}</p>
          <a href="#" className="view-more">View More</a>
        </div>

      </div>

    </section>
  );
};

export default PortfolioCarousel;