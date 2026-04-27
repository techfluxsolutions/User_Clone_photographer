import React from 'react';
import ServiceImageGallerySection from '../../Shared/ServiceImageGallerySection/ServiceImageGallerySection';

const AutoWhatYouGet = () => {
  const images = [
    { id: 1, src: "/asset/ServicePages/Automotive/auto-get1.png", alt: "Automotive Shot 1", title: "Dramatic Angles" },
    { id: 2, src: "/asset/ServicePages/Automotive/auto-get2.png", alt: "Automotive Shot 2", title: "Premium Editing" },
    { id: 3, src: "/asset/ServicePages/Automotive/auto-get3.png", alt: "Automotive Shot 3", title: "Polished Final Images" }
  ];

  return (
    <ServiceImageGallerySection 
      title="What You Get" 
      images={images} 
    />
  );
};

export default AutoWhatYouGet;
