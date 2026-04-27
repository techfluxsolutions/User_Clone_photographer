

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import "../AllBookings/CancellatonModals/CancellationChargeModal/CancellationChargeModal.css";
import "../../CancellatonModals/CancellationChargeModal/CancellationChargeModal.css"
import { useNavigate } from "react-router-dom";
import { GetProfile } from "../../../../../../utils/APIs/myProfileApis";
// import { createRazorpayOrder, verifyRazorpayPayment } from "../../../../../../utils/APIs/bookingApis";
import CommonMessageModal from "../../../../../CommonMessageModal/CommonMessageModal";
import "./UnlockImageModal.css"
import { getUnlockGalleryImagesPlans } from "../../../../../../utils/APIs/galleryApis";
import { createRazorpayImagePlanOrder, verifyRazorpaymagePlanPayment } from "../../../../../../utils/APIs/razorpayPaymentApis";
const UnlockImageModal = ({
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
//     const plans = [
//   { id: 1, title: "14 Days", price: 199 },
//   { id: 2, title: "28 Days", price: 349 },
//   { id: 3, title: "45 Days", price: 999 },
// ];
const [plans, setPlans] = useState([]);
const [plansLoading, setPlansLoading] = useState(false);
const [selectedPlan, setSelectedPlan] = useState(null);
console.log("selectedPlan",selectedPlan)
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
  if (!show) return;

  const fetchPlans = async () => {
    try {
      setPlansLoading(true);
      const res = await getUnlockGalleryImagesPlans();

      const apiPlans = res?.data?.data || [];
      setPlans(apiPlans);
    } catch (error) {
      console.error("Plans fetch error:", error);
      setPlans([]);
    } finally {
      setPlansLoading(false);
    }
  };

  fetchPlans();
}, [show]);

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
        planId: selectedPlan?._id,
      };

      const orderResponse = await createRazorpayImagePlanOrder(orderPayload);

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
              // bookingId: bookingId,
              cloudPlanId:selectedPlan?._id
            };

            const verifyResponse = await verifyRazorpaymagePlanPayment(verifyPayload);

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
          Please pay the amount   <br />
          to unlock the images.
        </p>

        {/* <div className="charge-box">
          <span>Outstanding Amount</span>
          <span className="amount">Rs. {outstandingAmount}</span>
        </div> */}

     <div className="plans-wrapper">
  {plansLoading ? (
    <p>Loading plans...</p>
  ) : plans.length === 0 ? (
    <p>No plans available</p>
  ) : (
    plans.map((plan) => (
      <div
        key={plan._id}
        className={`plan-card ${
          selectedPlan?._id === plan._id ? "active" : ""
        }`}
        onClick={() => setSelectedPlan(plan)}
      >
        <h4>{plan.days} Days</h4>
        <p className="price">₹ {plan.charges}</p>
      </div>
    ))
  )}
</div>

        <div className="charge-btn-group">
          <button
            className="cancel-btn-outstandingAmount"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          {/* <button
            className="confirm-cancel-btn"
            onClick={handlePartialPayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button> */}

      <button
  className="confirm-cancel-btn"
  onClick={handlePartialPayment}
  disabled={loading || !selectedPlan}
>
  {loading
    ? "Processing..."
    : `Pay ₹${selectedPlan?.charges || ""}`}
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

export default UnlockImageModal;

