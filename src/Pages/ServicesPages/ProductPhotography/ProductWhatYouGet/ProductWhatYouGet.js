import React from 'react';
import ServiceImageGallerySection from '../../Shared/ServiceImageGallerySection/ServiceImageGallerySection';

const ProductWhatYouGet = () => {
  const images = [
    { id: 1, src: "/asset/ServicePages/Product/Product-youget1.png", alt: "Product Shot 1", title: "Platform-Ready Images" },
    { id: 2, src: "/asset/ServicePages/Product/Product-youget2.png", alt: "Product Shot 2", title: "Accurate Colors & Detailing" },
    { id: 3, src: "/asset/ServicePages/Product/Product-youget3.png", alt: "Product Shot 3", title: "Professional Retouching" }
  ];

  return (
    <ServiceImageGallerySection 
      title="What You Get" 
      images={images} 
    />
  );
};

export default ProductWhatYouGet;
