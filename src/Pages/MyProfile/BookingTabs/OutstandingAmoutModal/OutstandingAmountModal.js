

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../AllBookings/CancellatonModals/CancellationChargeModal/CancellationChargeModal.css";
// import { createRazorpayOrder, verifyRazorpayPayment } from "../../../../utils/APIs/bookingApis";
import { GetProfile } from "../../../../utils/APIs/myProfileApis";
import CommonMessageModal from "../../../CommonMessageModal/CommonMessageModal";
import { useNavigate } from "react-router-dom";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../../../utils/APIs/razorpayPaymentApis";
import "./OutstandingAmountModal.css"
const OutstandingAmountModal = ({
  show,
  onClose,
  // onSuccess,
  bookingId,
  outstandingAmount
}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
   const [userDetails, setUserDetails] = useState({
      username: "User Name", // Consider fetching real user details if available
      email: "user@example.com",
      mobileNumber: "9999999999",
    });
    const navigate=useNavigate()

  // const handlePayNow = async () => {
  //   if (!bookingId) return;

  //   try {
  //     setLoading(true);

  //     const today = new Date().toLocaleDateString("en-IN");

  //     const payload = {
  //       partial_Payment: false,
  //       full_Payment: true,
  //       outStandingAmount: 0,
  //       paymentStatus: "partially paid",
  //       paymentDate: today,
  //       paymentMode: "online"
  //     };

  //     await putPaymentBooking(bookingId, payload);

  //     onSuccess();
  //   } catch (error) {
  //     console.error("Payment update failed:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

   useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const response = await GetProfile();
            if (response.data?.success) {
              setUserDetails(response.data);
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
    
        fetchUserDetails();
      }, []);

    const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };



 /* ✅ Limits */
const SPLIT_THRESHOLD = 1000000; // ₹10 Lakhs
const SAFE_MAX_AMOUNT = 450000;  // ₹4.5 Lakhs

/* ✅ Convert to number */
const numericOutstanding =
  typeof outstandingAmount === "string"
    ? Number(outstandingAmount.replace(/,/g, ""))
    : Number(outstandingAmount);

/* ✅ Installment Calculation */
const calculateInstallmentDetails = (amount) => {
  let payable = amount;
  let totalInstallments = 1;

  // Case 1: Above 10 Lakhs → Dynamic slicing
  if (amount > SPLIT_THRESHOLD) {
    totalInstallments = Math.ceil(
      amount / SAFE_MAX_AMOUNT
    );

    let dynamicStepAmount = Math.ceil(
      amount / totalInstallments
    );

    payable = Math.min(
      dynamicStepAmount,
      SAFE_MAX_AMOUNT
    );
  }
  // Case 2: ≤ 10 Lakhs → 50% split
  else {
    payable = Math.ceil(amount / 2);
    totalInstallments = 2;
  }

  return {
    payableNow: payable,
    totalInstallments,
  };
};

const {
  payableNow,
  totalInstallments,
} = calculateInstallmentDetails(numericOutstanding);

/* Remaining calculations */
const remainingAmount =
  numericOutstanding - payableNow;

/* Remaining installments */
const remainingInstallments =
  remainingAmount > 0
    ? Math.ceil(
        remainingAmount / payableNow
      )
    : 0;

