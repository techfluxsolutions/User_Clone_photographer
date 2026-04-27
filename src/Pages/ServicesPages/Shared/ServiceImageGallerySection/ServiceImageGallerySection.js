import React from 'react';
import './ServiceImageGallerySection.css';

const ServiceImageGallerySection = ({ title, images }) => {
  return (
    <div className="service-image-gallery-section">
      <h2 className="gallery-title">{title}</h2>
      <div className="gallery-images-container">
        {images && images.map((img) => (
          <div key={img.id} className="gallery-image-wrapper">
            <img src={img.src} alt={img.alt} className="gallery-image" />
            <div className="gallery-overlay"></div>
            <div className="gallery-content">
              <h3 className="gallery-item-title">{img.title}</h3>
            </div>
            {/* <div className="gallery-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
                <path d="M9 12H15M15 12L12 9M15 12L12 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceImageGallerySection;
