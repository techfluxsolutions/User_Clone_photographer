import React, { useEffect, useState } from "react";
import { LuCake } from "react-icons/lu";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import "./UpcomingBookings.css";
import "./../UpcomingBookings/UpcomingBookings.css";
import Loader from "../../../../Template/Loader/Loader";
import { getAllIncompleteBookings } from "../../../../utils/APIs/bookingApis";
import OutstandingAmountModal from "../OutstandingAmoutModal/OutstandingAmountModal";


const IncompleteBookings = () => {
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
      const response = await getAllIncompleteBookings();

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

  // const handleModifyBooking = (bookingId) => {
  //   navigate("/modifyBooking", { state: { bookingId } });
  // };

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
                <LuCake className="cake-icon" />
                {booking.service_id?.serviceName || "Service"}
              </h3>

              <p className="booking-date">
                {formatDate(booking.bookingDate)} &nbsp;
                <span className="booking-day">
                  {getDayFromDate(booking.bookingDate)}
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

              <div className="booking-actions">
                {/* <button
                  className="modify-btn"
                  onClick={() => handleModifyBooking(booking._id)}
                >
                  Modify
                </button> */}

                <button
                  className="view-details"
                  onClick={() => handleViewDetails(booking._id)}
                >
                  View Details
                </button>

                
              </div>
            </div>

            <div className="booking-right">
              <span className={`paymentStatus ${booking.paymentStatus}`}>{capitalizeFirstLetter(booking.paymentStatus)}</span>
              <p className="amount">Rs. {booking.totalAmount}/-</p>
              {booking.totalAmount > 0 && (
                <button
                  className="Pay-Outstanding_Amount"
                  onClick={() => {
                    setOutstandingAmount(booking.totalAmount);
                    setSelectedBookingId(booking._id);
                    setShowOutstandingModal(true);
                  }}
                >
                  Pay Pending Amount
                </button>
              )}


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

export default IncompleteBookings;
