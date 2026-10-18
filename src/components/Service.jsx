import React, { useState } from 'react';
import './Service.css';

// Images import
import workImg1 from "./image/work1.jpg"; 
import workImg2 from "./image/work2.jpg"; 
import workImg3 from "./image/work3.jpg"; 
import workImg4 from "./image/work4.jpg"; 

const Service = () => {
  // Data
  const allServiceData = [
    { id: 1, title: "WEDDING PHOTOGRAPHY", img: workImg1 },
    { id: 2, title: "PRE-WEDDING SHOOT", img: workImg2 },
    { id: 3, title: "CANDID PORTRAITS", img: workImg3 },
    { id: 4, title: "FASHION & COMMERCIAL", img: workImg4 },
    { id: 5, title: "BIRTHDAY EVENTS", img: workImg1 }, 
    { id: 6, title: "CORPORATE EVENTS", img: workImg2 }, 
  ];

  const [visibleItems, setVisibleItems] = useState(4);
  const [activeCard, setActiveCard] = useState(null);

  const loadMore = () => {
    setVisibleItems(prev => prev + 4); 
  };

  const allLoaded = visibleItems >= allServiceData.length;

  return (
    <section className="service-section">
      
      {/* Header with new classes */}
      <div className="service-header">
        <h2 className="service-title">OUR SERVICE</h2>
        <div className="service-line"></div>
      </div>

      {/* Grid with new classes */}
      <div className="service-grid">
        {allServiceData.slice(0, visibleItems).map((item) => (
          <div 
            className="service-card" 
            key={item.id}
            onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
          >
            
            <div className="service-image-wrapper">
              <img src={item.img} alt={item.title} className="service-img" />
              
              {/* Overlay */}
              <div className={`service-overlay ${activeCard === item.id ? 'active-mobile' : ''}`}>
                <span className="service-view-text">View Service</span>
              </div>
            </div>

            {/* Title Area */}
            <div className="service-title-box">
              <h3 className="service-category-title">{item.title}</h3>
              <div className="service-underline"></div>
            </div>

          </div>
        ))}
      </div>

      {/* Load More Button */}
      {!allLoaded && (
        <div className="service-load-wrapper">
          <button className="service-load-btn" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}

    </section>
  );
};

export default Service;