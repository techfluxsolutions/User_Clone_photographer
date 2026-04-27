import React from 'react';
import ServiceImageGallerySection from '../../Shared/ServiceImageGallerySection/ServiceImageGallerySection';

const SportsWhatYouGet = () => {
  const images = [
    { id: 1, src: "/asset/ServicePages/Sports/sport-get1.png", alt: "Sports Photography 1", title: "Game Coverage" },
    { id: 2, src: "/asset/ServicePages/Sports/sport-get2.png", alt: "Sports Photography 2", title: "Action Shots" },
    { id: 3, src: "/asset/ServicePages/Sports/sport-get3.png", alt: "Sports Photography 3", title: "Team Moments" }
  ];

  return (
    <ServiceImageGallerySection 
      title="What You Get" 
      images={images} 
    />
  );
};

export default SportsWhatYouGet;
