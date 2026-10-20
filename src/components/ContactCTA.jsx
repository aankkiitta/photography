import React from 'react';
import './ContactCTA.css'; // CSS file ka path apne hisaab se check kar lein

// 1. Yahan apni image import karein
// Agar SVG hai: import cameraImg from '../image/camera-hands.svg';
// Agar PNG/JPG hai: import cameraImg from '../image/camera-hands.png';
import cameraImg from './image/banner.png'; 

export default function ContactCTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        
        {/* LEFT SIDE - Image */}
        <div className="cta-image-side">
          {/* 2. src me imported variable use karein */}
          <img 
            src={cameraImg} 
            alt="Hands holding camera" 
            className="cta-illustration" 
          />
        </div>

        {/* RIGHT SIDE - Text & Button */}
        <div className="cta-text-side">
          <h2 className="cta-heading">
            Capture the<br />Moments.
          </h2>
          <p className="cta-subtext">
            Take the photo. Create memories.<br />
            You'll thank yourself later.
          </p>
          <a href="#contact" className="cta-button">
            Contact Us
            <span className="arrow">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}