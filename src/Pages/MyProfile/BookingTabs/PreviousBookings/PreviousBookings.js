// import React, { useEffect, useState } from "react";
// import { LuCake } from "react-icons/lu";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "./../UpcomingBookings/UpcomingBookings.css";
// import Loader from "../../../../Template/Loader/Loader";
// import OutstandingAmountModal from "../OutstandingAmoutModal/OutstandingAmountModal";
// import { downloadInvoiceAPI, getAllPreviousBookings } from "../../../../utils/APIs/bookingApis";


// const PreviousBookings = () => {
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//     const [showOutstandingModal, setShowOutstandingModal] = useState(false);
//     const [outstandingAmount, setOutstandingAmount] = useState(0);
//     const [selectedBookingId, setSelectedBookingId] = useState(null);


//   /* =========================
//      FETCH UPCOMING BOOKINGS
//   ========================= */
//   useEffect(() => {
//     fetchUpcomingBookings();
//   }, []);

//   const handleDownloadInvoice = async (bookingId) => {
//   try {
//     const res = await downloadInvoiceAPI(bookingId);

//     const blob = new Blob([res.data], { type: "application/pdf" });
//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `invoice-${bookingId}.pdf`;

//     document.body.appendChild(link);
//     link.click();

//     link.remove();
//     window.URL.revokeObjectURL(url);
//   } catch (err) {
//     console.error("Invoice download failed", err);
//     alert("Failed to download invoice");
//   }
// };

//   const fetchUpcomingBookings = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllPreviousBookings();

//       // ✅ API response: { success: true, data: [] }
//       const apiBookings = response?.data?.data;

//       setBookings(Array.isArray(apiBookings) ? apiBookings : []);
//     } catch (error) {
//       console.error("Upcoming bookings error:", error);
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      NAVIGATION
//   ========================= */
//   const handleViewDetails = (bookingId) => {
//     navigate(`/bookingDetails/${bookingId}`);
//   };

//   // const handleModifyBooking = (bookingId) => {
//   //   navigate("/modifyBooking", { state: { bookingId } });
//   // };

//   const capitalizeFirstLetter = (text = "") =>
//   text.charAt(0).toUpperCase() + text.slice(1);

//   /* =========================
//      DATE FORMATTER
//   ========================= */
//   const formatDate = (date) => {
//     if (!date) return "";
//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const getDayFromDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-IN", {
//     weekday: "long",
//   });
// };

//   /* =========================
//      LOADER
//   ========================= */
//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="booking-list">
//       {bookings.length === 0 ? (
//         <p className="no-data">No upcoming bookings found</p>
//       ) : (
//         bookings.map((booking) => (
//           <div className="booking-card" key={booking._id}>
//             <div className="booking-left">
//               <h3 className="booking-title-upcoming">
//                 <LuCake className="cake-icon" />
//                 {booking.service_id?.serviceName || "Service"}
//               </h3>

//               <p className="booking-date">
//                 {formatDate(booking.bookingDate)} &nbsp;
//                 <span className="booking-day">
//                   {getDayFromDate(booking.bookingDate)}
//                 </span>
//               </p>


//               <div className="booking-rating">
//                 <span className="rating-label">Ratings</span>
//                 {/* <div className="stars">
//                   {[...Array(5)].map((_, index) => (
//                     <FaStar key={index} />
//                   ))}
//                 </div> */}
//                 <div className="stars">
//                               {[...Array(5)].map((_, index) => {
//                                 const rating = booking.ratingsGivenByClient || 0;

//                                 if (rating >= index + 1) {
//                                   // Full star
//                                   return <FaStar key={index} />;
//                                 } else if (rating >= index + 0.5) {
//                                   // Half star
//                                   return <FaStarHalfAlt key={index} />;
//                                 } else {
//                                   // Empty star
//                                   return <FaRegStar key={index} />;
//                                 }
//                               })}
//                             </div>

//               </div>

//               <div className="booking-actions">
//                 {/* <button
//                   className="modify-btn"
//                   onClick={() => handleModifyBooking(booking._id)}
//                 >
//                   Modify
//                 </button> */}

//                 <button
//                   className="view-details"
//                   onClick={() => handleViewDetails(booking._id)}
//                 >
//                   View Details
//                 </button>


//               </div>
//             </div>

//             <div className="booking-right">
//               <span className={`status ${booking.status}`}>{capitalizeFirstLetter(booking.status)}</span>
//               <p className="amount">Rs. {booking.totalAmount}/-</p>
//              <button
//             className="Pay-Outstanding_Amount"
//             onClick={() => handleDownloadInvoice(booking._id)}
//           >
//             Download Invoice
//           </button>



