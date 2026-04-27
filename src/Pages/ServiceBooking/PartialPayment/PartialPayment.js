
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./PartialPayment.css";
// // import {createRazorpayOrder, verifyRazorpayPayment } from "../../../utils/APIs/bookingApis";
// import Loader from "../../../Template/Loader/Loader";
// import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
// import { useEffect } from "react";
// import { GetProfile } from "../../../utils/APIs/myProfileApis";
// import { createRazorpayOrder, verifyRazorpayPayment } from "../../../utils/APIs/razorpayPaymentApis";

// const PartialPayment = ({ serviceCost = 0, bookingId }) => {
//   const navigate = useNavigate();

//   const [promoCode, setPromoCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
//    const [userDetails, setUserDetails] = useState({
//     username: "User Name", // Consider fetching real user details if available
//     email: "user@example.com",
//     mobileNumber: "9999999999",
//   });
//   // ✅ Dynamic ID selection

//    useEffect(() => {
//       const fetchUserDetails = async () => {
//         try {
//           const response = await GetProfile();
//           if (response.data?.success) {
//             setUserDetails(response.data);
//           }
//         } catch (error) {
//           console.error("Error fetching user details:", error);
//         }
//       };
  
//       fetchUserDetails();
//     }, []);
//   const activePaymentId = bookingId;

//   const numericServiceCost =
//     typeof serviceCost === "string"
//       ? Number(serviceCost.replace(/,/g, ""))
//       : Number(serviceCost);

//   const halfAmount = numericServiceCost / 2;

//   // const getFormattedDate = () => {
//   //   const date = new Date();
//   //   const day = String(date.getDate()).padStart(2, "0");
//   //   const month = String(date.getMonth() + 1).padStart(2, "0");
//   //   const year = date.getFullYear();
//   //   return `${day}-${month}-${year}`;
//   // };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePartialPayment = async () => {
//     try {
//       if (!activePaymentId) {
//         setIsPaymentSuccess(false);
//         setModalMessage("Payment ID not found. Please try again.");
//         setShowModal(true);
//         return;
//       }

//       setLoading(true);

//       const res = await loadRazorpayScript();
//       if (!res) {
//         setIsPaymentSuccess(false);
//         setModalMessage("Razorpay SDK failed to load. Are you online?");
//         setShowModal(true);
//         setLoading(false);
//         return;
//       }

//       // Step 1: Create Order
//       const orderPayload = {
//         bookingId: activePaymentId,
//         paymentType: "partial",
//       };

//       const orderResponse = await createRazorpayOrder(orderPayload);

//       if (!orderResponse.data?.success) {
//         setIsPaymentSuccess(false);
//         setModalMessage(orderResponse.data?.message || "Failed to create payment order.");
//         setShowModal(true);
//         setLoading(false);
//         return;
//       }

//       const { order } = orderResponse.data;

//       // Step 2: Open Razorpay Checkout
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Fallback to provided test key
//         amount: order.amount,
//         currency: order.currency,
//         name: "PhotoGrapher Booking",
//         description: "Partial Payment for Service",
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             setLoading(true);
//             const verifyPayload = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               bookingId: activePaymentId,
//             };

//             const verifyResponse = await verifyRazorpayPayment(verifyPayload);

//             if (verifyResponse.data?.success) {
//               setIsPaymentSuccess(true);
//               setModalMessage("Partial payment completed successfully.");
//               setShowModal(true);
//             } else {
//               setIsPaymentSuccess(false);
//               setModalMessage(verifyResponse.data?.message || "Payment verification failed.");
//               setShowModal(true);
//             }
//           } catch (verifyError) {
//             setIsPaymentSuccess(false);
//             setModalMessage(verifyError.response?.data?.message || "Payment verification failed. Please try again.");
//             setShowModal(true);
//           } finally {
//             setLoading(false);
//           }
//         },
//          prefill: {
//           name: userDetails?.username || "User Name", // Consider fetching real name if available
//           email: userDetails?.email || "user@example.com",
//           contact: userDetails?.mobileNumber || "9999999999",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const paymentObject = new window.Razorpay(options);

//       paymentObject.on('payment.failed', function (response) {
//         setIsPaymentSuccess(false);
//         setModalMessage(response.error.description || "Payment failed.");
//         setShowModal(true);
//       });

//       paymentObject.open();
//       setLoading(false); // Hide loader while modal is open

//     } catch (error) {
//       setIsPaymentSuccess(false);
//       setModalMessage(
//         error.response?.data?.message || "Payment initiation failed. Please try again."
//       );
//       setShowModal(true);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <Loader />}

//       <div className="partial-payment-container">
//         <div className="partial-payment-content">

//           <div className="partial-details-text">
//             <p className="pay-now-text">
//               Pay <span className="highlight-green">₹{halfAmount}</span> now
//             </p>
//             <p className="outstanding-text">
//               Outstanding amount{" "}
//               <span className="highlight-yellow">₹{halfAmount}</span>{" "}
//               to be paid after the event
//             </p>
//           </div>

