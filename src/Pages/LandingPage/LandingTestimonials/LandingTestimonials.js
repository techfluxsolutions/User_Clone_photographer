// import React from 'react';
// import TestimonialsSection from '../../ServicesPages/Shared/TestimonialsSection/TestimonialsSection';

// const LandingTestimonials = () => {
//   const testimonials = [
//     {
//       name: 'Richa K.',
//       image: `${process.env.PUBLIC_URL}/asset/landing-page/pic1.png`,
//       rating: 5,
//       text: 'Very professional service and smooth process. The photos were delivered on time and the quality was excellent. Definitely booking again for future events.'
//     },
//     {
//       name: 'Sushant',
//       image: `${process.env.PUBLIC_URL}/asset/landing-page/pic2.png`,
//       rating: 5,
//       text: 'Very professional service and smooth process. The photos were delivered on time and the quality was excellent. Definitely booking again for future events.'
//     },
//     {
//       name: 'Tanya Mathur',
//       image: `${process.env.PUBLIC_URL}/asset/landing-page/pic3.png`,
//       rating: 5,
//       text: 'Wonderful experience from start to finish. The photographer was very patient with our child and the photos turned out beautiful. Highly recommended for birthday photoshoots.'
//     }
//   ];

//   return <TestimonialsSection testimonials={testimonials} />;
// };

// export default LandingTestimonials;



// import React, { useState, useEffect } from "react";
// import "../../ServicesPages/Shared/TestimonialsSection/TestimonialsSection.css";

// const LandingTestimonials = () => {
//   const testimonials = [
//     {
//       name: "Richa K.",
//       image: `${process.env.PUBLIC_URL}/asset/landing-page/pic1.png`,
//       rating: 5,
//       text: "Very professional service and smooth process. The photos were delivered on time and the quality was excellent. Definitely booking again for future events.",
//     },
//     {
//       name: "Sushant",
//       image: `${process.env.PUBLIC_URL}/asset/landing-page/pic2.png`,
//       rating: 5,
//       text: "Very professional service and smooth process. The photos were delivered on time and the quality was excellent. Definitely booking again for future events.",
//     },
//     {
//       name: "Tanya Mathur",
//       image: `${process.env.PUBLIC_URL}/asset/landing-page/pic3.png`,
//       rating: 5,
//       text: "Wonderful experience from start to finish. The photographer was very patient with our child and the photos turned out beautiful. Highly recommended for birthday photoshoots.",
//     },
//   ];

//   const [displayTestimonials, setDisplayTestimonials] = useState(testimonials);
//   const [activeTestimonial, setActiveTestimonial] = useState(null);

//   useEffect(() => {
//     if (activeTestimonial) return;

//     const interval = setInterval(() => {
//       setDisplayTestimonials((prev) => {
//         const arr = [...prev];
//         arr.push(arr.shift());
//         return arr;
//       });
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [activeTestimonial]);

//   return (
//     <>
//       <section className="testimonials-section">
//         <h2 className="testimonials-heading">TESTIMONIALS</h2>

//         <div className="testimonials-content">
//           <div className="testimonials-grid">
//             {displayTestimonials.map((testimonial, index) => (
//               <div key={index} className="testimonial-card">
//                 <div className="testimonial-avatar">
//                   <img src={testimonial.image} alt={testimonial.name} />
//                 </div>

//                 <h3 className="testimonial-name">{testimonial.name}</h3>

//                 <div className="testimonial-stars">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <span key={i} className="star">
//                       ★
//                     </span>
//                   ))}
//                 </div>

//                 <p className="testimonial-text">{testimonial.text}</p>

//                 <button
//                   className="read-more"
//                   onClick={() => setActiveTestimonial(testimonial)}
//                 >
//                   Read more
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* POPUP MODAL */}
//       {activeTestimonial && (
//         <div
//           className="testimonial-modal-overlay"
//           onClick={() => setActiveTestimonial(null)}
//         >
//           <div
//             className="testimonial-modal-content"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="testimonial-modal-card">
//               <div className="testimonial-avatar">
//                 <img
//                   src={activeTestimonial.image}
//                   alt={activeTestimonial.name}
//                 />
//               </div>

//               <h3 className="testimonial-name">
//                 {activeTestimonial.name}
//               </h3>

