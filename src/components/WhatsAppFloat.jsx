import React from 'react';
import './WhatsAppFloat.css';

// Yahan apni WhatsApp image ka path daalein. 
// Agar image src/image folder me hai toh: import wspIcon from '../image/whatsapp.png';
// Agar public folder me hai toh: src="/whatsapp.png"
import wspIcon from './image/whatsapp.png'; 

export default function WhatsAppFloat() {
  // Yahan apna WhatsApp number daalein (Country code ke saath, bina + ya space ke)
  // Example: 91XXXXXXXXXX (India ke liye 91 lagayein)
  const phoneNumber = "919876543210"; 
  const message = "Hello Fusion Story Production! I want to know more about your services.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <img src={wspIcon} alt="WhatsApp" className="whatsapp-icon" />
    </a>
  );
}