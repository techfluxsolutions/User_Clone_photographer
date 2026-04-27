// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./BookingDetails.css";
// import CancelBookingDetailModal from "../CancellatonModals/CancelBookingDetailModal/CancelBookingDetailModal";
// import CancellationChargeModal from "../CancellatonModals/CancellationChargeModal/CancellationChargeModal";
// import SuccessfullyCancelledBookingModal from "../CancellatonModals/SuccessfullyCancelledBookingModal/SuccessfullyCancelledBookingModal";


// const BookingDetails = ({ onRaiseQuery, onRating }) => {
//   const navigate = useNavigate();
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [showChargeModal, setShowChargeModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   return (
//     <div className="booking-details-wrapper">

//       {/* Page Title */}
//       <h2 className="page-title">Wedding Photoshoot</h2>

//       <p className="section-heading">Booking Details</p>

//       {/* Booking Info Card */}
//       <div className="details-card">
//         <div className="row-between">
//           <p className="label">Booking For</p>
//           <p className="value">Riya Mehta</p>
//         </div>

//         <p className="sub-heading">Event Information</p>
//         <ul className="info-list">
//           <li>• Event Type: Wedding Photography</li>
//           <li>• Event Date: 24 March 2026</li>
//           <li>• Event Time: 10:00 AM – 10:00 PM</li>
//           <li>• Event Location: Mumbai, Maharashtra</li>
//         </ul>

//         <p className="sub-heading mt-3">Photography Package</p>
//         <p className="package-name">
//           Selected Package: Premium Wedding Coverage
//         </p>

//         <ul className="info-list">
//           <li>• Full-day coverage</li>
//           <li>• Candid + Traditional photography</li>
//           <li>• Lead Photographer + Assistant</li>
//           <li>• High-resolution edited images</li>
//         </ul>
//       </div>

//       {/* Billing Details */}
//       <p className="section-heading">Billing Details</p>

//       <div className="details-card">
//         <div className="row-between">
//           <p className="label">Package Price</p>
//           <p className="value">₹45,000</p>
//         </div>

//         <div className="row-between">
//           <p className="label">Taxes & Charges</p>
//           <p className="value">₹2,500</p>
//         </div>

//         <div className="row-between total">
//           <p className="label">Total Amount Paid</p>
//           <p className="value">₹47,500</p>
//         </div>

//         <div className="row-between mt-2">
//           <p className="label">Status Badge</p>
//           <p className="status completed">✔ Payment Completed</p>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="booking-actions">
//         <button className="action-btn" onClick={onRaiseQuery}>
//           Raise a Query
//         </button>

//         <button className="action-btn outline" onClick={onRating}>
//           Give Rating & Feedback
//         </button>

//         <p className="cancel-btn-main" onClick={() => setShowCancelModal(true)}>Cancel Booking</p>
//       </div>
      
//       {/* First Modal */}
//       <CancelBookingDetailModal
//           show={showCancelModal}
//           onClose={() => setShowCancelModal(false)}
//           onProceed={() => {
//           setShowCancelModal(false);
//           setShowChargeModal(true);
//         }}
//       />

//       {/* Second Modal */}
//       <CancellationChargeModal
//         show={showChargeModal}
//         onClose={() => setShowChargeModal(false)}
//         onConfirm={() => {
//           setShowChargeModal(false);
//           setShowSuccessModal(true);
//         }}
//       />
//        {/* 3️⃣ Success Modal */}
//       <SuccessfullyCancelledBookingModal
//         show={showSuccessModal}
//         onClose={() => setShowSuccessModal(false)}
//       />
//     </div>
    
//   );
// };

// export default BookingDetails;



import React, { useEffect, useState } from "react";
import "./BookingDetails.css";

import CancelBookingDetailModal from "../CancellatonModals/CancelBookingDetailModal/CancelBookingDetailModal";
import CancellationChargeModal from "../CancellatonModals/CancellationChargeModal/CancellationChargeModal";
import SuccessfullyCancelledBookingModal from "../CancellatonModals/SuccessfullyCancelledBookingModal/SuccessfullyCancelledBookingModal";

import {
  getOneUpcomingBookingById,
  putCancelBooking,
} from "../../../../../utils/APIs/bookingApis";
import Loader from "../../../../../Template/Loader/Loader";
import CommonMessageModal from "../../../../CommonMessageModal/CommonMessageModal";

const BookingDetails = ({
  bookingId,
  setPhotographerId,
  setClientId,
  onRaiseQuery = () => {},
  onRating = () => {},
}) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [photographerData,setPhotographerData] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAlreadyCancelledModal, setShowAlreadyCancelledModal] = useState(false);

  const [cancelReason, setCancelReason] = useState("");

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  console.log("BOOKING",booking)

  /* =========================
     FETCH BOOKING BY ID
  ========================= */
  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [bookingId]);

  // const fetchBookingDetails = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getOneUpcomingBookingById(bookingId);
  //     setBooking(response?.data?.data || null);
  //   } catch (error) {
  //     console.error("Booking details error:", error);
  //     setBooking(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchBookingDetails = async () => {
  try {
    setLoading(true);
    const response = await getOneUpcomingBookingById(bookingId);
    const bookingData = response?.data?.data || null;
    // const photographerData = response?.data?.photographer
    // console.log("BOOKING DATA",bookingData)
    // setPhotographerData(photographerData)
    setBooking(bookingData);

    if (bookingData?.photographer_id) {
      setPhotographerId(bookingData.photographer_id); // ✅ SEND TO PARENT
    }
    if (bookingData?.client_id?._id) {
      setClientId(bookingData.client_id._id);
    }
  } catch (error) {
    console.error("Booking details error:", error);
    setBooking(null);
  } finally {
    setLoading(false);
  }
};

  /* =========================
     CANCEL BOOKING API
  ========================= */
  const handleCancelBooking = async () => {
    try {
      const payload = {
        status: "canceled",
        cancellationCharge: booking?.cancellationCharge || "0",
        cancellationDate: formatDate(new Date()),
        cancellationReason: cancelReason,
      };

      await putCancelBooking(bookingId, payload);

      setShowChargeModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Cancel booking error:", error);
    }
  };

  /* =========================
     LOADER & FALLBACK
  ========================= */
  if (loading) return <Loader />;
  if (!booking) return <p>No booking details found</p>;

  return (
    <div className="booking-details-wrapper">
      {/* Page Title */}
      <h2 className="page-title">
        {booking.service_id?.serviceName || "Booking Details"}
      </h2>

      <p className="section-heading">Booking Details</p>

      {/* Booking Info Card */}
      <div className="details-card">
        <div className="row-between">
          <p className="label">Booking For - </p>
          <p className="value">
            {booking.client_id?.username || "User"}
          </p>
        </div>

        <p className="sub-heading">Event Information</p>
        <ul className="info-list">
          <li><strong>• Event Type:</strong> {booking.service_id?.serviceName}</li>
          <li>
            <strong>• Event Date:</strong>{" "}
             {new Date(booking.startDate || booking.eventDate).toLocaleDateString("en-IN")}          
             </li>
          <li>
            <strong>• Event Location:</strong> {booking.city}, {booking.state}
          </li>
        </ul>

         {/* <p className="sub-heading">Assign Photographer Info </p>
        <ul className="info-list">
          <li>• Photographer Name: {photographerData?.basicInfo?.fullName || "-"}</li>
          <li>• Photographer Email: {photographerData?.basicInfo?.email || "-"}</li>
          <li>• Photographer Phone: {photographerData?.basicInfo?.phone || "-"}</li>
         
        </ul>

        <p className="sub-heading mt-3">Photography Package</p>
        <p className="package-name">
          Selected Package: {booking.service_id?.serviceName}
        </p>
        <p className="package-name">Includes:</p>
        <ul className="info-list">
       <li>• Full-day coverage</li>        
       <li>• Candid + Traditional photography</li>
       <li>• Lead Photographer + Assistant</li>
       <li>• High-resolution edited images</li>
       </ul> */}
      </div>

      {/* Billing Details */}
      <p className="section-heading">Billing Details</p>

      <div className="details-card">
        <div className="row-between total mb-0">
          <p className="package-name">Package Price</p>
          <p className="package-name">₹ 00</p>
          </div>
         
          <div className="row-between total mb-0">
          <p className="package-name">Taxes & Charges</p>
          <p className="package-name">₹ 00</p>
          </div>

        <div className="row-between total">
          <p className="label">Total Amount</p>
          <p className="value">₹ {booking.totalAmount}</p>
        </div>

        <div className="row-between mt-2">
          <p className="label">Status Badge</p>
          <p className={`paymentStatus ${booking.paymentStatus}`}>
            {booking.paymentStatus.charAt(0).toUpperCase() +
              booking.paymentStatus.slice(1)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="booking-actions-details">
        <button
          type="button"
          className="action-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRaiseQuery();
             onRaiseQuery({
            bookingId: booking._id,
            serviceId: booking.service_id?._id,
            clientId: booking.client_id?._id,
            serviceName: booking.service_id?.serviceName,
          });
          }}
        >
          Raise a Query
        </button>

        {
       booking?.status==="completed" &&
       (<button
          type="button"
          className="action-btn outline"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRating();
             onRating({
              bookingId: booking._id,
              serviceId: booking.service_id?._id,
              serviceName: booking.service_id?.serviceName,
              clientId: booking.client_id?._id,
            });
          }}
        >
          Give Rating & Feedback
        </button>
      )}

        {/* <p
          className="cancel-btn-main"
          onClick={() => {
            if (booking.status === "canceled") {
              setShowAlreadyCancelledModal(true);
            } else {
              setShowCancelModal(true);
            }
          }}
        >
          Cancel Booking
        </p> */}

        <button
  // className={`action-btn outline cancel-btn-main ${
  //   booking.status === "completed" ? "disabled-cancel" : ""
  // }`}

    className={`action-btn outline ${
    booking.status === "completed" ? "disabled-cancel" : ""
  }`}
  title={
    booking.status === "completed"
      ? "Booking is completed so it cannot be cancelled"
      : ""
  }
  onClick={() => {
    if (booking.status === "completed") return;

    if (booking.status === "canceled") {
      setShowAlreadyCancelledModal(true);
    } else {
      setShowCancelModal(true);
    }
  }}
>
  Cancel Booking
</button>

      </div>

      {/* Modals */}
      <CancelBookingDetailModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onProceed={(reason) => {
          setCancelReason(reason);
          setShowCancelModal(false);
          setShowChargeModal(true);
        }}
      />

      <CancellationChargeModal
        show={showChargeModal}
        onClose={() => setShowChargeModal(false)}
        onConfirm={handleCancelBooking}
        charge={booking?.cancellationCharge || "0"}
      />

      <SuccessfullyCancelledBookingModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <CommonMessageModal
        show={showAlreadyCancelledModal}
        onClose={() => setShowAlreadyCancelledModal(false)}
        message="This booking is already cancelled."
        buttonText="Okay"
      />
    </div>
  );
};

export default BookingDetails;
