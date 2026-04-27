import { Modal } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import "./CommonMessageModal.css";
import { useState } from "react";
import { rejectQuoteAPI } from "../../utils/APIs/chatApis";


const CommonMessageModal = ({
  show,
  onClose,
  // title = "Message",
  fetchHistory,
  messageId,
  message = "",
  buttonText = "Okay",
}) => {


  const [loading, setLoading] = useState(false);

  // const handleRejectQuote = async () => {
  //   try {
  //     if (!messageId?._id) {
  //       console.error("Message ID missing");
  //       return;
  //     }

  //     setLoading(true);

  //     // const payload = {
  //     //   status: "rejected", // adjust if backend expects different data
  //     // };

  //     const response = await rejectQuoteAPI(messageId._id);

  //     console.log("Reject success:", response.data);
  //     if(response?.data?.success){
  //       alert(response?.data?.message)
  //       onClose(); // close modal after success
  //     }

    

  //   } catch (error) {
  //     console.error(
  //       "Reject quote failed:",
  //       error?.response?.data || error.message
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleRejectQuote = async () => {
  // If messageId exists → reject flow
  if (messageId?._id) {
    try {
      setLoading(true);

      const response = await rejectQuoteAPI(messageId._id);

      if (response?.data?.success) {
        alert(response?.data?.message);
        onClose();
        fetchHistory();
      }

    } catch (error) {
      console.error(
        "Reject quote failed:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }

  } else {
    // Normal modal → just close
    onClose();
  }
};

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="common-message-modal">
        {/* <h3 className="modal-title">{title}</h3> */}
       <h3 className="modal-title mb-4">
        <span className="line" />
        <MdEmail className="message-icon" />
        <span className="title-text">Message</span>
        <span className="line" />
      </h3>

        <p className="modal-message">{message}</p>

        <button
          className="modal-btn"
          onClick={handleRejectQuote}
          disabled={loading}
        >
          {loading ? "Processing..." : buttonText}
        </button>
      </div>
    </Modal>
  );
};

export default CommonMessageModal;
