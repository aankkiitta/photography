import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CustomerReviews.css';

const reviewsData = [
  { name: "Quinn",    color: "white",  stars: 5, text: "She has such an in-depth understanding of the science behind aesthetics. So sweet and patient, and provides patient-centred care." },
  { name: "Alex",     color: "pink",   stars: 5, text: "Highly experienced, thorough and pleasant. She explained the procedure in detail and was very gentle. Highly recommend." },
  { name: "Courtney", color: "maroon", stars: 5, text: "So thorough and skilled, and an all-around delight to be around. She makes the treatments relaxed and easy, right at home." },
  { name: "Meera",    color: "white",  stars: 5, text: "Quick delivery, neat packaging and the quality is even better than the photos. Will order again." },
  { name: "Rohan",    color: "pink",   stars: 4, text: "Smooth experience from start to finish. Support answered every question within minutes." },
  { name: "Sneha",    color: "maroon", stars: 5, text: "Simple, reliable and lovely to look at. Exactly what I was searching for, and worth every rupee." }
];

const ReviewCard = ({ review }) => (
  <div className="review-card-wrapper">
    <article className={`stamp ${review.color}`}>
      <div>
        <div className="review-stars" aria-label={`${review.stars} out of 5 stars`}>
          {"★".repeat(review.stars)}
        </div>
        <p className="review-text">{review.text}</p>
      </div>
      <div className="review-who">
        <div className="review-avatar">{review.name[0]}</div>
        <div className="review-name">{review.name}</div>
      </div>
    </article>
  </div>
);

const CustomerReviews = () => {
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  
  const stageRef = useRef(null);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  // Handle Responsive Breakpoints
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const handleChange = () => {
      setPerPage(mq.matches ? 2 : 3);
      setPage(0);
    };
    
    // Set initial value
    handleChange();

    // Use addEventListener for modern browsers, fallback for older ones
    if (mq.addEventListener) {
      mq.addEventListener('change', handleChange);
    } else {
      mq.addListener(handleChange);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handleChange);
      } else {
        mq.removeListener(handleChange);
      }
    };
  }, []);

  const totalPages = Math.ceil(reviewsData.length / perPage);

  // Navigation logic with fade effect
  const changePage = useCallback((newPageIndex) => {
    // Normalize index to loop
    const normalizedPage = (newPageIndex + totalPages) % totalPages;
    
    if (normalizedPage === page) return; // Don't trigger if same page

    setFadeOut(true);
    setTimeout(() => {
      setPage(normalizedPage);
      setFadeOut(false);
    }, 300); // Matches CSS transition
  }, [page, totalPages]);

  // Auto-slide logic
  const startAutoSlide = useCallback(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      changePage(page + 1);
    }, 4000);
  }, [page, changePage]);

  const stopAutoSlide = () => {
    clearInterval(timerRef.current);
  };

  const restartAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  // Setup auto-slide on mount and when page changes
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timerRef.current);
  }, [startAutoSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    stopAutoSlide();
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 40) {
        changePage(page + (dx < 0 ? 1 : -1));
      }
      touchStartX.current = null;
    }
    restartAutoSlide();
  };

  // Get current reviews slice
  const currentReviews = reviewsData.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="customer-reviews-wrapper">
      <div className="reviews-wrap">
        <h1 className="reviews-title">
          <span className="script">Customer</span>
          <span className="caps">REVIEW</span>
        </h1>

        <section aria-label="Customer reviews">
          <div 
            className={`reviews-stage ${fadeOut ? 'out' : ''}`}
            ref={stageRef}
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-live="polite"
          >
            <div className={`reviews-page p${perPage}`}>
              {currentReviews.map((review, idx) => (
                <ReviewCard key={`${page}-${idx}`} review={review} />
              ))}
            </div>
          </div>

          <div className="reviews-nav">
            <button 
              className="arrow" 
              onClick={() => { changePage(page - 1); restartAutoSlide(); }} 
              aria-label="Previous reviews"
            >
              &#8592;
            </button>
            
            <div className="reviews-dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i}
                  className={i === page ? 'on' : ''}
                  onClick={() => { changePage(i); restartAutoSlide(); }}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button 
              className="arrow" 
              onClick={() => { changePage(page + 1); restartAutoSlide(); }} 
              aria-label="Next reviews"
            >
              &#8594;
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerReviews;