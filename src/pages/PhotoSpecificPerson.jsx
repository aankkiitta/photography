import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../components/data/project-data';
import AnimatedPhoto from '../components/AnimatedPhoto'; // <-- Import kiya
import './PhotoSpecificPerson.css';

const PhotoSpecificPerson = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return <h2 style={{ textAlign: 'center', marginTop: '150px' }}>Project Not Found</h2>;
  }

  const animations = ['from-left', 'from-bottom', 'from-right', 'from-top', 'zoom-in'];

  return (
    <div className="photo-specific-section">
      
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Portfolio
      </button>

      <div className="specific-header">
        <h1 className="specific-title">{project.title}</h1>
        <p className="specific-category">{project.category}</p>
      </div>

      <div className="specific-photo-grid">
        {project.gallery && project.gallery.length > 0 ? (
          project.gallery.map((img, index) => {
            const animClass = animations[index % animations.length];

            return (
              // Naya Component use kiya
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

    </div>
  );
};

export default PhotoSpecificPerson;