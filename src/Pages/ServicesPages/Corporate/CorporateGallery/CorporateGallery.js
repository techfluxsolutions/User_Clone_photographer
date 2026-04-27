import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const CorporateGallery = () => {
  const corporateImages = [
    'Gallery/Corporate1_opt.webp', // Tall
    'Gallery/Corporate2_opt.webp', // Top Split 1
    'Gallery/Corporate3_opt.webp', // Bottom Split 1
    'Gallery/Corporate4_opt.webp', // Tall
    'Gallery/Corporate5_opt.webp', // Top Split 2
    'Gallery/Corporate6_opt.webp', // Bottom Split 2
  ];

  return (
    <FeatureCollageSection 
      title="Portfolio"
      images={corporateImages}
       basePath="asset/ServicePages/Corporate"
    />
  );
};

export default CorporateGallery;