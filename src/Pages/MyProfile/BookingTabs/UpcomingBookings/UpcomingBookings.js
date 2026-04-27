// import React from "react";
// import { LuCake } from "react-icons/lu";
// import { FaStar } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import "./UpcomingBookings.css";

// const UpcomingBookings = () => {
//   const navigate = useNavigate();

//   const bookings = [
//     {
//       id: 1,
//       title: "Birthday Event",
//       date: "15 Dec, 2025",
//       day: "Monday",
//       rating: 5,
//       status: "Completed",
//       amount: "Rs. 7,000/-",
//     },
//     {
//       id: 2,
//       title: "Birthday Event",
//       date: "15 Dec, 2025",
//       day: "Monday",
//       rating: 5,
//       status: "Completed",
//       amount: "Rs. 7,000/-",
//     },
//     {
//       id: 3,
//       title: "Birthday Event",
//       date: "15 Dec, 2025",
//       day: "Monday",
//       rating: 4,
//       status: "Completed",
//       amount: "Rs. 7,000/-",
//     },
//   ];

//   const handleViewDetails = (bookingId) => {
//     navigate("/bookingDetails", { state: { bookingId } });
//   };
//  const handleModifyBooking = (bookingId) => {
//     navigate("/modifyBooking" , {state: {bookingId}})
//   }

//   return (
//     <div className="booking-list">
//       {bookings.map((booking) => (
//         <div className="booking-card" key={booking.id}>
//           <div className="booking-left">
//             <h3 className="booking-title-upcoming">
//               <LuCake className="cake-icon" />
//               {booking.title}
//             </h3>

//             <p className="booking-date">
//               {booking.date} &nbsp; <span>{booking.day}</span>
//             </p>

//             <div className="booking-rating">
//               <span className="rating-label">Ratings</span>
//               <div className="stars">
//                 {[...Array(booking.rating)].map((_, index) => (
//                   <FaStar key={index} />
//                 ))}
//               </div>
//             </div>

//            <div className="booking-actions" >
//               <button className="modify-btn" onClick={() => handleModifyBooking(booking.id)}>Modify</button>

//               <button
//                 className="view-details"
//                 onClick={() => handleViewDetails(booking.id)}
//               >
//                 View Details
//               </button>
//             </div>

//           </div>

//           <div className="booking-right">
//             <span className="status completed">{booking.status}</span>
//             <p className="amount">{booking.amount}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UpcomingBookings;



