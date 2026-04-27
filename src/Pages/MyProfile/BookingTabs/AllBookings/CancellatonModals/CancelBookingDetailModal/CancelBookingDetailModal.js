// import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
// import "./CancelBookingDetailModal.css";

// const CancelBookingDetailModal = ({ show, onClose, onProceed }) => {
//   const [reason, setReason] = useState("");

//   return (
//     <Modal
//       show={show}
//       onHide={onClose}
//       centered
//       backdrop="static"
//       className="cancel-booking-modal"
//     >
//       <div className="cancel-modal-wrapper">
//         <button className="close-icon" onClick={onClose}>×</button>

//         <h2 className="modal-title">Cancel Booking ?</h2>

//         <img
//           src="/asset/CancelBooking/CancelBookingGirl.png"
//           alt="Cancel Booking"
//           className="cancel-image"
//         />

//         <p className="modal-desc">
//           Are you sure you want to cancel this booking?
//         </p>
//         <p className="modal-note">
//           Cancellation charges may apply as per policy
//         </p>

//         <div className="reason-section">
//           <p className="reason-title">Reason for Cancellation</p>

//           {[
//             "Changed my mind",
//             "Found another service",
//             "Budget issue",
//             "Other",
//           ].map((item) => (
//             <label key={item} className="radio-item">
//               <input
//                 type="radio"
//                 name="cancelReason"
//                 value={item}
//                 checked={reason === item}
//                 onChange={() => setReason(item)}
//               />
//               <span></span>
//               {item}
//             </label>
//           ))}
//         </div>

//         <div className="modal-actions">
//           <button className="keep-btn" onClick={onClose}>
//             Keep Booking
//           </button>

//           <button
//             className="cancel-btn"
//             onClick={onProceed}
//             disabled={!reason}
//           >
//             Cancel Booking
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CancelBookingDetailModal;



import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./CancelBookingDetailModal.css";

const CancelBookingDetailModal = ({ show, onClose, onProceed }) => {
  const [reason, setReason] = useState("");

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      className="cancel-booking-modal"
    >
      <div className="cancel-modal-wrapper">
        <button className="close-icon" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-title">Cancel Booking ?</h2>

        {/* ✅ IMAGE — EXACT SAME */}
        <img
          src="/asset/CancelBooking/CancelBookingGirl.png"
          alt="Cancel Booking"
          className="cancel-image"
        />

        <p className="modal-desc">
          Are you sure you want to cancel this booking?
        </p>

        <p className="modal-note">
          Cancellation charges may apply as per policy
        </p>

        <div className="reason-section">
          <p className="reason-title">Reason for Cancellation</p>

          {[
            "Changed my mind",
            "Found another service",
            "Budget issue",
            "Other",
          ].map((item) => (
            <label key={item} className="radio-item">
              <input
                type="radio"
                name="cancelReason"
                value={item}
                checked={reason === item}
                onChange={() => setReason(item)}
              />
              <span></span>
              {item}
            </label>
          ))}
        </div>

        <div className="modal-actions">
          <button className="keep-btn" onClick={onClose}>
            Keep Booking
          </button>

          <button
            className="cancel-btn"
            onClick={() => onProceed(reason)} // ✅ ONLY FIX
            disabled={!reason}
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelBookingDetailModal;
