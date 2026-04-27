import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const MaternityGallery = () => {
  const maternityImages = [
    'Gallery/Maternity1_opt.webp', // Tall
    'Gallery/Maternity2_opt.webp', // Top Split 1
    'Gallery/Maternity3_opt.webp', // Bottom Split 1
    'Gallery/Maternity4_opt.webp', // Tall
    'Gallery/Maternity5_opt.webp', // Top Split 2
    'Gallery/Maternity6_opt.webp', // Bottom Split 2
    'Gallery/Maternity7_opt.webp', // Tall
    'Gallery/Maternity8_opt.webp', // Top Split 1
    'Gallery/Maternity9_opt.webp', // Bottom Split 1
    'Gallery/Maternity10_opt.webp', // Tall
    'Gallery/Maternity11_opt.webp', // Top Split 2
    'Gallery/Maternity12_opt.webp', // Bottom Split 2
  ];

  return (
    <FeatureCollageSection 
      title="Portfolio"
      images={maternityImages}
      basePath="asset/ServicePages/Maternity"
    />
  );
};

export default MaternityGallery;