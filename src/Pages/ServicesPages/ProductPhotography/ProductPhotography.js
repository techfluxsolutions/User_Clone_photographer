import ProductCostInfluencing from './ProductCostInfluencing/ProductCostInfluencing';
import ProductCTA from './ProductCTA/ProductCTA';
import ProductFAQ from './ProductFAQ/ProductFAQ';
import ProductHeroSection from './ProductHeroSection/ProductHeroSection';
import ProductPersonalizedQuote from './ProductPersonalizedQuote/ProductPersonalizedQuote';
// import ProductPricing from './ProductPricing/ProductPricing';
import ProductTestimonials from './ProductTestimonials/ProductTestimonials';
import ProductWhatWeOffer from './ProductWhatWeOffer/ProductWhatWeOffer';
import ProductWhatYouGet from './ProductWhatYouGet/ProductWhatYouGet';
import ProductWhyChoose from './ProductWhyChoose/ProductWhyChoose';
import ProductGallery from './ProductGallery/ProductGallery';


const ProductPhotography = ({ serviceData }) => {
  // Define default service data if not provided
  const defaultServiceData = {
    _id: "product-service",
    serviceName: "Clean, Professional Photography"
  };

  const currentServiceData = serviceData || defaultServiceData;

  return (
    <div className="product-page">
      {/* <WeddingHeroSection serviceData={serviceData}/> */}
      <ProductHeroSection serviceData={currentServiceData} />
      <ProductWhatWeOffer />
      <ProductWhatYouGet />
      <ProductWhyChoose />
      {/* <ProductPricing serviceData={currentServiceData}/> */}
      <ProductCostInfluencing />
      <ProductPersonalizedQuote serviceData={currentServiceData} />
      <ProductGallery />
      <ProductTestimonials />
      <ProductFAQ />
      <ProductCTA serviceData={currentServiceData} />
    </div>
  )
}

export default ProductPhotography