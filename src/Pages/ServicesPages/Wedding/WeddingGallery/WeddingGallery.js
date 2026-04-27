import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const WeddingGallery = () => {
  const weddingImages = [
    'Gallery/Wedding1_opt.webp', // Tall
    'Gallery/Wedding2_opt.webp', // Top Split 1
    'Gallery/Wedding3_opt.webp', // Bottom Split 1
    'Gallery/Wedding4_opt.webp', // Tall
    'Gallery/Wedding5_opt.webp', // Top Split 2
    'Gallery/Wedding6_opt.webp', // Bottom Split 2
    'Gallery/Wedding7_opt.webp', // Tall
    'Gallery/Wedding8_opt.webp', // Top Split 1
    'Gallery/Wedding9_opt.webp', // Bottom Split 1
    'Gallery/Wedding10_opt.webp', // Tall
    'Gallery/Wedding11_opt.webp', // Top Split 2
    'Gallery/Wedding12_opt.webp', // Bottom Split 2
  ];

  return (
    <FeatureCollageSection 
      title="Portfolio"
      images={weddingImages}
      basePath="asset/ServicePages/Wedding"
    />
  );
};

export default WeddingGallery;