// import React, { useEffect, useState } from "react";
// import "./PaymentDetails.css";
// import PartialPayment from "../PartialPayment/PartialPayment";
// import FullPayment from "../FullPayment/FullPayment";
// import { useLocation } from "react-router-dom";
// import { getBookingPrice } from "../../../utils/APIs/bookingApis";
// import Loader from "../../../Template/Loader/Loader";

// const PaymentDetails = () => {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [serviceCost, setServiceCost] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const location = useLocation();
//   const MAX_PAYMENT_LIMIT = 1000000; // ₹10 Lakhs
//   /* ✅ IDs from previous page */
//   const {
//     mainServiceId,
//     additionalServiceId,
//     bookingId,
//     serviceCost: passedServiceCost,
//   } = location.state || {};

//   console.log("bookingId", bookingId)
//   const handlePaymentChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   /* ✅ Fetch booking price OR use passed quote budget */
//   useEffect(() => {
//     const fetchPrice = async () => {
//       try {
//         setLoading(true);

//         const response = await getBookingPrice({
//           serviceId: mainServiceId,
//           additionalServicesId: additionalServiceId,
//         });

//         if (response.data?.success) {
//           setServiceCost(response.data.data.serviceCost);
//         }
//       } catch (error) {
//         console.error("Failed to fetch service price", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // ✅ If coming from quote accept → use passed budget
//     if (passedServiceCost) {
//       setServiceCost(passedServiceCost);
//       return;
//     }

//     // ✅ Normal booking flow
//     if (mainServiceId && additionalServiceId) {
//       fetchPrice();
//     }
//   }, [mainServiceId, additionalServiceId, passedServiceCost]);

//   if (loading) return <Loader />;

//   return (
//     <div className="payment-details-container">
//       <div className="payment-details-content">
//         <h1 className="payment-title">Payment Details</h1>
//         <p className="payment-subtitle">
//           Review your payment before proceeding
//         </p>

//         <div className="booking-amount-section">
//           <span className="amount-label">Booking Amount</span>
//           <span className="amount-value">₹{serviceCost}</span>
//         </div>

//         <div className="payment-divider"></div>

//         <h2 className="payment-method-title">
//           How would you like to pay ?
//         </h2>

//         {/* RADIO BUTTONS */}
//         <div className="payment-options">
//           <label className="payment-option">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="partial"
//               checked={paymentMethod === "partial"}
//               onChange={handlePaymentChange}
//             />
//             <span className="radio-custom"></span>
//             <span className="option-label">Partial Payment</span>
//           </label>

//           <label className="payment-option">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="full"
//               checked={paymentMethod === "full"}
//               onChange={handlePaymentChange}
//             />
//             <span className="radio-custom"></span>
//             <span className="option-label">Full Payment</span>
//           </label>
//         </div>

//         {/* CONDITIONAL RENDERING */}
//         {paymentMethod === "partial" && (
//           <PartialPayment
//             serviceCost={serviceCost}
//             bookingId={bookingId}
//           />
//         )}

//         {paymentMethod === "full" && (
//           <FullPayment
//             serviceCost={serviceCost}
//             bookingId={bookingId}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentDetails;




import React, { useEffect, useState } from "react";
import "./PaymentDetails.css";
import PartialPayment from "../PartialPayment/PartialPayment";
import FullPayment from "../FullPayment/FullPayment";
import { useLocation } from "react-router-dom";
import { getBookingPrice } from "../../../utils/APIs/bookingApis";
import Loader from "../../../Template/Loader/Loader";
import NavigationButtons from "../../../Template/NavigationButtons/NavigationButtons";

const PaymentDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [serviceCost, setServiceCost] = useState(0);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  /* ✅ Payment limit */
  const MAX_PAYMENT_LIMIT = 1000000; // ₹10 Lakhs

  /* ✅ IDs from previous page */
  const {
    mainServiceId,
    additionalServiceId,
    bookingId,
    serviceCost: passedServiceCost,
  } = location.state || {};

  console.log("bookingId", bookingId);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  /* ✅ Partial payment calculation */
  // const calculatePartialAmount = (totalAmount) => {
  //   let amountToPay = totalAmount;

  //   if (amountToPay > MAX_PAYMENT_LIMIT) {
  //     let basisAmount = totalAmount;

  //     let stepAmount = Math.ceil(basisAmount / 4);

  //     if (stepAmount > MAX_PAYMENT_LIMIT) {
  //       stepAmount = Math.ceil(basisAmount / 6);
  //     }

  //     amountToPay = Math.min(
  //       amountToPay,
  //       stepAmount,
  //       MAX_PAYMENT_LIMIT
  //     );
  //   }

  //   return amountToPay;
  // };


  /* ✅ Partial payment calculation (Dynamic Safe Split) */
