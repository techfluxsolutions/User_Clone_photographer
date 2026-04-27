import EventCapturedByEveryMomentSection from "./EventCapturedByEveryMomentSection/EventCapturedByEveryMomentSection"
import EventCTASection from "./EventCTASection/EventCTASection"
import EventFAQsSection from "./EventFAQsSection/EventFAQsSection"
import EventFinalCostInfluencedBySection from "./EventFinalCostInfluencedBySection/EventFinalCostInfluencedBySection"
import EventHomeHeroSection from "./EventHomeHeroSection/EventHomeHeroSection"
import EventTestinomialSection from "./EventTestinomialSection/EventTestinomialSection"
import EventWhatWeOfferSection from "./EventWhatWeOfferSection/EventWhatWeOfferSection"
import EventWhatYouGetSection from "./EventWhatYouGetSection/EventWhatYouGetSection"
import EventWhyVeroaSection from "./EventWhyVeroaSection/EventWhyVeroaSection"
import EventGallery from './EventGallery/EventGallery';


const Event = ({serviceData}) => {
  const defaultServiceData = {
    _id: "event-service",
    serviceName: "Every Moment Covered Seamlessly"
  };
    const currentServiceData = serviceData || defaultServiceData;

  console.log("Eventservicedata", serviceData)

  return (
    <div className="event-page">
      <EventHomeHeroSection serviceData={currentServiceData} />
      <EventWhatWeOfferSection />
      <EventWhatYouGetSection />
      <EventWhyVeroaSection />
      <EventFinalCostInfluencedBySection />
      <EventCapturedByEveryMomentSection serviceData={serviceData} />
      <EventGallery />
      <EventTestinomialSection />
      <EventFAQsSection />
      <EventCTASection serviceData={serviceData} />
    </div>
  )
}

export default Event