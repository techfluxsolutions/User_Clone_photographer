import CorporateCostInfluencing from "./CorporateCostInfluencing/CorporateCostInfluencing";
import CorporateCTA from "./CorporateCTA/CorporateCTA";
import CorporateFAQ from "./CorporateFAQ/CorporateFAQ";
import CorporatePersonalizedQuote from "./CorporatePersonalizedQuote/CorporatePersonalizedQuote";
import CorporateSectionHeroSection from "./CorporateSectionHeroSection/CorporateSectionHeroSection";
import CorporateTestimonials from "./CorporateTestimonials/CorporateTestimonials";
import CorporateWhatWeOffer from "./CorporateWhatWeOffer/CorporateWhatWeOffer";
import CorporateWhatYouGet from "./CorporateWhatYouGet/CorporateWhatYouGet";
import CorporateWhyChoose from "./CorporateWhyChoose/CorporateWhyChoose";
import CorporateGallery from './CorporateGallery/CorporateGallery';


const Corporate = ({ serviceData }) => {
  if (!serviceData) return null;

  return (
    <div className="corporate-page">
      <CorporateSectionHeroSection serviceData={serviceData} />
      <CorporateWhatWeOffer />
      <CorporateWhatYouGet />
      <CorporateWhyChoose />
      <CorporateCostInfluencing />
      <CorporatePersonalizedQuote serviceData={serviceData} />
      <CorporateGallery />
      <CorporateTestimonials />
      <CorporateFAQ />
      <CorporateCTA serviceData={serviceData} />
    </div>
  )
}

export default Corporate