/* Current installment */
const currentInstallment =
  totalInstallments - remainingInstallments;
  const handlePartialPayment = async () => {
    try {
      if (!bookingId) {
        setIsPaymentSuccess(false);
        setModalMessage("Payment ID not found. Please try again.");
        setShowModal(true);
        return;
      }

      setLoading(true);

      const res = await loadRazorpayScript();
      if (!res) {
        setIsPaymentSuccess(false);
        setModalMessage("Razorpay SDK failed to load. Are you online?");
        setShowModal(true);
        setLoading(false);
        return;
      }

      // Step 1: Create Order
      const orderPayload = {
        bookingId: bookingId,
        paymentType: "partial",
      };

      const orderResponse = await createRazorpayOrder(orderPayload);

      if (!orderResponse.data?.success) {
        setIsPaymentSuccess(false);
        setModalMessage(orderResponse.data?.message || "Failed to create payment order.");
        setShowModal(true);
        setLoading(false);
        return;
      }

      const { order } = orderResponse.data;

      // Step 2: Open Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Fallback to provided test key
        amount: order.amount,
        currency: order.currency,
        name: "PhotoGrapher Booking",
        description: "Partial Payment for Service",
        order_id: order.id,
        handler: async function (response) {
          try {
            setLoading(true);
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bookingId,
            };

            const verifyResponse = await verifyRazorpayPayment(verifyPayload);

            if (verifyResponse.data?.success) {
              setIsPaymentSuccess(true);
              setModalMessage("Partial payment completed successfully.");
              setShowModal(true);
            } else {
              setIsPaymentSuccess(false);
              setModalMessage(verifyResponse.data?.message || "Payment verification failed.");
              setShowModal(true);
            }
          } catch (verifyError) {
            setIsPaymentSuccess(false);
            setModalMessage(verifyError.response?.data?.message || "Payment verification failed. Please try again.");
            setShowModal(true);
          } finally {
            setLoading(false);
          }
        },
         prefill: {
          name: userDetails?.username || "User Name", // Consider fetching real name if available
          email: userDetails?.email || "user@example.com",
          contact: userDetails?.mobileNumber || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on('payment.failed', function (response) {
        setIsPaymentSuccess(false);
        setModalMessage(response.error.description || "Payment failed.");
        setShowModal(true);
      });

      paymentObject.open();
      setLoading(false); // Hide loader while modal is open

    } catch (error) {
      setIsPaymentSuccess(false);
      setModalMessage(
        error.response?.data?.message || "Payment initiation failed. Please try again."
      );
      setShowModal(true);
      setLoading(false);
    }
  };

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
          Please clear the outstanding <br />
          amount to continue
        </p>

        {/* <div className="charge-box">
  <span>Payable Now</span>
  <span className="amount">
    Rs. {payableNow}
  </span>
</div> */}

<div className="installment-details" style={{textAlign:"left"}}>

  <p>
    Remaining Amount: 
    <strong> Rs. {remainingAmount}</strong>
  </p>

  <p>
    Installment: 
    <strong>
      {currentInstallment + 1} of {totalInstallments}
    </strong>
  </p>

  <p>
    Pending Installments: 
    <strong>
      {remainingInstallments}
    </strong>
  </p>

</div>

        <div className="charge-box">
          <span>Outstanding Amount</span>
          <span className="amount">Rs. {payableNow}</span>
        </div>

        <div className="charge-btn-group">
          <button
            className="cancel-btn-outstandingAmount"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="confirm-cancel-btn"
            onClick={handlePartialPayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
        
      </div>

        <CommonMessageModal
        show={showModal}
        message={modalMessage}
        onClose={() => {
          setShowModal(false);
          if (isPaymentSuccess) {
            navigate("/booking-success", { replace: true });
          }
        }}
      />
    </Modal>
  );
};

export default OutstandingAmountModal;




// import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
// import "../AllBookings/CancellatonModals/CancellationChargeModal/CancellationChargeModal.css";
// import { putPaymentBooking } from "../../../../utils/APIs/bookingApis";

// const OutstandingAmountModal = ({
//   show,
//   onClose,
//   onSuccess,
//   bookingId,
//   outstandingAmount
// }) => {
//   const [loading, setLoading] = useState(false);

//   const handlePayNow = async () => {
//     if (!bookingId) return;

//     try {
//       setLoading(true);

//       const today = new Date().toLocaleDateString("en-IN");

//       const payload = {
//         partial_Payment: false,
//         full_Payment: true,
//         outStandingAmount: 0,
//         paymentStatus: "partially paid",
//         paymentDate: today,
//         paymentMode: "online"
//       };

//       await putPaymentBooking(bookingId, payload);

//       onSuccess();
//     } catch (error) {
//       console.error("Payment update failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

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
//           Please clear the outstanding <br />
//           amount to continue
//         </p>

//         <div className="charge-box">
//           <span>Outstanding Amount</span>
//           <span className="amount">Rs. {outstandingAmount}</span>
//         </div>

//         <div className="charge-btn-group">
//           <button
//             className="cancel-btn-outstandingAmount"
//             onClick={onClose}
//             disabled={loading}
//           >
//             Cancel
//           </button>

//           <button
//             className="confirm-cancel-btn"
//             onClick={handlePayNow}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Pay Now"}
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default OutstandingAmountModal;