//             </div>
//           </div>
//         ))
//       )}
//       <OutstandingAmountModal
//         show={showOutstandingModal}
//         bookingId={selectedBookingId}
//         outstandingAmount={outstandingAmount}
//         onClose={() => setShowOutstandingModal(false)}
//         onSuccess={() => {
//           setShowOutstandingModal(false);
//           fetchUpcomingBookings(); // refresh list
//         }}
//       />


//     </div>
//   );
// };

// export default PreviousBookings;


import React, { useEffect, useState } from "react";
// import { LuCake } from "react-icons/lu";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./../UpcomingBookings/UpcomingBookings.css";
import Loader from "../../../../Template/Loader/Loader";
import { downloadInvoiceAPI, getAllPreviousBookings } from "../../../../utils/APIs/bookingApis";

const PreviousBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH PREVIOUS BOOKINGS
  ========================= */
  useEffect(() => {
    fetchPreviousBookings();
  }, []);

  const fetchPreviousBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllPreviousBookings();
      const apiBookings = response?.data?.data;
      setBookings(Array.isArray(apiBookings) ? apiBookings : []);
    } catch (error) {
      console.error("Previous bookings error:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (bookingId) => {
    try {
      const res = await downloadInvoiceAPI(bookingId);

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${bookingId}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Invoice download failed", err);
      alert("Failed to download invoice");
    }
  };

  /* =========================
     NAVIGATION
  ========================= */

      const handleChatNow = (bookingId) => {
 navigate(`/bookingChat/${bookingId}`)
};
const handleGalleryNow = (booking) => {
  console.log("booking GALLERY",booking)
  navigate(
    `/bookingDetails/${booking._id}?tab=gallery`,
    {
      state: {
        photographerId: booking.photographer_id,
        clientId: booking.client_id,
      },
    }
  );
};
  const handleViewDetails = (bookingId) => {
    navigate(`/bookingDetails/${bookingId}`);
  };

  const capitalizeFirstLetter = (text = "") =>
    text.charAt(0).toUpperCase() + text.slice(1);

  /* =========================
     DATE FORMATTERS
  ========================= */
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDayFromDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
    });
  };

  /* =========================
     LOADER
  ========================= */
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="booking-list">
      {bookings.length === 0 ? (
        <p className="no-data">No previous bookings found</p>
      ) : (
        bookings.map((booking) => (
          <div className="booking-card" key={booking._id}>
            <div className="booking-left">
              <h3 className="booking-title-upcoming">
                {/* <LuCake className="cake-icon" /> */}
                {booking.service_id?.serviceName || "Service"}
              </h3>

              <p className="booking-date">
                {formatDate(booking.bookingDate)} &nbsp;
                <span className="booking-day">
                  {getDayFromDate(booking.bookingDate)}
                </span>
              </p>

              {booking.status === "completed" && (
                <div className="booking-rating">
                  <span className="rating-label">Ratings</span>

                  <div className="stars">
                    {[...Array(5)].map((_, index) => {
                      const rating =
                        booking.ratingsGivenByClient || 0;

                      if (rating >= index + 1) {
                        return <FaStar key={index} />;
                      }
                      else if (rating >= index + 0.5) {
                        return <FaStarHalfAlt key={index} />;
                      }
                      else {
                        return <FaRegStar key={index} />;
                      }
                    })}
                  </div>
                </div>
              )}
              {/* <div className="booking-actions">
                <button
                  className="view-details"
                  onClick={() => handleViewDetails(booking._id)}
                >
                  View Details
                </button>
              </div> */}
               <div className="booking-actions">

                  

                <button
                  className="modify-btn"
                  onClick={() => handleChatNow(booking._id)}
                >
                  Chat Now
                </button>
              


                 {/* <div className="booking-actions"> */}
                  <button
                  className="modify-btn"
                  onClick={() => handleGalleryNow(booking)}
                >
                  Gallery
                </button>

                  <button
                  className="view-details"
                  onClick={() => handleViewDetails(booking._id)}
                >
                  View Details
                </button>

               
                 {/* </div> */}
                 </div>

                 
            </div>

            <div className="booking-right">
              <span className={`status ${booking.status}`}>
                {capitalizeFirstLetter(booking.status)}
              </span>
              <p className="amount">Rs. {booking.totalAmount}/-</p>
              <button
                className="Pay-Outstanding_Amount"
                onClick={() => handleDownloadInvoice(booking._id)}
              >
                Download Invoice
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PreviousBookings;