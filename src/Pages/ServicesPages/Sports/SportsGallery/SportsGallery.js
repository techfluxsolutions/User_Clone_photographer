import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const SportsGallery = () => {
  const sportsImages = [
    'Gallery/Sports1_opt.webp', // Tall
    'Gallery/Sports2_opt.webp', // Top Split 1
    'Gallery/Sports3_opt.webp', // Bottom Split 1
    'Gallery/Sports4_opt.webp', // Tall
    'Gallery/Sports5_opt.webp', // Top Split 2
    'Gallery/Sports6_opt.webp', // Bottom Split 2
  ];

  return (
    <FeatureCollageSection 
      title="Portfolio"
      images={sportsImages}
     basePath="asset/ServicePages/Sports"
    />
  );
};

export default SportsGallery;