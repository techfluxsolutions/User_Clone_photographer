import React from 'react';
import ServiceImageGallerySection from '../../Shared/ServiceImageGallerySection/ServiceImageGallerySection';

const EventWhatYouGetSection = () => {
  const images = [
    { id: 1, src: "/asset/ServicePages/Event/youget1.png", alt: "Event Shot 1", title: "Birthdays, Party and Gathering" },
    { id: 2, src: "/asset/ServicePages/Event/youget2.png", alt: "Event Shot 2", title: "Hourly Booking Options" },
    { id: 3, src: "/asset/ServicePages/Event/youget3.png", alt: "Event Shot 3", title: "Edited Digital Images" }
  ];

  return (
    <ServiceImageGallerySection 
      title="What You Get" 
      images={images} 
    />
  );
};

export default EventWhatYouGetSection;
