import React from "react";
import { Modal } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import "./LogoutModal.css";

const LogoutModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="logout-modal">
        {/* Header */}
        <div className="logout-modal-header">
          <span className="line"></span>
          <MdEmail className="logout-icon" />
          <h3>Message</h3>
          <span className="line"></span>
        </div>

        {/* Message */}
        <p className="logout-modal-text">
          Are you sure you want logout
        </p>

        {/* Actions */}
        <div className="logout-modal-actions">
          <button className="logout-btn secondary" onClick={onClose}>
            No
          </button>
          <button className="logout-btn primary" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
