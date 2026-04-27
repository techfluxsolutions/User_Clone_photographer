import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const ProductGallery = () => {
  const productImages = [
    'Gallery/Product1_opt.webp', // Tall
    'Gallery/Product2_opt.webp', // Top Split 1
    'Gallery/Product3_opt.webp', // Bottom Split 1
    'Gallery/Product4_opt.webp', // Tall
    'Gallery/Product5_opt.webp', // Top Split 2
    'Gallery/Product6_opt.webp', // Bottom Split 2
    'Gallery/Product7_opt.webp', // Tall
    'Gallery/Product8_opt.webp', // Top Split 1
    'Gallery/Product9_opt.webp', // Bottom Split 1
    'Gallery/Product10_opt.webp', // Tall
    'Gallery/Product11_opt.webp', // Top Split 2
    'Gallery/Product12_opt.webp', // Bottom Split 2
  ];

  return (
    <FeatureCollageSection 
      title="Portfolio"
      images={productImages}
      basePath="asset/ServicePages/Product"
    />
  );
};

export default ProductGallery;