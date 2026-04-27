import React from 'react';
import ServiceOffersSection from '../../Shared/ServiceOffersSection/ServiceOffersSection';

const WhatWeOffer = () => {
  const weddingOffers = [
    {
      id: 1,
      icon: "/asset/ServicePages/Wedding/wed-offer1.png",
      title: "Pre-Wedding\nEvents"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Wedding/wed-offer2.png",
      title: "Wedding Day"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Wedding/wed-offer3.png",
      title: "Post Wedding"
    },
    {
      id: 4,
      icon: "/asset/ServicePages/Wedding/wed-offer4.png",
      title: "Candid Moments of family & guests"
    },
    {
      id: 5,
      icon: "/asset/ServicePages/Wedding/wed-offer5.png",
      title: "Bride & Groom Portraits"
    },
    {
      id: 6,
      icon: "/asset/ServicePages/Wedding/wed-offer6.png",
      title: "Professionally edited, timeless images"
    }
  ];

  return (
    <ServiceOffersSection 
      title="What We Offer"
      items={weddingOffers}
      showPagination={true}
      autoScroll={true}
      scrollInterval={3000}
    />
  );
};

export default WhatWeOffer;

