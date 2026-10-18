import React from 'react';
import './BestWork.css';
import { projects } from "./data/project-data"; 
import WorkCard from './WorkCard'; 

const BestWork = () => {
  return (
    <section className="best-work-dark-section">
      
      <div className="best-work-header">
        <h2 className="best-work-title">OUR BEST WORK!</h2>
      </div>

      <div className="project-grid">
        {/* Yahan .slice(0, 6) lagaya hai taaki sirf pehle 6 cards dikhein */}
        {projects.slice(0, 6).map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="view-all-wrapper">
        <button className="view-all-btn">View All</button>
      </div>

    </section>
  );
};

export default BestWork;