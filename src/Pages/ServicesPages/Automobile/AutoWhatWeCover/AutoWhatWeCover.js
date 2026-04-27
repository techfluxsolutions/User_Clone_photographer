import React from 'react';
import ServiceOffersSection from '../../Shared/ServiceOffersSection/ServiceOffersSection';

const AutoWhatWeCover = () => {
  const coverItems = [
    {
      id: 1,
      icon: "/asset/ServicePages/Automotive/Auto-offer1.png",
      title: "Exterior & Interior Vehicle Shots"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Automotive/Auto-offer2.png",
      title: "Detail and Feature Highlights"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Automotive/Auto-offer3.png",
      title: "Promotional and Marketing Visuals"
    },
    {
      id: 4,
      icon: "/asset/ServicePages/Automotive/Auto-offer4.png",
      title: "Clean, Distraction-free Compositions"
    },
    {
      id: 5,
      icon: "/asset/ServicePages/Automotive/Auto-offer5.png",
      title: "Dramatic lighting and angles"
    },
    {
      id: 6,
      icon: "/asset/ServicePages/Automotive/Auto-offer6.png",
      title: "Professionally edited, high-resolution images"
    }
  ];

  return (
    <ServiceOffersSection 
      title="What We Cover"
      items={coverItems}
      showPagination={true}
      autoScroll={true}
      scrollInterval={3000}
    />
  );
};

export default AutoWhatWeCover;

