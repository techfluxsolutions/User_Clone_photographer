import React from 'react';
import ServiceImageGallerySection from '../../Shared/ServiceImageGallerySection/ServiceImageGallerySection';

const FoodWhatYouGet = () => {
  const images = [
    { id: 1, src: "/asset/ServicePages/Food/Food-get1.png", alt: "Food Photography 1", title: "Menu Photography" },
    { id: 2, src: "/asset/ServicePages/Food/Food-get2.png", alt: "Food Photography 2", title: "Styled Shots" },
    { id: 3, src: "/asset/ServicePages/Food/Food-get3.png", alt: "Food Photography 3", title: "Plating Details" }
  ];

  return (
    <ServiceImageGallerySection 
      title="What You Get" 
      images={images} 
    />
  );
};

export default FoodWhatYouGet;
