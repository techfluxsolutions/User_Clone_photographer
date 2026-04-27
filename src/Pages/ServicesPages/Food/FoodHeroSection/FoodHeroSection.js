import { useNavigate } from "react-router-dom";
import "./FoodHeroSection.css";

const FoodHeroSection = ({ serviceData }) => {
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
      navigate("/personalizedBudgetPage");
    }
  };

  return (
    <div
      className="food-hero"
      style={{ backgroundImage: "url(/asset/ServicePages/Food/food-herobg.jpg)" }}
    >
      <div className="food-content">
        <h1 className="food-title">
          Professional Food<br />Photography
        </h1>

        <p className="food-subtitle">
          for Restaurants, Brands,<br />and Delivery Platforms
        </p>

        <div className="food-buttons">
          <button
            className="food-btn food-btn-quote"
            onClick={handleGetQuote}
          >
            Get a Food<br />Shoot Quote
          </button>

          <button className="food-btn food-btn-contact" onClick={() => navigate("/contact-us")}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodHeroSection;

