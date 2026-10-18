import React, { useRef, useState } from 'react';
import './HeroVideo.css';

// Video import karein
import heroVideo from "./image/hero-video.mp4"; 

const HeroVideo = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="hero-video-section">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted={isMuted} 
        playsInline 
        className="bg-video"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Glassmorphism Mute Button */}
      <button className="video-mute-btn" onClick={toggleMute} aria-label="Toggle Mute">
        {isMuted ? (
          /* Mute Icon (Speaker with Cross) */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          /* Unmute Icon (Speaker with Waves) */
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        )}
      </button>
    </section>
  );
};

export default HeroVideo;