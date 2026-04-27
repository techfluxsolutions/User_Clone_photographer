import React from 'react';
import ServiceOffersSection from '../../Shared/ServiceOffersSection/ServiceOffersSection';

const SportsWhatWeOffer = () => {
  const sportsOffers = [
    {
      id: 1,
      icon: "/asset/ServicePages/Sports/sport-offer1.png",
      title: "Sharp Action\nMoments"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Sports/sport-offer2.png",
      title: "Player and\nTeam highlights"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Sports/sport-offer3.png",
      title: "Match-Day\nStorytelling"
    }
  ];

  return (
    <ServiceOffersSection 
      title="What We Offer"
      items={sportsOffers}
      showPagination={true}
      autoScroll={true}
      scrollInterval={3000}
    />
  );
};

export default SportsWhatWeOffer;
