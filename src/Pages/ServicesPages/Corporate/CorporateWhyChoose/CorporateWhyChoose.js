import React from 'react';
import ServiceWhyChoose from '../../Shared/ServiceWhyChoose/ServiceWhyChoose';

const CorporateWhyChoose = () => {
  const whyItems = [
    {
      id: 1,
      icon: "/asset/ServicePages/Corporate/Corporate-why1.png",
      text: "GST\nInvoices"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Corporate/Corporate-why2.png",
      text: "Linkedin & Press Ready Content"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Corporate/Corporate-why3.png",
      text: "Escrow-Secured\nPayments"
    }
  ];

  return (
    <ServiceWhyChoose 
      title="Why Veroa ?" 
      items={whyItems} 
    />
  );
};

export default CorporateWhyChoose;
