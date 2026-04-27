import React from 'react';
import ServiceWhyChoose from '../../Shared/ServiceWhyChoose/ServiceWhyChoose';

const SportsWhyVeroa = () => {
  const whyItems = [
    {
      id: 1,
      icon: "/asset/ServicePages/Sports/sport-why1.png",
      text: "Action\nSpecialist"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Sports/sport-why2.png",
      text: "Quick\nPreviews"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Sports/sport-why3.png",
      text: "Reliable\nCoverage"
    }
  ];

  return (
    <ServiceWhyChoose 
      title="Why Veroa?" 
      items={whyItems} 
    />
  );
};

export default SportsWhyVeroa;
