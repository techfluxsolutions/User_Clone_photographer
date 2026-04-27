// import { useEffect, useState } from 'react';
// import './FashionHeroSection.css';

// const FashionHeroSection = ({ serviceData }) => {
//   const [currentBg, setCurrentBg] = useState(0);
  
//   const backgrounds = [
//     `${process.env.PUBLIC_URL}/asset/ServicePages/Fashion/fashion-hero1.png`,
//     `${process.env.PUBLIC_URL}/asset/ServicePages/Fashion/fashion-hero2.png`,
//     `${process.env.PUBLIC_URL}/asset/ServicePages/Fashion/fashion-hero3.png`
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBg((prev) => (prev + 1) % 3);
//     }, 5000); // Change every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="fashion-hero-section">
//       <div className="fashion-hero-content">
//         <div className="fashion-hero-text">
//           <h1 className="fashion-hero-title">
//             Creative Fashion<br />
//             Photography
//           </h1>
//           <h2 className="fashion-hero-subtitle">
//             for Brands, Designers, and<br />
//             Portfolios
//           </h2>
//           <p className="fashion-hero-description">
//             Styled with intention. Shot with precision.<br />
//             Delivered seamlessly.
//           </p>
//           <div className="fashion-hero-buttons">
//             <button className="fashion-hero-btn primary">
//               Get a Fashion<br />
//               Shoot Quote
//             </button>
//             <button className="fashion-hero-btn secondary">
//               Contact Us
//             </button>
//           </div>
//         </div>
//         <div 
//           className="fashion-hero-image"
//           style={{ backgroundImage: `url(${backgrounds[currentBg]})` }}
//         >
//           {/* Model image */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FashionHeroSection;




import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FashionHeroSection.css';

const FashionHeroSection = ({ serviceData }) => {
  const [currentBg, setCurrentBg] = useState(0);
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
  const backgrounds = [
    `${process.env.PUBLIC_URL}/asset/ServicePages/Fashion/fashion-hero11.png`,
    `${process.env.PUBLIC_URL}/asset/ServicePages/Fashion/fashion-hero22.png`,
    `${process.env.PUBLIC_URL}/asset/ServicePages/Fashion/fashion-hero33.png`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % 3);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fashion-hero-section">
      <div className="fashion-hero-content">
        <div className="fashion-hero-text">
          <h1 className="fashion-hero-title">
            Creative Fashion<br />
            Photography
          </h1>
          <h2 className="fashion-hero-subtitle">
            for Brands, Designers, and<br />
            Portfolios
          </h2>
          <p className="fashion-hero-description">
            Styled with intention. Shot with precision.<br />
            Delivered seamlessly.
          </p>
          <div className="fashion-hero-buttons">
            <button className="fashion-hero-btn primary"  onClick={handleGetQuote}>
              Get a Fashion<br />
              Shoot Quote
            </button>
            <button className="fashion-hero-btn secondary" onClick={() => navigate("/contact-us")}>
              Contact Us
            </button>
          </div>
        </div>
        <div 
          className="fashion-hero-image"
          style={{ backgroundImage: `url(${backgrounds[currentBg]})` }}
        >
          {/* Model image */}
        </div>
      </div>
    </div>
  );
};

export default FashionHeroSection;
