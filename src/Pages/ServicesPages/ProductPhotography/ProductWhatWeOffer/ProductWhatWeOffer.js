import React from 'react';
import ServiceOffersSection from '../../Shared/ServiceOffersSection/ServiceOffersSection';

const ProductWhatWeOffer = () => {
  const foodOffers = [
      {
      id: 1,
      icon: "/asset/ServicePages/Product/Product-offer1.png",
      title: "White-background\nproduct shots"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Product/Product-offer2.png",
      title: "Lifestyle &\nin-use images"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Product/Product-offer3.png",
      title: "Detail &\nclose-ups"
    },
    {
      id: 4,
      icon: "/asset/ServicePages/Product/Product-offer4.png",
      title: "Accurate color\nand texture\nrepresentation"
    },
    {
      id: 5,
      icon: "/asset/ServicePages/Product/Product-offer5.png",
      title: "Consistent\nframing across\nall products"
    },
    {
      id: 6,
      icon: "/asset/ServicePages/Product/Product-offer6.png",
      title: "Platform-ready images for website,marketplaces & ads"
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

export default ProductWhatWeOffer;
