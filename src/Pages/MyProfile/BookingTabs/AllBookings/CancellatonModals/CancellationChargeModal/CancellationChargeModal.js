// import React from "react";
// import { Modal } from "react-bootstrap";
// import "./CancellationChargeModal.css";

// const CancellationChargeModal = ({ show, onClose, onConfirm }) => {
//   return (
//     <Modal
//       show={show}
//       onHide={onClose}
//       centered
//       backdrop="static"
//       className="cancellation-charge-modal"
//     >
//       <div className="charge-modal-wrapper">
//         <p className="charge-text">
//           You may be charged a cancellation <br />
//           fee if you cancel this booking
//         </p>

//         <div className="charge-box">
//           <span>Cancellation Charge</span>
//           <span className="amount">Rs. 500</span>
//         </div>

//         <button
//           className="confirm-cancel-btn"
//           onClick={onConfirm}
//         >
//           Yes, Cancel Booking
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default CancellationChargeModal;



import React from "react";
import { Modal } from "react-bootstrap";
import "./CancellationChargeModal.css";

const CancellationChargeModal = ({ show, onClose, onConfirm, charge }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      className="cancellation-charge-modal"
    >
      <div className="charge-modal-wrapper">
        <p className="charge-text">
          You may be charged a cancellation <br />
          fee if you cancel this booking
        </p>

        <div className="charge-box">
          <span>Cancellation Charge</span>
          <span className="amount">Rs. {charge}</span>
        </div>

        <button
          className="confirm-cancel-btn"
          onClick={onConfirm}
        >
          Yes, Cancel Booking
        </button>
      </div>
    </Modal>
  );
};

export default CancellationChargeModal;
