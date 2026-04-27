import React from "react";
import { Modal } from "react-bootstrap";
import "../../CommonMessageModal/CommonMessageModal.css"; // SAME CSS

const CommingSoonModal = ({
  show,
  onClose,
  message = "Stay tuned, something exciting is coming soon!",
  buttonText = "Okay",
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="common-message-modal">
        <h3 className="modal-title mb-4">
          <span className="line" />
          {/* <MdCelebration className="message-icon" /> */}
          <span className="title-text">Coming Soon</span>
          <span className="line" />
        </h3>

        <p className="modal-message">{message}</p>

        <button className="modal-btn" onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};

export default CommingSoonModal;