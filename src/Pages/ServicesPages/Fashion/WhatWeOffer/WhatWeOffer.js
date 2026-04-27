import React from 'react';
import ServiceOffersSection from '../../Shared/ServiceOffersSection/ServiceOffersSection';

const WhatWeOffer = () => {
  const fashionOffers = [
    {
      id: 1,
      icon: "/asset/ServicePages/Fashion/fashion-offer1.png",
      title: "Editorial &\nLookbook Shoots"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Fashion/fashion-offer2.png",
      title: "Brand\nCampaigns"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Fashion/fashion-offer3.png",
      title: "Model\nPortfolios"
    },
    {
      id: 4,
      icon: "/asset/ServicePages/Fashion/fashion-offer4.png",
      title: "Fabric, fit & detail-focused shots"
    },
    {
      id: 5,
      icon: "/asset/ServicePages/Fashion/fashion-offer5.png",
      title: "Consistent styling and visual tone"
    },
    {
      id: 6,
      icon: "/asset/ServicePages/Fashion/fashion-offer6.png",
      title: "Professionally retouched, publication-ready images"
    }
  ];

  return (
    <ServiceOffersSection 
      title="What We Offer"
      items={fashionOffers}
      showPagination={true}
      autoScroll={true}
      scrollInterval={3000}
    />
  );
};

export default WhatWeOffer;
