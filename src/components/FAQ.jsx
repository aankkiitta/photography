import React, { useState } from 'react';
import './FAQ.css';

const FAQ_DATA = [
  {
    q: "What is your photography style?",
    a: "We specialize in a blend of cinematic, editorial, and candid storytelling. Our goal is to capture raw emotions with a timeless aesthetic."
  },
  {
    q: "Do you travel for shoots?",
    a: "Absolutely! We are based in Mumbai but available worldwide. Travel expenses are calculated separately based on the location."
  },
  {
    q: "How long until we get our photos?",
    a: "A sneak peek is delivered within 48 hours. The complete high-resolution gallery takes 3-4 weeks for weddings and 1-2 weeks for portrait sessions."
  },
  {
    q: "Do you provide raw files?",
    a: "We believe in delivering our final edited vision. However, raw files can be licensed for an additional fee under specific agreements."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="faq-split-section">
      <div className="faq-container">
        
        {/* LEFT SIDE (20%) */}
        <div className="faq-left">
          <h2>FAQ<span>s</span></h2>
          <p>Got questions? We've got answers. Explore the details below.</p>
        </div>

        {/* RIGHT SIDE (80%) - Film Roll Style */}
        <div className="faq-right">
          <div className="film-roll-wrapper">
            
            {/* Film strip holes top */}
            <div className="film-holes top"></div>
            
            <div className="faq-list">
              {FAQ_DATA.map((item, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="faq-question">
                    <span className="q-num">0{index + 1}</span>
                    <h4>{item.q}</h4>
                    <span className="toggle-icon">{activeIndex === index ? '−' : '+'}</span>
                  </div>
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Film strip holes bottom */}
            <div className="film-holes bottom"></div>

          </div>
        </div>

      </div>
    </section>
  );
}