//               <div className="testimonial-stars">
//                 {[...Array(activeTestimonial.rating)].map((_, i) => (
//                   <span key={i} className="star">
//                     ★
//                   </span>
//                 ))}
//               </div>

//               <p className="testimonial-text full-text">
//                 {activeTestimonial.text}
//               </p>

//               <button
//                 className="modal-close"
//                 onClick={() => setActiveTestimonial(null)}
//               >
//                 ✕
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LandingTestimonials;




import React, { useState, useEffect } from "react";
import "../../ServicesPages/Shared/TestimonialsSection/TestimonialsSection.css";
import { getLandingPageTestimonial } from "../../../utils/APIs/testimonialApis";
import Loader from "../../../Template/Loader/Loader";
import { useOutletContext } from "react-router-dom";

const LandingTestimonials = () => {
  // const [testimonials, setTestimonials] = useState([]);
  const [displayTestimonials, setDisplayTestimonials] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);
  const outletContext = useOutletContext() || {};
const setPageError = outletContext.setPageError;

  // ⭐ Render Stars (ratingCount / 2)
  // const renderStars = (ratingCount) => {
  //   const rating = (ratingCount || 0) / 2;

  //   return [...Array(5)].map((_, index) => {
  //     if (index + 1 <= Math.floor(rating)) {
  //       return (
  //         <span key={index} className="star filled">
  //           ★
  //         </span>
  //       );
  //     }

  //     if (index < rating) {
  //       return (
  //         <span key={index} className="star half">
  //           ★
  //         </span>
  //       );
  //     }

  //     return (
  //       <span key={index} className="star empty">
  //         ★
  //       </span>
  //     );
  //   });
  // };


  const renderStars = (ratingCount) => {
  const rating = Math.round(((ratingCount || 0) / 2) * 2) / 2;

  return [...Array(5)].map((_, index) => {
    if (index + 1 <= Math.floor(rating)) {
      return (
        <span key={index} className="star filled">
          ★
        </span>
      );
    }

    if (index < rating) {
      return (
        <span key={index} className="star half">
          ★
        </span>
      );
    }

    return (
      <span key={index} className="star empty">
        ★
      </span>
    );
  });
};


  // 🔹 Fetch Testimonials API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await getLandingPageTestimonial();

      if (res?.data?.success) {
        const formattedData = res.data.data.map((item) => ({
          name: item.username || "User",
          image:
            item.avatar ||
            `${process.env.PUBLIC_URL}/asset/landing-page/pic1.png`,
          rating: item.ratingCount || 0,
          text: item.rateComments || "",
        }));

        // setTestimonials(formattedData);
        setDisplayTestimonials(formattedData);
      }
    } catch (error) {
      console.log("Testimonials API Error", error);
           console.log("Testimonials API Error", error);

  if (typeof setPageError === "function") {
    setPageError(true);
  }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 Rotation Logic
  useEffect(() => {
    if (activeTestimonial || displayTestimonials.length === 0) return;

    const interval = setInterval(() => {
      setDisplayTestimonials((prev) => {
        const arr = [...prev];
        arr.push(arr.shift());
        return arr;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [activeTestimonial, displayTestimonials]);

  if (loading) return <Loader />;

  return (
    <>
      <section className="testimonials-section">
        <h2 className="testimonials-heading">What Our Clients Say</h2>

        <div className="testimonials-content">
          <div className="testimonials-grid">
            {displayTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>

                <h3 className="testimonial-name">{testimonial.name}</h3>

                <div className="testimonial-stars">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="testimonial-text">{testimonial.text}</p>

                <button
                  className="read-more"
                  onClick={() => setActiveTestimonial(testimonial)}
                >
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPUP MODAL */}
      {activeTestimonial && (
        <div
          className="testimonial-modal-overlay"
          onClick={() => setActiveTestimonial(null)}
        >
          <div
            className="testimonial-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="testimonial-modal-card">
              <div className="testimonial-avatar">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                />
              </div>

              <h3 className="testimonial-name">
                {activeTestimonial.name}
              </h3>

              <div className="testimonial-stars">
                {renderStars(activeTestimonial.rating)}
              </div>

              <p className="testimonial-text full-text">
                {activeTestimonial.text}
              </p>

              <button
                className="modal-close"
                onClick={() => setActiveTestimonial(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingTestimonials;