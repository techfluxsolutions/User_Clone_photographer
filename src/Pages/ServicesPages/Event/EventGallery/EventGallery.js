import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const EventGallery = () => {
  const eventImages = [
    'Gallery/Event1.JPG', // Tall
    'Gallery/Event2.JPG', // Top Split 1
    'Gallery/Event3.JPG', // Bottom Split 1
    'Gallery/Event4.JPEG', // Tall
    'Gallery/Event5.JPG', // Top Split 2
    'Gallery/Event6.JPG', // Bottom Split 2
    'Gallery/Event7.JPG', // Tall
    'Gallery/Event8.JPG', // Top Split 1
    'Gallery/Event9.JPG', // Bottom Split 1
    'Gallery/Event10.JPG', // Tall
    'Gallery/Event11.JPG', // Top Split 2
    'Gallery/Event12.JPG', // Bottom Split 2
  ];

  return (
    <FeatureCollageSection 
      title="Portfolio"
      images={eventImages}
       basePath="asset/ServicePages/Event"
    />
  );
};

export default EventGallery;