import React from "react";
import "./PinnedPaymentCard.css";

const PinnedPaymentCard = ({ pinned, formatDate, type }) => {
  if (!pinned) return null;

  return (
    <div className="wa-pinned-wrapper">
      <div className="wa-pinned-content">
        <span className="pin-icon">📌</span>

        <div className="wa-pinned-text">

               {/* 🔵 BOOKING PINNED */}
          {type === "booking" && (
            <>
              <div className="wa-title">
                {pinned?.service_id?.serviceName} | ₹{pinned?.totalAmount}
              </div>

              <div className="wa-subtitle">
                {pinned?.city}, {pinned?.state}   
                {/* Booking Date : {formatDate(pinned?.bookingDate)} */}
              </div>

              <div className="wa-subtitle">
                Status: {pinned?.paymentStatus} | Mode: {pinned?.paymentMode}
              </div>
            </>
          )}

          {/* 🟢 QUOTE PINNED */}
          {type === "quote" && (
            <>
              <div className="wa-pinned-text">
          <div className="wa-title">
            {pinned.eventType} • ₹{pinned.budget}
          </div>
          <div className="wa-subtitle">
            Location : {pinned.location} , {formatDate(pinned.startDate)} – {formatDate(pinned.endDate)}
          </div>
          </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default PinnedPaymentCard;


// import React from "react";
// import "./PinnedPaymentCard.css";

// const PinnedPaymentCard = ({ pinned, formatDate }) => {
//   if (!pinned) return null;

//   return (
//     <div className="wa-pinned-wrapper">
//       <div className="wa-pinned-content">
//         <span className="pin-icon">📌</span>

//         <div className="wa-pinned-text">
//           <div className="wa-title">
//             {pinned.eventType} • ₹{pinned.budget}
//           </div>
//           <div className="wa-subtitle">
//             {pinned.location} · {formatDate(pinned.startDate)} – {formatDate(pinned.endDate)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PinnedPaymentCard;
