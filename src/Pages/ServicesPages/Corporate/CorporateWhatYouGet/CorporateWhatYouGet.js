import React from 'react';
import ServiceImageGallerySection from '../../Shared/ServiceImageGallerySection/ServiceImageGallerySection';

const CorporateWhatYouGet = () => {
  const images = [
    { id: 1, src: "/asset/ServicePages/Corporate/corporate-youget1.png", alt: "Product Shot 1", title: "Dramatic Angles" },
    { id: 2, src: "/asset/ServicePages/Corporate/corporate-youget2.png", alt: "Product Shot 2", title: "Detail Perfection" },
    { id: 3, src: "/asset/ServicePages/Corporate/corporate-youget3.png", alt: "Product Shot 3", title: "Motion Blur" }
  ];
  return (
    <ServiceImageGallerySection 
      title="What You Get" 
      images={images} 
    />
  );
};

export default CorporateWhatYouGet;
