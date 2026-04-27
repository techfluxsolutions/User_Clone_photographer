import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const FashionGallery = () => {
  const fashionImages = [
    'Gallery/Fashion1_opt.webp', // Tall
    'Gallery/Fashion2_opt.webp', // Top Split 1
    'Gallery/Fashion3_opt.webp', // Bottom Split 1
    'Gallery/Fashion4_opt.webp', // Tall
    'Gallery/Fashion5_opt.webp', // Top Split 2
    'Gallery/Fashion6_opt.webp', // Bottom Split 2
    'Gallery/Fashion7_opt.webp', // Tall
    'Gallery/Fashion8_opt.webp', // Top Split 1
    'Gallery/Fashion9_opt.webp', // Bottom Split 1
    'Gallery/Fashion10_opt.webp', // Tall
    'Gallery/Fashion11_opt.webp', // Top Split 2
    'Gallery/Fashion12_opt.webp', // Bottom Split 2
   
  ];

  return (
    <FeatureCollageSection 
      title="Portfolio"
      images={fashionImages}
      basePath="asset/ServicePages/Fashion"
    />
  );
};

export default FashionGallery;