import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "./image/logo.png"; 

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Left Side: Contact Info (Jaise image mein hai) */}
        <div className="footer-left">
          
          {/* Instagram Icon */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-insta-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* Phone Number */}
          <p className="footer-contact-text">+232345467</p>
          
          {/* Email */}
          <p className="footer-contact-text">gmail@.com</p>

        </div>

        {/* Right Side: Logo & Tagline */}
        <div className="footer-right">
          <Link to="/">
            <img src={logo} alt="Fusion Story Production" className="footer-logo" />
          </Link>
          <p className="footer-tagline">Capturing Moments, Creating Memories.</p>
        </div>

      </div>

      {/* Bottom Section: Copyright & Crafted By */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Fusion Story Production. All Rights Reserved.</p>
        
        <p className="crafted-by">
          Crafted by <a href="https://avanaaa.com" target="_blank" rel="noopener noreferrer">Avanaaa</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;