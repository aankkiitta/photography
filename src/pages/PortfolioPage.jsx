import React, { useState } from 'react';
import './PortfolioPage.css'; // Nayi CSS file
import { projects } from '../components/data/project-data';
import WorkCard from '../components/WorkCard';

const categories = [
  "All", "Wedding", "Fashion", "Portrait", "Travel", 
  "Nature", "Commercial", "Architecture", "Events", "Golden Hour"
];

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter Logic: Agar "All" select hai toh saare dikhao, warna category match karo
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="portfolio-page-wrapper">
      
      {/* 1. Top Heading */}
      <div className="portfolio-header-section">
        <h1 className="portfolio-main-title">Photography</h1>
      </div>

      {/* 2. Desktop Filters (Buttons) */}
      <div className="filter-buttons-container">
        {categories.map((category, index) => (
          <button 
            key={index}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 3. Mobile Filter (Dropdown) */}
      <div className="mobile-filter-container">
        <select 
          className="mobile-filter-select"
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* 4. Work Cards Grid */}
      <div className="portfolio-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))
        ) : (
          <p className="no-results">No projects found in this category.</p>
        )}
      </div>

    </div>
  );
};

export default PortfolioPage;