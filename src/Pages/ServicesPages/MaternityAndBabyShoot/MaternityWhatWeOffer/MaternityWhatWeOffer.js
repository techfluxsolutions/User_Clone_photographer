import React from 'react';
import ServiceOffersSection from '../../Shared/ServiceOffersSection/ServiceOffersSection';

const MaternityWhatWeOffer = () => {
  const MaternityOffers = [
    {
      id: 1,
      icon: "/asset/ServicePages/Maternity/mat-offer1.png",
      title: "Gentle, Unhurried\nphotography\nSessions"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Maternity/mat-offer2.png",
      title: "Baby-safe\nand comfort-\nfirst approach"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Maternity/mat-offer3.png",
      title: "Natural\nemotions and\nfamily moments"
    },
    {
      id: 4,
      icon: "/asset/ServicePages/Maternity/mat-offer4.png",
      title: "Soft, Timeless\nvisual style"
    },
    {
      id: 5,
      icon: "/asset/ServicePages/Maternity/mat-offer5.png",
      title: "Patient and\nexperienced\nphotographers"
    },
    {
      id: 6,
      icon: "/asset/ServicePages/Maternity/mat-offer6.png",
      title: "Professionally\nedited, high-\nresolution images"
    }
  ];

  return (
    <ServiceOffersSection 
      title="What We Offer"
      items={MaternityOffers}
      showPagination={true}
      autoScroll={true}
      scrollInterval={3000}
    />
  );
};

export default MaternityWhatWeOffer;
