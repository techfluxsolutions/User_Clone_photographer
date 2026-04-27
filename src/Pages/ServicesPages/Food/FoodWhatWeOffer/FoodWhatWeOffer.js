import React from 'react';
import ServiceOffersSection from '../../Shared/ServiceOffersSection/ServiceOffersSection';

const FoodWhatWeOffer = () => {
  const foodOffers = [
    {
      id: 1,
      icon: "/asset/ServicePages/Food/food-offer1.png",
      title: "Menu & dish\nphotography"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Food/food-offer2.png",
      title: "Restaurant\nInteriors"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Food/food-offer3.png",
      title: "Packaging &\nbrand shots"
    },
    {
      id: 4,
      icon: "/asset/ServicePages/Food/food-offer4.png",
      title: "LifeStyle food imagery"
    },
    {
      id: 5,
      icon: "/asset/ServicePages/Food/food-offer5.png",
      title: "Consistent lighting & angles across dishes"
    },
    {
      id: 6,
      icon: "/asset/ServicePages/Food/food-offer6.png",
      title: "High resolution, professionally edited images"
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

export default FoodWhatWeOffer;