//           <div className="promo-code-section">
//             <h3 className="promo-title">Have a promo code?</h3>
//             <div className="promo-input-group">
//               <input
//                 type="text"
//                 placeholder="Enter Code"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//                 className="promo-input"
//               />
//               <button className="btn-apply">Apply</button>
//             </div>
//           </div>

//           <div className="payment-summary-grid">
//             <div className="summary-item">
//               <span className="summary-amount green-text">
//                 ₹{serviceCost}
//               </span>
//               <span className="summary-label">
//                 Total Payable<br />Amount
//               </span>
//             </div>

//             <div className="summary-item">
//               <span className="summary-amount silver-text">
//                 ₹{halfAmount}
//               </span>
//               <span className="summary-label">
//                 Upfront<br />Payment<br />(Now)
//               </span>
//             </div>

//             <div className="summary-item">
//               <span className="summary-amount gold-text">
//                 ₹{halfAmount}
//               </span>
//               <span className="summary-label">
//                 Outstanding<br />Amount
//               </span>
//             </div>
//           </div>

//           <button
//             className="btn-continue-payment"
//             onClick={handlePartialPayment}
//             disabled={loading}
//           >
//             Continue to Payment
//           </button>

//         </div>
//       </div>

//       <CommonMessageModal
//         show={showModal}
//         message={modalMessage}
//         onClose={() => {
//           setShowModal(false);
//           if (isPaymentSuccess) {
//             navigate("/booking-success", { replace: true });
//           }
//         }}
//       />
//     </>
//   );
// };

// export default PartialPayment;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PartialPayment.css";
// import {createRazorpayOrder, verifyRazorpayPayment } from "../../../utils/APIs/bookingApis";
import Loader from "../../../Template/Loader/Loader";
import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
import { useEffect } from "react";
import { GetProfile } from "../../../utils/APIs/myProfileApis";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../../utils/APIs/razorpayPaymentApis";

const PartialPayment = ({ totalAmount = 0, bookingId }) => {
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
   const [userDetails, setUserDetails] = useState({
    username: "User Name", // Consider fetching real user details if available
    email: "user@example.com",
    mobileNumber: "9999999999",
  });
  // ✅ Dynamic ID selection

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
  const activePaymentId = bookingId;

  const numericServiceCost =
  typeof totalAmount === "string"
    ? Number(totalAmount.replace(/,/g, ""))
    : Number(totalAmount);
  // const halfAmount = numericServiceCost / 2;

  /* ✅ Limits */
const SPLIT_THRESHOLD = 1000000; // ₹10 Lakhs
const SAFE_MAX_AMOUNT = 450000; // ₹4.5 Lakhs

/* ✅ Calculate payable now */
const calculatePayableAmount = (totalAmount) => {
  let amountToPay = totalAmount;

  // Case 1: Above 10 Lakhs → Dynamic slicing
  if (totalAmount > SPLIT_THRESHOLD) {
    let basisAmount = totalAmount;

    let slicesNeeded = Math.ceil(
      basisAmount / SAFE_MAX_AMOUNT
    );

    let dynamicStepAmount = Math.ceil(
      basisAmount / slicesNeeded
    );

    amountToPay = Math.min(
      amountToPay,
      dynamicStepAmount,
      SAFE_MAX_AMOUNT
    );

  } 
  // Case 2: 10 Lakhs or below → 50% split
  else {
    amountToPay = Math.ceil(totalAmount / 2);
  }

  return amountToPay;
};

/* ✅ Final amounts */
const payableNow = calculatePayableAmount(numericServiceCost);

const outstandingAmount =
  numericServiceCost - payableNow;

  
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
      if (!activePaymentId) {
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
        bookingId: activePaymentId,
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
              bookingId: activePaymentId,
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
    <>
      {loading && <Loader />}

      <div className="partial-payment-container">
        <div className="partial-payment-content">

          <div className="partial-details-text">
            <p className="pay-now-text">
              Pay <span className="highlight-green">₹{payableNow}</span> now
            </p>
            <p className="outstanding-text">
              Outstanding amount{" "}
              <span className="highlight-yellow">₹{outstandingAmount}</span>{" "}
              to be paid after the event
            </p>
          </div>

          <div className="promo-code-section">
            <h3 className="promo-title">Have a promo code?</h3>
            <div className="promo-input-group">
              <input
                type="text"
                placeholder="Enter Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button className="btn-apply">Apply</button>
            </div>
          </div>

          <div className="payment-summary-grid">
            <div className="summary-item">
              <span className="summary-amount green-text">
                ₹{payableNow}
              </span>
              <span className="summary-label">
                Total Payable<br />Amount
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-amount silver-text">
               ₹{payableNow}
              </span>
              <span className="summary-label">
                Upfront<br />Payment<br />(Now)
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-amount gold-text">
                ₹{outstandingAmount}
              </span>
              <span className="summary-label">
                Outstanding<br />Amount
              </span>
            </div>
          </div>

          <button
            className="btn-continue-payment"
            onClick={handlePartialPayment}
            disabled={loading}
          >
            Continue to Payment
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
    </>
  );
};

export default PartialPayment;
