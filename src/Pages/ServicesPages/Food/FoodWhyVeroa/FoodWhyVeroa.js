import React from 'react';
import ServiceWhyChoose from '../../Shared/ServiceWhyChoose/ServiceWhyChoose';

const FoodWhyVeroa = () => {
  const whyItems = [
    {
      id: 1,
      icon: "/asset/ServicePages/Food/food-why1.png",
      text: "Experienced\nFood\nPhotographers"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Food/food-why2.png",
      text: "In-Time\nDelivery"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Food/food-why3.png",
      text: "Reliable\nResults"
    }
  ];

  return (
    <ServiceWhyChoose 
      title="Why Veroa?" 
      items={whyItems} 
    />
  );
};

export default FoodWhyVeroa;
