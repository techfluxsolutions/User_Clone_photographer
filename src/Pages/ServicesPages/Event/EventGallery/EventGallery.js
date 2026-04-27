import React from 'react';
import FeatureCollageSection from '../../Shared/FeatureCollageSection/FeatureCollageSection';

const EventGallery = () => {
  const eventImages = [
    'Gallery/Event1.jpg', // Tall
    'Gallery/Event2.jpg', // Top Split 1
    'Gallery/Event3.jpg', // Bottom Split 1
    'Gallery/Event4.jpeg', // Tall
    'Gallery/Event5.jpg', // Top Split 2
    'Gallery/Event6.jpg', // Bottom Split 2
    'Gallery/Event7.jpg', // Tall
    'Gallery/Event8.jpg', // Top Split 1
    'Gallery/Event9.jpg', // Bottom Split 1
    'Gallery/Event10.jpg', // Tall
    'Gallery/Event11.jpg', // Top Split 2
    'Gallery/Event12.jpg', // Bottom Split 2
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