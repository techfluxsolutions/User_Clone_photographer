import React from 'react';
import ServiceWhyChoose from '../../Shared/ServiceWhyChoose/ServiceWhyChoose';

const EventWhyVeroaSection = () => {
  const whyItems = [
    {
      id: 1,
      icon: "/asset/ServicePages/Event/why1.png",
      text: "Flexible\nBooking"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Event/why2.png",
      text: "Fast\nPreviews"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Event/why3.png",
      text: "Trusted\nProfessionals"
    }
  ];

  return (
    <ServiceWhyChoose 
      title="Why Veroa ?" 
      items={whyItems} 
    />
  );
};

export default EventWhyVeroaSection;