import React from 'react';
import './WorkCard.css';

const WorkCard = ({ project }) => {
  return (
    <div className="work-card">
      <div className="work-card-image-wrapper">
        <img src={project.img} alt={project.title} className="work-card-img" />
        
        {/* White Border Overlay */}
        <div className="work-card-overlay">
          <h3 className="work-card-title">{project.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;