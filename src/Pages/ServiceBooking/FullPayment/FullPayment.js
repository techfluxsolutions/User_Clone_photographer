// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./FullPayment.css";
// import Loader from "../../../Template/Loader/Loader";
// import { putPaymentBooking } from "../../../utils/APIs/bookingApis";
// import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";

// const FullPayment = ({ serviceCost = 0, bookingId }) => {
//   const navigate = useNavigate();

//   const [promoCode, setPromoCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); // ✅ success flag

//   const getFormattedDate = () => {
//     const date = new Date();
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const handleFullPayment = async () => {
//     try {
//       if (!bookingId) {
//         setIsPaymentSuccess(false);
//         setModalMessage("Booking ID not found. Please try again.");
//         setShowModal(true);
//         return;
//       }

//       setLoading(true);

//       const payload = {
//         partial_Payment: false,
//         full_Payment: true,
//         outStandingAmount: 0,
//         paymentStatus: "fully paid",
//         paymentDate: getFormattedDate(),
//         paymentMode: "online",
//       };

//       const response = await putPaymentBooking(bookingId, payload);

//       if (response.data?.success) {
//         setIsPaymentSuccess(true); // ✅ mark success
//         setModalMessage("Payment completed successfully.");
//       } else {
//         setIsPaymentSuccess(false);
//         setModalMessage(response.data?.message || "Payment failed.");
//       }

//       setShowModal(true);
//     } catch (error) {
//       setIsPaymentSuccess(false);
//       setModalMessage(
//         error.response?.data?.message || "Payment failed. Please try again."
//       );
//       setShowModal(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <Loader />}

//       <div className="full-payment-container">
//         <div className="full-payment-content">

//           {/* PROMO CODE */}
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

//           {/* PAYMENT SUMMARY */}
//           <div className="payment-summary-single">
//             <span className="summary-label-single">
//               Total Payable Amount
//             </span>
//             <span className="summary-amount-single">
//               ₹{serviceCost}
//             </span>
//           </div>

//           {/* CONTINUE BUTTON */}
//           <button
//             className="btn-continue-payment"
//             onClick={handleFullPayment}
//             disabled={loading}
//           >
//             Continue to Payment
//           </button>

//         </div>
//       </div>

//       {/* SUCCESS / ERROR MODAL */}
//       <CommonMessageModal
//         show={showModal}
//         message={modalMessage}
//         onClose={() => {
//           setShowModal(false);
//           if (isPaymentSuccess) {
//             navigate("/booking-success"); // ✅ navigate ONLY on success
//           }
//         }}
//       />
//     </>
//   );
// };

// export default FullPayment;



import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FullPayment.css";
// 
import Loader from "../../../Template/Loader/Loader";
// import { createRazorpayOrder, verifyRazorpayPayment } from "../../../utils/APIs/bookingApis";
import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
// import { createRazorpayOrder, verifyRazorpayPayment } from "../../../utils/APIs/razorpayPaymentApis";
import { GetProfile } from "../../../utils/APIs/myProfileApis";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../../utils/APIs/razorpayPaymentApis";
const FullPayment = ({ serviceCost = 0, bookingId}) => {
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
  // getuser details API can be called here to set real user details for prefill

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


  // ✅ Dynamic ID selection
  const activePaymentId = bookingId;

  // const getFormattedDate = () => {
  //   const date = new Date();
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleFullPayment = async () => {
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
        paymentType: "full",
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
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_SVlHgQL1Trpo1W", // Fallback to provided test key
        amount: order.amount,
        currency: order.currency,
        name: "PhotoGrapher Booking",
        description: "Full Payment for Service",
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
              setModalMessage("Payment completed successfully.");
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





// const handleFullPayment = async () => {
//   try {
//     if (!activePaymentId) {
//       setModalMessage("Payment ID not found");
//       setShowModal(true);
//       return;
//     }

//     setLoading(true);

//     // 1️⃣ Create Order
//     const { data } = await createRazorpayOrder(serviceCost);
//     const order = data.order;

//     // 2️⃣ Razorpay Options
//     const options = {
//       key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: "INR",
//       name: "Your Company",
//       description: "Full Payment",
//       order_id: order.id,

//       handler: async function (response) {
//         try {
//           // 3️⃣ Verify Payment
//           const verifyRes = await verifyRazorpayPayment(response);

//           if (verifyRes.data.success) {
//             // 4️⃣ Update Booking
//             const payload = {
//               partial_Payment: false,
//               full_Payment: true,
//               outStandingAmount: 0,
//               paymentStatus: "fully paid",
//               paymentDate: getFormattedDate(),
//               paymentMode: "online",
//               razorpay_payment_id: response.razorpay_payment_id,
//             };

//             await putPaymentBooking(activePaymentId, payload);

//             setIsPaymentSuccess(true);
//             setModalMessage("Payment successful!");
//           } else {
//             setIsPaymentSuccess(false);
//             setModalMessage("Payment verification failed");
//           }

//           setShowModal(true);
//         } catch (err) {
//           setModalMessage("Verification error");
//           setShowModal(true);
//         }
//       },

//       prefill: {
//         name: "Customer Name",
//         email: "test@email.com",
//         contact: "9999999999",
//       },

//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//   } catch (error) {
//     setModalMessage("Payment failed");
//     setShowModal(true);
//   } finally {
//     setLoading(false);
//   }
// };
  return (
    <>
      {loading && <Loader />}

      <div className="full-payment-container">
        <div className="full-payment-content">

          {/* PROMO CODE */}
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

          {/* PAYMENT SUMMARY */}
          <div className="payment-summary-single">
            <span className="summary-label-single">
              Total Payable Amount
            </span>
            <span className="summary-amount-single">
              ₹{serviceCost}
            </span>
          </div>

          {/* CONTINUE BUTTON */}
          <button
            className="btn-continue-payment"
            onClick={handleFullPayment}
            disabled={loading}
          >
            Continue to Payment
          </button>

        </div>
      </div>

      {/* SUCCESS / ERROR MODAL */}
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

export default FullPayment;
