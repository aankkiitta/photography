import React from 'react';
import './FilmStripReview.css';

export default function FilmStripReview() {
  return (
    <section className="review-section">
      <div className="review-wrapper">
        
        {/* Film Strip Container */}
        <div className="film-strip">
          
          {/* Single Frame containing the text */}
          <div className="film-frame text-frame">
            <div className="review-content">
              <div className="stars">★★★★★</div>
              
              <span className="quote-icon">“</span>
              
              <p>
                Fusion Story Production captured our wedding beautifully. 
                Every time we look at these photos, it brings back the exact emotions we felt that day. 
                The team was so professional and made us feel completely comfortable in front of the camera!
              </p>
              
              <div className="client-info">
                <h4>Aniket & Neeta</h4>
                <span>Wedding Clients</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}