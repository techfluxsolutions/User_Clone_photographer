// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./ServicePricingSection.css";

// const ServicePricingSection = ({ serviceData }) => {
//   const navigate = useNavigate();

//   // console.log("ServicePricingSection serviceData:", serviceData);

//   // Mock data for display if serviceData is missing (for UI testing)
//   const mockServiceData = {
//     _id: "mock_id",
//     additionalServices: [
//         { _id: "1", serviceType: "Basic", serviceCost: "1,999" },
//         { _id: "2", serviceType: "Standard", serviceCost: "5,999" },
//         { _id: "3", serviceType: "Premium", serviceCost: "8,999" }
//     ]
//   };

//   // Use mock data if serviceData is missing or has no additionalServices
//   const effectiveServiceData = (serviceData && serviceData.additionalServices && serviceData.additionalServices.length > 0) 
//     ? serviceData 
//     : mockServiceData;

//   const staticFeatures = [
//     "1–1.5 hours photoshoot",
//     "Cake cutting and family moments",
//     "Professionally edited digital photos",
//     "High-resolution online delivery",
//   ];

//   // Define the desired order for pricing plans
//   const planOrder = { 'basic': 1, 'standard': 2, 'premium': 3 };

//   const pricingPlans = (effectiveServiceData.additionalServices || [])
//     .map((item) => ({
//       title: item.serviceType.toUpperCase(),
//       features: staticFeatures,
//       price: `₹${item.serviceCost}/-`,
//       amount: Number(item.serviceCost),
//       isPopular: item.serviceType === "Standard",
//       mainServiceId: effectiveServiceData._id,
//       additionalServiceId: item._id,
//       sortOrder: planOrder[item.serviceType.toLowerCase()] || 999,
//     }))
//     .sort((a, b) => a.sortOrder - b.sortOrder);

//   const handleNavigate = (plan) => {
//     navigate("/calenderBooking", {
//       state: {
//         mainServiceId: plan.mainServiceId,
//         additionalServiceId: plan.additionalServiceId,
//         price: plan.amount,
//       },
//     });
//   };

//   return (
//     <div className="service-pricing-section">
//       <h1 className="pricing-main-title">Pricing</h1>

//       <div className="pricing-container">
//         {pricingPlans.map((plan, index) => (
//           <div key={index} className="pricing-card">
//             {plan.isPopular && (
//               <div className="popular-badge">Recommended</div>
//             )}

//             <h3 className="plan-title">{plan.title}</h3>

//             <ul className="plan-features">
//               {plan.features.map((feature, i) => (
//                 <li key={i}>{feature}</li>
//               ))}
//             </ul>

//             <button
//               className="price-btn"
//               onClick={() => handleNavigate(plan)}
//             >
//               {plan.price}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServicePricingSection;




import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServicePricingSection.css";

const ServicePricingSection = ({ serviceData }) => {
  const navigate = useNavigate();

  // 🚫 No service data → no UI
  if (!serviceData) return null;

  // 🚫 No additional services → no pricing section
  if (
    !Array.isArray(serviceData.additionalServices) ||
    serviceData.additionalServices.length === 0
  ) {
    return null;
  }

  const staticFeatures = [
    "1–1.5 hours photoshoot",
    "Cake cutting and family moments",
    "Professionally edited digital photos",
    "High-resolution online delivery",
  ];

  const pricingPlans = serviceData.additionalServices.map((item) => {
    const serviceType = item.serviceType || item.type;
    const rawCost = item.serviceCost || item.cost;

    // 🚫 Skip invalid items (extra safety)
    if (!serviceType || !rawCost || !item._id) return null;

    return {
      title: serviceType.toUpperCase(),
      features: staticFeatures,
      price: `₹${rawCost}/-`,
      amount: Number(String(rawCost).replace(/,/g, "")),
      isPopular: serviceType === "Standard",

      // ✅ REAL backend IDs only
      mainServiceId: serviceData._id,
      mainServiceName: serviceData.serviceName,
      additionalServiceId: item._id,
      sortOrder: { 'basic': 1, 'standard': 2, 'premium': 3 }[(serviceType || '').toLowerCase()] || 99,
    };
  }).filter(Boolean).sort((a, b) => a.sortOrder - b.sortOrder);

  // 🚫 Nothing valid → hide section
  if (pricingPlans.length === 0) return null;

  const handleNavigate = (plan) => {
    navigate("/calenderBooking", {
      state: {
        mainServiceId: plan.mainServiceId,
        mainServiceName: plan.mainServiceName,
        additionalServiceId: plan.additionalServiceId,
        price: plan.amount,
      },
    });
  };

  return (
    <div className="service-pricing-section">
      <h1 className="pricing-main-title">Pricing</h1>

      <div className="pricing-container">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="pricing-card">
            {plan.isPopular && (
              <div className="popular-badge">Recommended</div>
            )}

            <h3 className="plan-title">{plan.title}</h3>

            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <button
              className="price-btn"
              onClick={() => handleNavigate(plan)}
            >
              {plan.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePricingSection;
