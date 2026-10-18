import React, { useState, useEffect } from 'react';
import './Hero.css';

import heroImg1 from "./image/hero1.jpg"; 
import heroImg2 from "./image/hero2.jpg"; 
import heroVideo from "./image/hero-video.mp4"; // Video import karein

const Hero = () => {
  const images = [heroImg1, heroImg2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval); 
  }, [images.length]);

  // Scroll track karne ke liye
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image cut karne ka calculation
  const windowHeight = window.innerHeight;
  const scrollStart = windowHeight * 0.2; // 20% scroll ke baad image katna shuru hogi
  
  let clipAmount = 0;
  if (scrollY > scrollStart) {
    clipAmount = scrollY - scrollStart; 
  }
  if (clipAmount > windowHeight) {
    clipAmount = windowHeight;
  }

  return (
    // 👇 MAIN WRAPPER (Dono sections iske andar hain)
    <div className="hero-combined-section">
      
      {/* 1. BACKGROUND VIDEO (Jo image ke peeche hai) */}
      <div className="hero-video-bg">
        <video 
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline 
          className="bg-video"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Video ke upar halka sa dark overlay taaki text padhne me aasani ho */}
        <div className="video-overlay"></div>
      </div>

      {/* 2. STICKY IMAGE (Jo neeche se cut hokar video ko reveal karegi) */}
      <div 
        className="hero-sticky-bg"
        style={{ 
          clipPath: `inset(0 0 ${clipAmount}px 0)` 
        }}
      >
        {images.map((img, index) => (
          <div 
            key={index}
            className={`hero-bg-image ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
        <div className="hero-overlay"></div>
      </div>
      
      {/* 3. SCROLLING TEXT & BUTTONS */}
      <div className="hero-scroll-content">
        <button className="desktop-btn prev" onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}>&#10094;</button>
        <button className="desktop-btn next" onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}>&#10095;</button>

        <div className="hero-content">
          <p className="hero-subtitle">We are one of the Best Wedding Photographers in Mumbai.</p>
          <h1 className="hero-title">TALKING PICTURES BY HITESH</h1>
        </div>
      </div>

      {/* 4. VIDEO MUTE BUTTON (Optional - Video ke liye) */}
      <button className="video-mute-btn" onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? "🔇" : "🔊"}
      </button>

    </div>
  );
};

export default Hero;