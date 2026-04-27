import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const AutoGallery = () => {
  const automobileImages = [
    'Gallery/Automobile1_opt.webp', // Tall
    'Gallery/Automobile2_opt.webp', // Top Split 1
    'Gallery/Automobile3_opt.webp', // Bottom Split 1
    'Gallery/Automobile4_opt.webp', // Tall
    'Gallery/Automobile5_opt.webp', // Top Split 2
    'Gallery/Automobile6_opt.webp', // Bottom Split 2
  ];

  return (
    <FeatureCollageSection 
      title="Portfolio"
      images={automobileImages}
       basePath="asset/ServicePages/Automotive"
    />
  );
};

export default AutoGallery;