import React from 'react';
import ServiceOffersSection from '../../Shared/ServiceOffersSection/ServiceOffersSection';

const EventWhatWeOfferSection = () => {
  const eventOffers = [
    {
      id: 1,
      icon: "/asset/ServicePages/Event/event-offer1.png",
      title: "Full event\n coverage"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Event/event-offer2.png",
      title: "Candid\nmoments"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Event/event-offer3.png",
      title: "In-Time \n Delivery"
    },
    {
      id: 4,
      icon: "/asset/ServicePages/Event/event-offer4.png",
      title: "Key highlights and \nImportant Moments \nCaptured"
    },
    {
      id: 5,
      icon: "/asset/ServicePages/Event/event-offer5.png",
      title: "Group and \n Interaction Shots"
    },
    {
      id: 6,
      icon: "/asset/ServicePages/Event/event-offer6.png",
      title: "Professionally Edited \n final images"
    }
  ];

  return (
    <ServiceOffersSection 
      title="What We Offer"
      items={eventOffers}
      showPagination={true}
      autoScroll={true}
      scrollInterval={3000}
    />
  );
};

export default EventWhatWeOfferSection;
