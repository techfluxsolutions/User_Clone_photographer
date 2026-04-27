// import React, { useState } from "react";
// import "./RatingsAndFeedback.css";

// const RatingsAndFeedback = () => {
//   const [rating, setRating] = useState(null);
//   const [comment, setComment] = useState("");

//   return (
//     <div className="rating-page-wrapper">
//       <div className="rating-card">
//         <h2 className="rating-title">Rate Us!</h2>
//         <p className="rating-subtitle">Tell us your experience</p>

//         {/* Rating Scale */}
//         <div className="rating-scale">
//           {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
//             <button
//               key={num}
//               className={`rating-circle ${rating === num ? "active" : ""}`}
//               onClick={() => setRating(num)}
//             >
//               {num}
//             </button>
//           ))}
//         </div>

//         <div className="rating-labels">
//           <span>Worst</span>
//           <span>Best</span>
//         </div>

//         {/* Comment Box */}
//         <div className="comment-section">
//           <label>Can you tell us more ?</label>
//           <textarea
//             placeholder="Add Comment.."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//         </div>

//         {/* Submit */}
//         <button className="submit-btn">Submit</button>
//       </div>
//     </div>
//   );
// };

// export default RatingsAndFeedback;


import React, { useEffect, useState } from "react";
import "./RatingsAndFeedback.css";
import Loader from "../../../../../Template/Loader/Loader";
import CommonMessageModal from "../../../../CommonMessageModal/CommonMessageModal";
import {
  createRatingAndFeedbacks,
  getRatingAndFeedbacks,
} from "../../../../../utils/APIs/bookingApis";

const RatingsAndFeedback = ({ onBack, ratingData }) => {
  const { bookingId, serviceId, clientId } = ratingData || {};

  console.log("Rating Data:", { bookingId, serviceId, clientId });

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [existingRating, setExistingRating] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  /* =========================
     FETCH RATING BY BOOKING ID
  ========================= */
  useEffect(() => {
    if (!bookingId) return;

    const fetchRating = async () => {
      try {
        setLoading(true);

        const response = await getRatingAndFeedbacks(bookingId);

        if (response?.data?.success && Array.isArray(response.data.data)) {
          // 🔥 FILTER BY BOOKING ID
          const matchedReview = response.data.data.find(
            (item) => item.bookingId === bookingId
          );

          if (matchedReview) {
            setExistingRating(matchedReview);
            setRating(matchedReview.ratingCount);
            setComment(matchedReview.rateComments);
          }
        } else {
          setMessage(
            response?.data?.message || "Unable to fetch rating."
          );
          setShowMessage(true);
        }
      } catch (error) {
        console.error("Fetch rating error:", error);

        setMessage(
          error?.response?.data?.message ||
          "Something went wrong while fetching rating."
        );
        setShowMessage(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [bookingId]);

  /* =========================
     SUBMIT RATING
  ========================= */
  const handleSubmit = async () => {
    if (!rating) {
      setMessage("Please select a rating.");
      setShowMessage(true);
      return;
    }

    if (!clientId || !serviceId || !bookingId) {
      setMessage("Booking information missing. Please go back and try again.");
      setShowMessage(true);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        clientId,
        serviceId,
        bookingId,
        ratingCount: Number(rating),
        rateComments: comment || "",
      };

      console.log("Submitting review payload:", payload);

      const response = await createRatingAndFeedbacks(payload);

      if (response?.data?.success && response.data.data) {
        setMessage(response?.data?.message || "Thank you for your feedback!");

        // 🔥 LOCK UI WITH CREATED REVIEW
        setExistingRating(response.data.data);
      } else {
        setMessage(
          response?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Rating submit error:", error);

      setMessage(
        error?.response?.data?.message || "Failed to submit rating."
      );
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  /* =========================
     LOADER
  ========================= */
  if (loading) return <Loader />;

  return (
    <div className="rating-page-wrapper">
      <div className="rating-card">
        <h2 className="rating-title">Rate Us!</h2>
        <p className="rating-subtitle">Tell us your experience</p>

        {existingRating && (
          <p className="already-rated-text">
            You have already submitted feedback for this booking.
          </p>
        )}

        {/* Rating Scale */}
        <div className="rating-scale">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`rating-circle ${rating === num ? "active" : ""}`}
              onClick={() => setRating(num)}
              disabled={loading || existingRating}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="rating-labels">
          <span>Worst</span>
          <span>Best</span>
        </div>

        {/* Comment Box */}
        <div className="comment-section">
          <label>Can you tell us more ?</label>
          <textarea
            placeholder="Add Comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading || existingRating}
          />
        </div>

        {/* Submit */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading || existingRating}
        >
          {existingRating ? "Already Rated" : "Submit"}
        </button>
      </div>

      {/* Message Modal */}
      <CommonMessageModal
        show={showMessage}
        onClose={() => setShowMessage(false)}
        message={message}
        buttonText="Okay"
      />
    </div>
  );
};

export default RatingsAndFeedback;
