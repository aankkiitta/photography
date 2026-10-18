import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import logo from "./image/logo.png"; 

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ================= MAIN HEADER ================= */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-spacer"></div>

        <div className="header-center-group">
          <nav className="nav-group desktop-only">
            <Link to="/">Home</Link>
            <a href="#services">Services</a>
            <Link to="/portfolio">Portfolio</Link>
          </nav>

          <div className="logo-container">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
          </div>

          <nav className="nav-group desktop-only">
            <a href="#about">About</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="header-right-actions desktop-only">
          <button className="book-now-btn">Book Now</button>
        </div>
      </header>

      {/* ================= FLOATING MOBILE NAV ================= */}
      <div className="floating-nav-wrapper">
        <nav className="floating-glass-nav">
          
          {/* HOME ICON (Search ki jagah) */}
          <Link to="/" className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </Link>

          <div className="nav-divider"></div>

          {/* MENU ICON */}
          <button className="nav-icon" onClick={() => setIsSliderOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
        </nav>
      </div>

      {/* ================= SLIDER MENU OVERLAY ================= */}
      <div 
        className={`mobile-slider-overlay ${isSliderOpen ? 'open' : ''}`} 
        onClick={() => setIsSliderOpen(false)}
      ></div>

      {/* ================= SLIDER MENU ================= */}
      <div className={`mobile-slider-menu ${isSliderOpen ? 'open' : ''}`}>
        <div className="slider-top-bar">
          <button className="close-btn" onClick={() => setIsSliderOpen(false)}>✕</button>
        </div>
        
        <nav className="slider-links">
          <Link to="/" onClick={() => setIsSliderOpen(false)}>Home</Link>
          <a href="#services" onClick={() => setIsSliderOpen(false)}>Services</a>
          <Link to="/portfolio" onClick={() => setIsSliderOpen(false)}>Portfolio</Link>
          <a href="#about" onClick={() => setIsSliderOpen(false)}>About</a>
          <a href="#testimonials" onClick={() => setIsSliderOpen(false)}>Testimonials</a>
          <a href="#contact" onClick={() => setIsSliderOpen(false)}>Contact</a>
        </nav>
        
        <button className="book-now-btn slider-btn">Book Now</button>
      </div>
    </>
  );
};

export default Header;