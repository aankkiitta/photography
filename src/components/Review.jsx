import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Contact page par le jaane ke liye
import './Review.css';

// Apni background image yahan import karein
import bgImage from './image/avatar.png'; 

// Slider Images
const clientPhotos = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === clientPhotos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? clientPhotos.length - 1 : prev - 1));
  };

  return (
    <section 
      className="simple-clients-section" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-overlay"></div>

      <div className="content-wrapper">
        <h2 className="simple-title">More Than 100+ Happy Clients</h2>

        <div className="simple-slider-wrapper">
          <button className="simple-arrow" onClick={prevSlide}>
            &#10094;
          </button>

          <div className="simple-image-container">
            <img 
              src={clientPhotos[currentIndex]} 
              alt="Client" 
              className="simple-img" 
            />
          </div>

          <button className="simple-arrow" onClick={nextSlide}>
            &#10095;
          </button>
        </div>

        {/* NAYA BUTTON: Contact Us */}
        <div className="contact-btn-wrapper">
          <Link to="/contact" className="contact-btn">
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Review;