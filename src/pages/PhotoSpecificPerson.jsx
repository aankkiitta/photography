import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../components/data/project-data';
import AnimatedPhoto from '../components/AnimatedPhoto'; 
import './PhotoSpecificPerson.css';

const PhotoSpecificPerson = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // Tabs ke liye state
  const [activeTab, setActiveTab] = useState('photo');

  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return <h2 style={{ textAlign: 'center', marginTop: '150px' }}>Project Not Found</h2>;
  }

  const animations = ['from-left', 'from-bottom', 'from-right', 'from-top', 'zoom-in'];

  return (
    <div className="photo-specific-section">
      
     

      <div className="specific-header">
        <h1 className="specific-title">{project.title}</h1>
        <p className="specific-category">{project.category}</p>
        
       {/* PHOTO / VIDEO TOGGLE BUTTONS */}
<div className="media-toggle-container">
  {/* Sliding background pill */}
  <div className={`toggle-slider ${activeTab === 'video' ? 'right' : 'left'}`}></div>

  <button 
    type="button"
    className={`media-toggle-btn ${activeTab === 'photo' ? 'active' : ''}`}
    onClick={() => setActiveTab('photo')}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
    <span className="btn-text">Photos</span>
  </button>
  
  <button 
    type="button"
    className={`media-toggle-btn ${activeTab === 'video' ? 'active' : ''}`}
    onClick={() => setActiveTab('video')}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" ry="2"></rect>
      <polygon points="22 8 16 12 22 16 22 8"></polygon>
    </svg>
    <span className="btn-text">Videos</span>
  </button>
</div>
      </div>

      {/* CONDITIONAL RENDERING: PHOTOS TAB */}
      {activeTab === 'photo' && (
        <div className="specific-photo-grid">
          {project.gallery && project.gallery.length > 0 ? (
            project.gallery.map((img, index) => {
              const animClass = animations[index % animations.length];
              return (
                <AnimatedPhoto 
                  key={index}
                  img={img}
                  title={project.title}
                  index={index}
                  animClass={animClass}
                />
              );
            })
          ) : (
            <AnimatedPhoto 
              img={project.img} 
              title={project.title} 
              index={0} 
              animClass="zoom-in" 
            />
          )}
        </div>
      )}

      {/* CONDITIONAL RENDERING: VIDEOS TAB */}
      {activeTab === 'video' && (
        <div className="specific-video-grid">
          {project.videos && project.videos.length > 0 ? (
            project.videos.map((videoUrl, index) => {
              return (
                <div key={index} className="specific-video-box">
                  <video 
                    src={videoUrl} 
                    controls 
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', width: '100%', padding: '50px', color: '#888' }}>
              <p>No videos uploaded for this project yet.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default PhotoSpecificPerson;