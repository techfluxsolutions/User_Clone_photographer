import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import "../../Pages/CommonMessageModal/CommonMessageModal.css";

const PleaseLoginModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="common-message-modal">
        {/* TITLE (same as CommonMessageModal) */}
        <h3 className="modal-title mb-4">
          <span className="line" />
          <MdEmail className="message-icon" />
          <span className="title-text">Message</span>
          <span className="line" />
        </h3>

        {/* MESSAGE */}
        <p className="modal-message">
          Before going forward, please login.
        </p>

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            className="modal-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="modal-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PleaseLoginModal;