const SAFE_MAX_AMOUNT = 450000; // ₹4.5 Lakhs safe per transaction

const calculatePartialAmount = (totalAmount) => {
  let amountToPay = totalAmount;

  if (amountToPay > SAFE_MAX_AMOUNT) {
    let basisAmount = totalAmount;

    // Dynamically calculate required slices
    let slicesNeeded = Math.ceil(
      basisAmount / SAFE_MAX_AMOUNT
    );

    // Calculate safe step amount
    let dynamicStepAmount = Math.ceil(
      basisAmount / slicesNeeded
    );

    // Ensure safe limit
    amountToPay = Math.min(
      amountToPay,
      dynamicStepAmount,
      SAFE_MAX_AMOUNT
    );
  }

  return amountToPay;
};
  const partialAmount = calculatePartialAmount(serviceCost);

  /* ✅ Fetch booking price OR use passed quote budget */
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);

        const response = await getBookingPrice({
          serviceId: mainServiceId,
          additionalServicesId: additionalServiceId,
        });

        console.log("BOOKING RESPONSE",response?.data)

        if (response.data?.success) {
          setServiceCost(response.data.data.serviceCost);

        }
      } catch (error) {
        console.error("Failed to fetch service price", error);
      } finally {
        setLoading(false);
      }
    };

    // ✅ If coming from quote accept → use passed budget
    if (passedServiceCost) {
      setServiceCost(passedServiceCost);
      return;
    }

    // ✅ Normal booking flow
    if (mainServiceId && additionalServiceId) {
      fetchPrice();
    }
  }, [mainServiceId, additionalServiceId, passedServiceCost]);

  /* ✅ Auto-switch to partial if amount > limit */
  useEffect(() => {
    if (
      serviceCost > MAX_PAYMENT_LIMIT &&
      paymentMethod === "full"
    ) {
      setPaymentMethod("partial");
    }
  }, [serviceCost, paymentMethod]);

  if (loading) return <Loader />;

  return (
    <div className="payment-details-container" style={{ position: 'relative' }}>
      <NavigationButtons />
      <div className="payment-details-content">
        <h1 className="payment-title">Payment Details</h1>

        <p className="payment-subtitle">
          Review your payment before proceeding
        </p>

        {/* Booking Amount */}
        <div className="booking-amount-section">
          <span className="amount-label">
            Booking Amount
          </span>

          <span className="amount-value">
            ₹{serviceCost}
          </span>
        </div>

        <div className="payment-divider"></div>

        <h2 className="payment-method-title">
          How would you like to pay ?
        </h2>

        {/* PAYMENT OPTIONS */}
        <div className="payment-options">

          {/* Partial Payment */}
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="partial"
              checked={paymentMethod === "partial"}
              onChange={handlePaymentChange}
            />

            <span className="radio-custom"></span>

            <span className="option-label">
              Partial Payment
              {serviceCost > MAX_PAYMENT_LIMIT && (
                <small className="payment-note">
                  {" "}
                  (₹{partialAmount} payable now)
                </small>
              )}
            </span>
          </label>

          {/* Full Payment */}
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="full"
              checked={paymentMethod === "full"}
              onChange={handlePaymentChange}
              disabled={
                serviceCost > MAX_PAYMENT_LIMIT
              }
            />

            <span className="radio-custom"></span>

            <span className="option-label">
              Full Payment
              {serviceCost > MAX_PAYMENT_LIMIT && (
                <small className="payment-note">
                  {" "}
                  (Disabled above ₹10,00,000)
                </small>
              )}
            </span>
          </label>

        </div>

        {/* CONDITIONAL RENDERING */}

        {paymentMethod === "partial" && (
          // <PartialPayment
          //   serviceCost={partialAmount}
          //   totalAmount={serviceCost}
          //   bookingId={bookingId}
          // />

          <PartialPayment
            totalAmount={serviceCost}   // full amount
            bookingId={bookingId}
          />
        )}

        {paymentMethod === "full" && (
          <FullPayment
            serviceCost={serviceCost}
            bookingId={bookingId}
          />
        )}

      </div>
    </div>
  );
};

export default PaymentDetails;