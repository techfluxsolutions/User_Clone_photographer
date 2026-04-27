import React from 'react';
import ServiceOffersSection from '../../Shared/ServiceOffersSection/ServiceOffersSection';

const CorporateWhatWeOffer = () => {
  const foodOffers = [
      {
      id: 1,
      icon: "/asset/ServicePages/Product/Product-offer1.png",
      title: "Clean, brand-\naligned visuals"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Product/Product-offer2.png",
      title: "Professional on-\nsite execution"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Product/Product-offer3.png",
      title: "Reliable Delivery\nSchedules"
    },
    {
      id: 4,
      icon: "/asset/ServicePages/Product/Product-offer4.png",
      title: "Polished\nLeadership &\nTeam Portraits"
    },
    {
      id: 5,
      icon: "/asset/ServicePages/Product/Product-offer5.png",
      title: "Consistent visual\nquality across all\nassets"
    },
    {
      id: 6,
      icon: "/asset/ServicePages/Product/Product-offer6.png",
      title: "Professionally\nedited, business-\nready images"
    }
  ];

  return (
    <ServiceOffersSection 
      title="What We Offer"
      items={foodOffers}
      showPagination={true}
      autoScroll={true}
      scrollInterval={3000}
    />
  );
};

export default CorporateWhatWeOffer;
