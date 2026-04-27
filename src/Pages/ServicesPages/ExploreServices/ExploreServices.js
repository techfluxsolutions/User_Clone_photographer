// import React, { useState, useEffect } from 'react';
// import './ExploreServices.css';

// const ExploreServices = () => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     const services = [
//         { title: "Wedding", folder: "ExploreServices", images: ["Wed1.png", "Wed2.png", "Wed3.png", "Wed4.png"] },
//         { title: "Maternity", folder: "ExploreServices", images: ["Mat1.png", "Mat2.png", "Mat3.png", "Mat4.png"] },
//         { title: "Event", folder: "ExploreServices", images: ["Event1.png", "Event2.png", "Event3.png", "Event4.png"] },
//         { title: "Fashion", folder: "ExploreServices", images: ["Fashion1.png", "Fashion2.png", "Fashion3.png", "Fashion4.png"] },
//         { title: "Corporate", folder: "ExploreServices", images: ["Corp1.png", "Corp2.png", "Corp3.png", "Corp4.png"] },
//         { title: "Sports", folder: "ExploreServices", images: ["Sport1.png", "Sport2.png", "Sport3.png", "Sport4.png"] },
//         { title: "Automobile", folder: "ExploreServices", images: ["Automobile1.png", "Automobile2.png", "Automobile3.png", "Automobile4.png"] },
//         { title: "Food", folder: "ExploreServices", images: ["Food1.png", "Food2.png", "Food3.png", "Food4.png"] },
//         { title: "Product", folder: "ExploreServices", images: ["Product1.png", "Product2.png", "Product3.png", "Product4.png"] },
//     ];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4);
//         }, 3000); // Change image every 3 seconds

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="explore-services-container">
//             <h2 className="explore-services-title">Explore Services</h2>
//             <div className="explore-services-grid">
//                 {services.map((service, index) => (
//                     <div key={index} className="explore-service-card">
//                         <div className="service-image-container">
//                             {service.images.map((image, imgIndex) => (
//                                 <img
//                                     key={imgIndex}
//                                     src={`/asset/ServicePages/${service.folder}/${image}`}
//                                     alt={`${service.title} Service ${imgIndex + 1}`}
//                                     className={`service-image ${imgIndex === currentImageIndex ? 'active' : ''}`}
//                                 />
//                             ))}
//                         </div>
//                         <h3 className="service-title">{service.title}</h3>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ExploreServices;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreServices.css";
import { getAllServices } from "../../../utils/APIs/servicesApis";
import Loader from "../../../Template/Loader/Loader";


/* ================================
   STATIC IMAGE CONFIG
================================ */

const serviceImageConfig = {
  "Wedding Photography": {
    folder: "ExploreServices",
    images: ["Wed1.png", "Wed2.png", "Wed3.png", "Wed4.png"],
  },
  "Maternity and Baby Shoot": {
    folder: "ExploreServices",
    images: ["Mat1.png", "Mat2.png", "Mat3.png", "Mat4.png"],
  },
  "Event Photography": {
    folder: "ExploreServices",
    images: ["Event1.png", "Event2.png", "Event3.png", "Event4.png"],
  },
  "Fashion Photography": {
    folder: "ExploreServices",
    images: ["Fashion1.png", "Fashion2.png", "Fashion3.png", "Fashion4.png"],
  },
  "Corporate Photography": {
    folder: "ExploreServices",
    images: ["Corp1.png", "Corp2.png", "Corp3.png", "Corp4.png"],
  },
  "Sports Photography": {
    folder: "ExploreServices",
    images: ["Sport1.png", "Sport2.png", "Sport3.png", "Sport4.png"],
  },
  "Automobile Photography": {
    folder: "ExploreServices",
    images: [
      "Automobile1.png",
      "Automobile2.png",
      "Automobile3.png",
      "Automobile4.png",
    ],
  },
  "Food Photography": {
    folder: "ExploreServices",
    images: ["Food1.png", "Food2.png", "Food3.png", "Food4.png"],
  },
  "Product Photography": {
    folder: "ExploreServices",
    images: ["Product1.png", "Product2.png", "Product3.png", "Product4.png"],
  },
};

const ExploreServices = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ================================
     FETCH SERVICES
  ================================ */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const res = await getAllServices();

        if (res?.data?.success) {
          setServices(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  /* ================================
     IMAGE ROTATION
  ================================ */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ================================
     LOADER UI
  ================================ */
  if (loading) return <Loader />;

  return (
    <div className="explore-services-container">
      <h2 className="explore-services-title">Explore Services</h2>

      <div className="explore-services-grid">
        {services.map((service) => {
          const uiData = serviceImageConfig[service.serviceName];

          if (!uiData) return null;

          return (
            <div
              key={service._id}
              className="explore-service-card"
             onClick={() => navigate(`/service/${service._id}`)}
            >
              <div className="service-image-container">
                {uiData.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`/asset/ServicePages/${uiData.folder}/${image}`}
                    alt={`${service.serviceName} ${imgIndex + 1}`}
                    className={`service-image ${
                      imgIndex === currentImageIndex ? "active" : ""
                    }`}
                  />
                ))}
              </div>

             <h3 className="service-title">
                {service.serviceName.replace("Photography", "").trim()}
                </h3>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreServices;
