import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const FoodGallery = () => {
  const foodImages = [
    'Gallery/Food1_opt.webp', // Tall
    'Gallery/Food2_opt.webp', // Top Split 1
    'Gallery/Food3_opt.webp', // Bottom Split 1
    'Gallery/Food4_opt.webp', // Tall
    'Gallery/Food5_opt.webp', // Top Split 2
    'Gallery/Food6_opt.webp', // Bottom Split 2
    'Gallery/Food7_opt.webp', // Tall
    'Gallery/Food8_opt.webp', // Top Split 1
    'Gallery/Food9_opt.webp', // Bottom Split 1
    'Gallery/Food10_opt.webp', // Tall
    'Gallery/Food11_opt.webp', // Top Split 2
    'Gallery/Food12_opt.webp', // Bottom Split 2
   
  ];

  return (
    <FeatureCollageSection 
      title="Portfolio"
      images={foodImages}
      basePath="asset/ServicePages/Food"
    />
  );
};

export default FoodGallery;