import React from 'react';
import './About.css';

import aboutImage from "./image/about.png"; 

const About = () => {
  return (
    <section className="about-section">
      
      {/* LEFT SIDE: Text Content */}
      <div className="about-content-wrapper">
        <div className="about-text">
          
          <p className="about-subtitle">ABOUT FUSION STORY PRODUCTION</p>
          
          <h2 className="about-title">
            Where Every Frame Tells a 
            <span className="about-title-highlight"> Beautiful Story.</span>
          </h2>
          
          <p className="about-description">
            At Fusion Story Production, we believe photography is more than just capturing pictures — it’s about preserving emotions, celebrating connections, and turning fleeting moments into timeless memories.
          </p>
          
          <p className="about-description">
            From cinematic weddings and candid celebrations to creative portraits and fashion shoots, we bring every story to life with creativity, passion, and an eye for detail.
          </p>
          
          <p className="about-description">
            We strive to create photographs that feel authentic, look beautiful, and remain unforgettable for years to come.
          </p>

          {/* Signature Line */}
          <p className="about-signature">
            Fusion Story Production — <em>Your Moments, Our Vision, Stories That Last Forever.</em>
          </p>

          <button className="about-btn">Know More</button>
        </div>
      </div>

      {/* RIGHT SIDE: Transparent Image */}
      <div className="about-image-wrapper">
        <img src={aboutImage} alt="Photographer" className="about-transparent-img" />
      </div>

    </section>
  );
};

export default About;