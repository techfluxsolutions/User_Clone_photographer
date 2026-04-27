import React from 'react';
import ServiceWhyChoose from '../../Shared/ServiceWhyChoose/ServiceWhyChoose';

const AutoWhyVeroa = () => {
  const whyItems = [
    {
      id: 1,
      icon: "/asset/ServicePages/Automotive/why1.png",
      text: "Detail-focused\nExperts"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Automotive/why2.png",
      text: "Premium\nFinishing"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Automotive/why3.png",
      text: "In-Time\nDelivery"
    }
  ];

  return (
    <ServiceWhyChoose
      title="Why Veroa ?"
      items={whyItems}
    />
  );
};

export default AutoWhyVeroa;