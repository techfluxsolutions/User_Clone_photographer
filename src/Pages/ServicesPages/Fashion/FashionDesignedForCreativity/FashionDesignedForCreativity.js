import React from 'react';
import ServiceImageGallerySection from '../../Shared/ServiceImageGallerySection/ServiceImageGallerySection';

const FashionDesignedForCreativity = () => {
  const images = [
    { 
      id: 1, 
      src: "/asset/ServicePages/Fashion/creativity1.png", 
      alt: "Fashion Creativity 1", 
      title: "Concept & Pose Guidance" 
    },
    { 
      id: 2, 
      src: "/asset/ServicePages/Fashion/creativity2.png", 
      alt: "Fashion Creativity 2", 
      title: "Studio & Outdoor Shoots" 
    },
    { 
      id: 3, 
      src: "/asset/ServicePages/Fashion/creativity3.png", 
      alt: "Fashion Creativity 3", 
      title: "Multiple Outfit Coverage" 
    }
  ];

  return (
    <ServiceImageGallerySection 
      title="Designed for Creativity" 
      images={images} 
    />
  );
};

export default FashionDesignedForCreativity;
