// import React from "react";
// import { TfiArrowCircleLeft } from "react-icons/tfi";
// import "./RaiseQuery.css";

// const RaiseQuery = ({ onBack }) => {
//   return (
//     <div className="raise-query-wrapper">

//       {/* Header */}
//       <div className="raise-query-header">
//         <button className="back-btn" onClick={onBack}>
//           <TfiArrowCircleLeft />
//         </button>
//         <h3 className="Raise-Ticket-title">Raise a Ticket Related to Booking</h3>
//       </div>

//       {/* Ticket Form */}
//       <div className="ticket-card">
//         <p className="service-name">Service Name - One Time Visit</p>

//         <label className="form-label">Tell Us About your Issue !</label>
//         <textarea
//           className="form-textarea"
//           placeholder="Describe your issue here..."
//         />

//         <label className="form-label mt-3">Attach a File (Optional):</label>
//         <input type="file" className="form-file" />

//         <button className="submit-btn w-50">Submit Ticket</button>
//       </div>

//       {/* Previous Tickets */}
//       <h3 className="previous-title">Previous Tickets</h3>

//       <div className="previous-tickets">
//         <div className="ticket-item">
//           <p className="ticket-date">Created Date: Dec 18</p>
//           <p className="ticket-status new">NEW</p>
//           <p className="ticket-desc">Issue description here...</p>
//           <button className="view-btn">Attachment & View</button>
//         </div>

//         <div className="ticket-item">
//           <p className="ticket-date">Created Date: March 20</p>
//           <p className="ticket-status new">NEW</p>
//           <p className="ticket-desc">Issue description here...</p>
//           <button className="view-btn">Attachment & View</button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default RaiseQuery;



// import React, { useEffect, useState } from "react";
// import { TfiArrowCircleLeft } from "react-icons/tfi";
// import "./RaiseQuery.css";
// import {
//   createRaiseTicket,
//   getRaiseTicket,
// } from "../../../../../utils/APIs/bookingApis";
// import Loader from "../../../../../Template/Loader/Loader";
// import CommonMessageModal from "../../../../CommonMessageModal/CommonMessageModal";

// const RaiseQuery = ({ onBack, bookingData }) => {
//   const { bookingId, serviceId, clientId, serviceName } = bookingData || {};

//   const [issue, setIssue] = useState("");
//   const [attachment, setAttachment] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [showMessage, setShowMessage] = useState(false);
//   const [message, setMessage] = useState("");
//   const [previousTickets, setPreviousTickets] = useState([]);

//   /* =========================
//      FETCH PREVIOUS TICKETS
//   ========================= */
//   const fetchTickets = async () => {
//     if (!bookingId) return;

//     try {
//       const res = await getRaiseTicket(bookingId);
//       if (res?.data?.success) {
//         setPreviousTickets(res.data.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching previous tickets", err);
//     }
//   };

//   /* =========================
//      SUBMIT TICKET
//   ========================= */
//   const handleSubmit = async () => {
//     if (!issue.trim()) {
//       setMessage("Please describe your issue.");
//       setShowMessage(true);
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("serviceId", serviceId);
//       formData.append("bookingId", bookingId);
//       formData.append("clientId", clientId);
//       formData.append("issue", issue);

//       if (attachment) {
//         formData.append("attachment", attachment);
//       }

//       const response = await createRaiseTicket(formData);

//       if (response?.data?.success) {
//         setMessage("Ticket created successfully.");
//         setIssue("");
//         setAttachment(null);

//         // ✅ REFRESH PREVIOUS TICKETS AFTER CREATE
//         await fetchTickets();
//       } else {
//         setMessage("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Raise ticket error:", error);
//       setMessage("Failed to create ticket.");
//     } finally {
//       setLoading(false);
//       setShowMessage(true);
//     }
//   };

//   /* =========================
//      INITIAL FETCH
//   ========================= */
//   useEffect(() => {
//     fetchTickets();
//   }, [bookingId]);

//   if (loading) return <Loader />;

//   return (
//     <div className="raise-query-wrapper">
//       {/* Header */}
//       <div className="raise-query-header">
//         <button className="back-btn" onClick={onBack}>
//           <TfiArrowCircleLeft />
//         </button>
//         <h3 className="Raise-Ticket-title">
//           Raise a Ticket Related to Booking
//         </h3>
//       </div>

//       {/* Ticket Form */}
//       <div className="ticket-card">
//         <p className="service-name">
//           Service Name - {serviceName || "Service"}
//         </p>

//         <label className="form-label">Tell Us About your Issue !</label>
//         <textarea
//           className="form-textarea"
//           placeholder="Describe your issue here..."
//           value={issue}
//           onChange={(e) => setIssue(e.target.value)}
//         />

//         <label className="form-label mt-3">
//           Attach a File (Optional):
//         </label>
//         <input
//           type="file"
//           className="form-file"
//           onChange={(e) => setAttachment(e.target.files[0])}
//         />

//         <button className="submit-btn w-50" onClick={handleSubmit}>
//           Submit Ticket
//         </button>

//         {/* Previous Tickets */}
    
// {/* comment */}
//       </div>

//           <h3 className="previous-title">Previous Tickets</h3>

// <div className="previous-tickets">
//   {previousTickets.length > 0 ? (
//     previousTickets.map((ticket) => (
//       <div className="ticket-item" key={ticket._id}>
//         <p className="ticket-date">
//           Created Date:{" "}
//           {new Date(ticket.createdAt).toLocaleDateString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           })}
//         </p>

