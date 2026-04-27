// // import ServiceHomeHeroSection from "../../Shared/ServiceHomeHeroSection/ServiceHomeHeroSection";

// import ServiceHomeHeroSection from "../../Shared/ServiceHomeHeroSection/ServiceHomeHeroSection";


// const EventHomeHeroSection = () => {

//   const EVENT_HERO_DATA = {
//     titleText: "Every Moment Covered Seamlessly", // ✅ plain string
//     titleJSX: (
//       <span style={{ color: "var(--white-color)" }}>
//       Every Moment Covered <strong style={{ color: "var(--white-color)" }}>Seamlessly</strong>
//       </span>
//     ),
//     subtitle:
//       "From private gatherings to large scale events, Create photographic memory for lifetime",
//     backgroundImage: "/asset/ServicePages/Event/homeHeroBg.png",
//     quoteButtonText: "Get an Event Shoot Quote",
//     showContact: true,
//     manualServiceId: "event-service",
// };

//   return (
//    <ServiceHomeHeroSection
//   title={EVENT_HERO_DATA.titleJSX}          // 👈 for UI
//   serviceName={EVENT_HERO_DATA.titleText}  // 👈 for routing
//   subtitle={EVENT_HERO_DATA.subtitle}
//   backgroundImage={EVENT_HERO_DATA.backgroundImage}
//   quoteButtonText={EVENT_HERO_DATA.quoteButtonText}
//   showContact={EVENT_HERO_DATA.showContact}
//   manualServiceId={EVENT_HERO_DATA.manualServiceId}
// />

//   );
// };

// export default EventHomeHeroSection;



import { useNavigate } from "react-router-dom";
import "./EventHomeHeroSection.css";

const EventHomeHeroSection = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    if (serviceData) {
      navigate("/personalizedBudgetPage", {
        state: {
          serviceId: serviceData._id,
          serviceName: serviceData.serviceName,
        },
      });
    } else {
      navigate("/personalizedBudgetPage", {
        state: {
          serviceId: "event-service",
          serviceName: "Event Photography",
        },
      });
    }
  };

  return (
    <div
      className="automotive-hero"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/asset/ServicePages/Event/homeHeroBg.png)`,
      }}
    >
      <div className="automotive-overlay"></div>

      <div className="automotive-content">
        <h1 className="automotive-title" style={{ color: "white" }}>
          Every Moment Covered <strong>Seamlessly</strong>
        </h1>

        <p className="automotive-subtitle">
          From private gatherings to large scale events, Create photographic
          memory for lifetime
        </p>

        <div className="automotive-buttons">
          <button
            className="auto-btn auto-btn-quote"
            onClick={handleGetQuote}
          >
            Get an Event<br />Shoot Quote
          </button>

          <button
            className="auto-btn auto-btn-contact"
            onClick={() => navigate("/contact-us")}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventHomeHeroSection;