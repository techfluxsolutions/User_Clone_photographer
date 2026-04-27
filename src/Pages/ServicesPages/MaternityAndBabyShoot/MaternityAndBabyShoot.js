import React from 'react';
import MaternityHero from "./MaternityHero/MaternityHero"
import MaternityWhatWeOffer from "./MaternityWhatWeOffer/MaternityWhatWeOffer";
import MaternityHowItWorks from "./MaternityHowItWorks/MaternityHowItWorks";
import MaternityWhyChoose from "./MaternityWhyChoose/MaternityWhyChoose";
import MaternityWhatYouGet from "./MaternityWhatYouGet/MaternityWhatYouGet";
import MaternityGallery from './MaternityGallery/MaternityGallery';
import MaternityComfortSection from "./MaternityComfortSection/MaternityComfortSection";
import MaternityCostInfluencing from "./MaternityCostInfluencing/MaternityCostInfluencing";
import MaternityPersonalizedQuote from "./MaternityPersonalizedQuote/MaternityPersonalizedQuote";
import MaternityTestimonials from "./MaternityTestimonials/MaternityTestimonials";
import MaternityFAQ from "./MaternityFAQ/MaternityFAQ";
import MaternityCTA from "./MaternityCTA/MaternityCTA";


const MaternityAndBabyShoot = ({ serviceData }) => {
  // Define default service data if not provided
  const defaultServiceData = {
    _id: "maternity-service",
    serviceName: "From Bump to Baby - Beautifully Captured"
  };

  const currentServiceData = serviceData || defaultServiceData;

  return (
    <div className="maternity-page">
      <MaternityHero serviceData={currentServiceData} />
      <MaternityWhatWeOffer />
      <MaternityWhatYouGet />
      <MaternityComfortSection />
      <MaternityHowItWorks />
      <MaternityWhyChoose />
      <MaternityCostInfluencing />
      <MaternityPersonalizedQuote serviceData={currentServiceData} />
      <MaternityGallery />
      <MaternityTestimonials />
      <MaternityFAQ />
      <MaternityCTA serviceData={currentServiceData} />
    </div>
  );
};

export default MaternityAndBabyShoot;
