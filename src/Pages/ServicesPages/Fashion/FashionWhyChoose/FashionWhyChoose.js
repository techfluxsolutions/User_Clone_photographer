import React from 'react';
import ServiceWhyChoose from '../../Shared/ServiceWhyChoose/ServiceWhyChoose';

const FashionWhyChoose = () => {
  const whyItems = [
    {
      id: 1,
      icon: "/asset/ServicePages/Fashion/fashion-why1.png",
      text: "Creative\nProfessionals"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Fashion/fashion-why2.png",
      text: "Smooth\nCoordination"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Fashion/fashion-why3.png",
      text: "Consistent\nOutput"
    }
  ];

  return (
    <ServiceWhyChoose 
      title="Why Veroa ?" 
      items={whyItems} 
    />
  );
};

export default FashionWhyChoose;
