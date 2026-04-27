import React from 'react';
import ServiceWhyChoose from '../../Shared/ServiceWhyChoose/ServiceWhyChoose';

const ProductWhyChoose = () => {
  const whyItems = [
    {
      id: 1,
      icon: "/asset/ServicePages/Product/Product-why1.png",
      text: "E-Commerce\nExpertise"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Product/Product-why2.png",
      text: "Consistent\nQuality"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Product/Product-why3.png",
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

export default ProductWhyChoose;