import React, { useEffect, useState } from "react";
// import { LuCake } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./UpcomingBookings.css";
import Loader from "../../../../Template/Loader/Loader";
import { getAllUpcomingBookings } from "../../../../utils/APIs/bookingApis";
import OutstandingAmountModal from "../OutstandingAmoutModal/OutstandingAmountModal";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const UpcomingBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOutstandingModal, setShowOutstandingModal] = useState(false);
  const [outstandingAmount, setOutstandingAmount] = useState(0);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const STATUS_FLOW = ["pending", "confirmed", "completed", "canceled"];


  /* =========================
     FETCH UPCOMING BOOKINGS
  ========================= */
  useEffect(() => {
    fetchUpcomingBookings();
  }, []);

  const fetchUpcomingBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllUpcomingBookings();

      // ✅ API response: { success: true, data: [] }
      const apiBookings = response?.data?.data;

      setBookings(Array.isArray(apiBookings) ? apiBookings : []);
    } catch (error) {
      console.error("Upcoming bookings error:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     NAVIGATION
  ========================= */
  const handleViewDetails = (bookingId) => {
    navigate(`/bookingDetails/${bookingId}`);
  };

  const handleChatNow = (bookingId) => {
    navigate(`/bookingChat/${bookingId}`)
  };

  //  const handleGalleryNow = (bookingId) => {
  //   navigate(`/bookingDetails/${bookingId}?tab=gallery`);
  // };

  const handleGalleryNow = (booking) => {
    console.log("booking GALLERY", booking)
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

  const capitalizeFirstLetter = (text = "") =>
    text.charAt(0).toUpperCase() + text.slice(1);

  /* =========================
     DATE FORMATTER
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
        <p className="no-data">No upcoming bookings found</p>
      ) : (
        bookings.map((booking) => (

          <div className="booking-card" key={booking._id}>
            <div className="booking-left">
              <h3 className="booking-title-upcoming">
                {/* <LuCake className="cake-icon" /> */}
                {booking.service_id?.serviceName || "Service"}
              </h3>

              <p className="booking-date">
                {formatDate(booking.startDate)} &nbsp;
                <span className="booking-day">
                  {getDayFromDate(booking.startDate)}
                </span>
              </p>
              {/* <div className={`status ${booking.status}`}>{capitalizeFirstLetter(booking.status)}</div> */}

              <div className="status-tracker">
                <div className="status-line">
                  {STATUS_FLOW.map((status, index) => {
                    const currentIndex = STATUS_FLOW.indexOf(booking.status);

                    const isCompleted = booking.status === "completed";
                    const isCanceled = booking.status === "canceled";

                    // ✅ Normal fill logic
                    const isActive =
                      isCompleted
                        ? true
                        : isCanceled
                          ? index < STATUS_FLOW.length - 1
                          : index <= currentIndex;

                    // ❌ Last circle for canceled
                    const isCancelCircle =
                      isCanceled && index === STATUS_FLOW.length - 1;

                    return (
                      <React.Fragment key={status}>
                        <div
                          className={`status-circle 
              ${isActive ? "active" : ""}
              ${isCancelCircle ? "cancel" : ""}
            `}
                        >
                          {isCancelCircle && <span className="cancel-cross">✕</span>}
                        </div>

                        {index < STATUS_FLOW.length - 1 && (
                          <div
                            className={`status-connector 
                ${isActive ? "active" : ""}
              `}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <span className="status-label">
                  {capitalizeFirstLetter(booking.status)}
                </span>
              </div>

              {booking.status === "completed" && (
                <div className="booking-rating">
                  <span className="rating-label">Ratings</span>
                  {/* <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div> */}
                  <div className="stars">
                    {[...Array(5)].map((_, index) => {
                      const rating = booking.ratingsGivenByClient || 0;

                      if (rating >= index + 1) {
                        // Full star
                        return <FaStar key={index} />;
                      } else if (rating >= index + 0.5) {
                        // Half star
                        return <FaStarHalfAlt key={index} />;
                      } else {
                        // Empty star
                        return <FaRegStar key={index} />;
                      }
                    })}
                  </div>
                </div>
              )}

              <div className="booking-actions">
                {/* <button
                  className="modify-btn"
                  onClick={() => handleModifyBooking(booking._id)}
                >
                  Modify
                </button> */}

                {/* <button
                  className="view-details"
                  onClick={() => handleViewDetails(booking._id)}
                >
                  View Details
                </button> */}



                {/* <button onClick={() => navigate("/payment-details", { state: { bookingId: booking._id, serviceCost: booking.outStandingAmount } })}>
                  Pay Via Razorpay
                </button> */}

              </div>
              <div className="booking-actions">
                <button
                  className="modify-btn"
                  onClick={() => handleChatNow(booking._id)}
                >
                  Chat Now
                </button>

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
              </div>
            </div>



            <div className="booking-right">

              {(() => {
                const totalAmount = booking.totalAmount || 0;
                const remainingAmount = booking.outStandingAmount || 0;
                const paidAmount = totalAmount - remainingAmount;

                return (
                  <>
                    <span
                      className={`paymentStatus ${booking.paymentStatus}`}
                    >
                      {capitalizeFirstLetter(booking.paymentStatus)}
                    </span>

                    <div className="amount-breakdown">

                      <p className="amount total">
                        Total: ₹ {totalAmount}/-
                      </p>

                      <p className="amount paid">
                        Paid: ₹ {paidAmount}/-
                      </p>

                      {remainingAmount > 0 && (
                        <p className="amount remaining">
                          Remaining: ₹ {remainingAmount}/-
                        </p>
                      )}

                    </div>

                    {remainingAmount > 0 && (
                      totalAmount === remainingAmount ? (
                        <button
                          disabled={booking.status === "canceled" || booking.status === "cancelled"}
                          className="Pay-Outstanding_Amount"
                          onClick={() =>
                            navigate("/payment-details", {
                              state: {
                                bookingId: booking._id,
                                serviceCost: remainingAmount,
                              },
                            })
                          }
                        >
                          Pay Now
                        </button>
                      ) : (
                        <button
                          className="Pay-Outstanding_Amount"
                          onClick={() => {
                            setOutstandingAmount(remainingAmount);
                            setSelectedBookingId(booking._id);
                            setShowOutstandingModal(true);
                          }}
                          disabled={booking.status === "canceled" || booking.status === "cancelled"}
                        >
                          Pay Outstanding Amount
                        </button>
                      )
                    )}

                  </>
                );
              })()}

            </div>
          </div>
        ))
      )}
      <OutstandingAmountModal
        show={showOutstandingModal}
        bookingId={selectedBookingId}
        outstandingAmount={outstandingAmount}
        onClose={() => setShowOutstandingModal(false)}
        onSuccess={() => {
          setShowOutstandingModal(false);
          fetchUpcomingBookings(); // refresh list
        }}
      />


    </div>
  );
};

export default UpcomingBookings;