//         <p className={`ticket-status new`}>
//           {ticket.status?.toUpperCase() || "NEW"}
//         </p>

//         <p className="ticket-desc">{ticket.issue}</p>

//         {ticket.attachment && (
//           <a
//             href={ticket.attachment}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <button className="view-btn">Attachment & View</button>
//           </a>
//         )}
//       </div>
//     ))
//   ) : (
//     /* Optional empty placeholder to preserve layout */
//     <div className="ticket-item">
//       <p className="ticket-date">No tickets raised yet</p>
//       <p className="ticket-status new">NEW</p>
//       <p className="ticket-desc">—</p>
//     </div>
//   )}
// </div>

//       {/* Message Modal */}
//       <CommonMessageModal
//         show={showMessage}
//         onClose={() => setShowMessage(false)}
//         message={message}
//         buttonText="Okay"
//       />
//     </div>
//   );
// };

// export default RaiseQuery;




import React, { useEffect, useState, useCallback } from "react";
import "./RaiseQuery.css";
import {
  createRaiseTicket,
  getRaiseTicket,
} from "../../../../../utils/APIs/bookingApis";
import Loader from "../../../../../Template/Loader/Loader";
import CommonMessageModal from "../../../../CommonMessageModal/CommonMessageModal";
import { FaRegCalendarAlt, FaEye } from "react-icons/fa";


const RaiseQuery = ({ onBack, bookingData }) => {
  const { bookingId, serviceId, clientId, serviceName } = bookingData || {};

  const [issue, setIssue] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [previousTickets, setPreviousTickets] = useState([]);

  /* =========================
     FETCH PREVIOUS TICKETS
  ========================= */
 const fetchTickets = useCallback(async () => {
  if (!bookingId) return;

  try {
    const res = await getRaiseTicket(bookingId);
    if (res?.data?.success) {
      setPreviousTickets(res.data.data || []);
    }
  } catch (err) {
    console.error("Error fetching previous tickets", err);
  }
}, [bookingId]);
  /* =========================
     SUBMIT TICKET
  ========================= */
  const handleSubmit = async () => {
    if (!issue.trim()) {
      setMessage("Please describe your issue.");
      setShowMessage(true);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("serviceId", serviceId);
      formData.append("bookingId", bookingId);
      formData.append("clientId", clientId);
      formData.append("issue", issue);

      if (attachment) {
        formData.append("attachment", attachment);
      }

      const response = await createRaiseTicket(formData);

      if (response?.data?.success) {
        setMessage("Ticket created successfully.");
        setIssue("");
        setAttachment(null);

        // ✅ REFRESH PREVIOUS TICKETS AFTER CREATE
        await fetchTickets();
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Raise ticket error:", error);
      setMessage("Failed to create ticket.");
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  /* =========================
     INITIAL FETCH
  ========================= */
  useEffect(() => {
  fetchTickets();
}, [fetchTickets]);

  if (loading) return <Loader />;

  return (
    <div className="raise-query-wrapper">
      {/* Header */}
      <div className="raise-query-header">
        <h3 className="Raise-Ticket-title">
          Raise a Ticket Related to Booking
        </h3>
      </div>

      {/* Ticket Form */}
      <div className="ticket-card">
        <p className="service-name">
          Service Name - {serviceName || "Service"}
        </p>

        <label className="form-label">Tell Us About your Issue !</label>
        <textarea
          className="form-textarea"
          placeholder="Describe your issue here..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <label className="form-label mt-3">
          Attach a File (Optional):
        </label>
        <input
          type="file"
          className="form-file"
          onChange={(e) => setAttachment(e.target.files[0])}
        />

        <button className="submit-btn w-50" onClick={handleSubmit}>
          Submit Ticket
        </button>

        {/* Previous Tickets */}
    
{/* comment */}
      </div>

          <h3 className="previous-title">Previous Tickets</h3>

<div className="previous-tickets">
  {previousTickets.length > 0 ? (
    previousTickets.map((ticket) => {
      const createdDate = new Date(ticket.createdAt);
      const updatedDate = new Date(ticket.updatedAt);

      const daysDiff =
        (new Date() - createdDate) / (1000 * 60 * 60 * 24);

      const ticketLabel = daysDiff <= 3 ? "NEW" : "PREVIOUS";

      return (
        <div className="ticket-item" key={ticket._id}>
          {/* Header */}
          <div>
          <div className="ticket-header">
  <div>
    <p className="mb-2">
      <strong>Created Date :</strong>{" "}
      {createdDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </p>

    <p className="updated-date">
      <FaRegCalendarAlt /> Updated Date :{" "}
      {updatedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </p>

    {/* STATUS — near updated date */}
    <p className="status-row">
      <span className="status-label">Status :</span>
      <span
        className={`ticket-status ${
          ticket.status === "open" ? "open" : "solved"
        }`}
      >
        {ticket.status?.toUpperCase()}
      </span>
    </p>
  </div>
</div>

          </div>

          {/* Body */}
          <div className="ticket-body">
            <p className="ticket-label">{ticketLabel}</p>
            <p className="ticket-desc">{ticket.issue}</p>

            {ticket.attachment && (
             
              <a
                href={ticket.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="attachment-link"
              >
                Attachment : <FaEye /> View
              </a>
            )}
          </div>
        </div>
      );
    })
  ) : (
    <p>No tickets raised yet</p>
  )}
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

export default RaiseQuery;
