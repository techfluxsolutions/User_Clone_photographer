import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SuccessfullyCancelledBookingModal.css";

const SuccessfullyCancelledBookingModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      className="Sucess-CancelBooking-success-booking-modal"
    >
      <div className="Sucess-CancelBooking-success-modal-wrapper">
        {/* Success Image */}
        <img
          src="/asset/CancelBooking/Cancellation_succesful_checkmark.png"
          alt="Success"
          className="Sucess-CancelBooking-success-icon-img"
        />

        {/* Title */}
        <h2 className="Sucess-CancelBooking-success-title">
          Booking Cancelled
        </h2>

        {/* Description */}
        <p className="Sucess-CancelBooking-success-desc">
          The Booking has been successfully cancelled
        </p>

        {/* Action */}
        <button
          className="Sucess-CancelBooking-go-back-btn"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </Modal>
  );
};

export default SuccessfullyCancelledBookingModal;
