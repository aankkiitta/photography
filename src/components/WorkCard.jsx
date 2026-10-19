import React from 'react';
import { Link } from 'react-router-dom';
import './WorkCard.css';

const WorkCard = ({ project }) => {
  return (
    // Link lagaya taaki click karne par naye page par jaye
    <Link to={`/project/${project.id}`} className="work-card-link">
      <div className="work-card">
        <div className="work-card-image-wrapper">
          <img src={project.img} alt={project.title} className="work-card-img" />
          
          <div className="work-card-overlay">
            <h3 className="work-card-title">{project.title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;