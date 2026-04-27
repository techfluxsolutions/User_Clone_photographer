// import React, { useState } from "react";
// import "./CalenderBookingPage.css";
// import { useNavigate } from "react-router-dom";

// const CalenderBookingPage = () => {
//   const [selectedDate, setSelectedDate] = useState(25);
//   const year = 2025;
//   const month = 11; // December (0-based)

// const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sun
// const daysInMonth = new Date(year, month + 1, 0).getDate();
// const daysInPrevMonth = new Date(year, month, 0).getDate();
// const navigate = useNavigate();


//   return (
//     <div className="CalenderBooking-page">
//       <h2 className="CalenderBooking-page-title">
//         Review your Booking Details
//       </h2>

//       <div className="CalenderBooking-container container">
//         <div className="row g-4 align-items-stretch">

//           {/* PICK A DATE */}
//           <div className="col-12 col-md-12 col-lg-4">
//             <h4 className="CalenderBooking-section-title">Pick a Date</h4>

//             <div className="CalenderBooking-calendar-box">
//               <p className="CalenderBooking-calendar-month">December</p>

//               <div className="CalenderBooking-calendar-grid">
//                 {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(day => (
//                   <span
//                     key={day}
//                     className="CalenderBooking-calendar-day"
//                   >
//                     {day}
//                   </span>
//                 ))}

//                 {/* {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
//                   <span
//                     key={date}
//                     className={`CalenderBooking-calendar-date ${
//                       selectedDate === date ? "active" : ""
//                     }`}
//                     onClick={() => setSelectedDate(date)}
//                   >
//                     {date}
//                   </span>
//                 ))} */}

//                 {/* Previous month dates */}
//                 {Array.from({ length: firstDayOfMonth }, (_, i) => (
//                   <span
//                     key={`prev-${i}`}
//                     className="CalenderBooking-calendar-date disabled"
//                   >
//                     {daysInPrevMonth - firstDayOfMonth + i + 1}
//                   </span>
//                 ))}

//                 {/* Current month dates */}
//                 {Array.from({ length: daysInMonth }, (_, i) => {
//                   const date = i + 1;
//                   return (
//                     <span
//                       key={date}
//                       className={`CalenderBooking-calendar-date ${
//                         selectedDate === date ? "active" : ""
//                       }`}
//                       onClick={() => setSelectedDate(date)}
//                     >
//                       {date}
//                     </span>
//                   );
//                 })}

//                 {/* Next month dates */}
//                 {Array.from(
//                   {
//                     length:
//                       (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7
//                   },
//                   (_, i) => (
//                     <span
//                       key={`next-${i}`}
//                       className="CalenderBooking-calendar-date disabled"
//                     >
//                       {i + 1}
//                     </span>
//                   )
//                 )}

//               </div>
//             </div>
//           </div>

//           {/* ADDRESS */}
//           <div className="col-12 col-md-12 col-lg-8">
//             <h4 className="CalenderBooking-section-title">Address</h4>

//             <div className="CalenderBooking-address-box">
//               {[
//                 "House/Flat No.",
//                 "Street/Lane Name",
//                 "Landmark",
//                 "City/Town/Village",
//                 "State",
//                 "Postal Code"
//               ].map(label => (
//                 <div key={label} className="CalenderBooking-address-row">
//                   <label>{label}</label>
//                   <input type="text" />
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* BUTTON SECTION */}
//         <div className="CalenderBooking-button-section">
//           <button className="CalenderBooking-book-btn" onClick={() => navigate("/payment-details")}>
//             Book your Service
//           </button>
//           <div className="CalenderBooking-back-link">Back</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalenderBookingPage;




// import React, { useState } from "react";
// import "./CalenderBookingPage.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import { createBookingUsingPrice } from "../../../utils/APIs/bookingApis";
// import Loader from "../../../Template/Loader/Loader";
// import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";


// const CalenderBookingPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   /* ✅ IDs & price from previous page */
//   const {
//     mainServiceId,
//     additionalServiceId,
//     price
//   } = location.state || {};

//   /* ✅ Calendar state */
//   const [selectedDate, setSelectedDate] = useState(25);
//   const year = 2025;
//   const month = 11; // December (0-based)

//   const firstDayOfMonth = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const daysInPrevMonth = new Date(year, month, 0).getDate();

//   /* ✅ Address state */
//   const [address, setAddress] = useState({
//     flatOrHouseNo: "",
//     streetName: "",
//     landMark: "",
//     city: "",
//     state: "",
//     postalCode: ""
//   });

//   /* ✅ Loader & Modal state */
//   const [loading, setLoading] = useState(false);
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [redirectAfterModal, setRedirectAfterModal] = useState(false);

//   /* ✅ BOOKING API CALL */
//   const handleBooking = async () => {
//     try {
//       setLoading(true);

//       const clientId = localStorage.getItem("client_id");

//       const payload = {
//         service_id: mainServiceId,
//         additionalServicesId: additionalServiceId,
//         client_id: clientId,
//         bookingDate: `${selectedDate}-12-${year}`,
//         flatOrHouseNo: address.flatOrHouseNo,
//         streetName: address.streetName,
//         landMark: address.landMark,
//         city: address.city,
//         state: address.state,
//         postalCode: address.postalCode,
//         totalAmount: Number(price)
//       };

//       console.log("Booking Payload:", payload);

//       const response = await createBookingUsingPrice(payload);

//       if (response.data?.success) {
//         setModalMessage("Booking created successfully");
//         setRedirectAfterModal(true);
//         setShowMessageModal(true);
//       } else {
//         setModalMessage(response.data?.message || "Booking failed");
//         setShowMessageModal(true);
//       }
//     } catch (error) {
//       setModalMessage(
//         error.response?.data?.message || "Something went wrong"
//       );
//       setShowMessageModal(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ✅ Loader */}
//       {loading && <Loader />}

//       <div className="CalenderBooking-page">
//         <h2 className="CalenderBooking-page-title">
//           Review your Booking Details
//         </h2>

//         <div className="CalenderBooking-container container">
//           <div className="row g-4 align-items-stretch">

//             {/* PICK A DATE */}
//             <div className="col-12 col-md-12 col-lg-4">
//               <h4 className="CalenderBooking-section-title">Pick a Date</h4>

//               <div className="CalenderBooking-calendar-box">
//                 <p className="CalenderBooking-calendar-month">December</p>

//                 <div className="CalenderBooking-calendar-grid">
//                   {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(day => (
//                     <span key={day} className="CalenderBooking-calendar-day">
//                       {day}
//                     </span>
//                   ))}

//                   {/* Previous month */}
//                   {Array.from({ length: firstDayOfMonth }, (_, i) => (
//                     <span
//                       key={`prev-${i}`}
//                       className="CalenderBooking-calendar-date disabled"
//                     >
//                       {daysInPrevMonth - firstDayOfMonth + i + 1}
//                     </span>
//                   ))}

//                   {/* Current month */}
//                   {Array.from({ length: daysInMonth }, (_, i) => {
//                     const date = i + 1;
//                     return (
//                       <span
//                         key={date}
//                         className={`CalenderBooking-calendar-date ${
//                           selectedDate === date ? "active" : ""
//                         }`}
//                         onClick={() => setSelectedDate(date)}
//                       >
//                         {date}
//                       </span>
//                     );
//                   })}

//                   {/* Next month */}
//                   {Array.from(
//                     { length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7 },
//                     (_, i) => (
//                       <span
//                         key={`next-${i}`}
//                         className="CalenderBooking-calendar-date disabled"
//                       >
//                         {i + 1}
//                       </span>
//                     )
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* ADDRESS */}
//             <div className="col-12 col-md-12 col-lg-8">
//               <h4 className="CalenderBooking-section-title">Address</h4>

//               <div className="CalenderBooking-address-box">
//                 <div className="CalenderBooking-address-row">
//                   <label>House/Flat No.</label>
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setAddress({ ...address, flatOrHouseNo: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="CalenderBooking-address-row">
//                   <label>Street/Lane Name</label>
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setAddress({ ...address, streetName: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="CalenderBooking-address-row">
//                   <label>Landmark</label>
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setAddress({ ...address, landMark: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="CalenderBooking-address-row">
//                   <label>City/Town/Village</label>
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setAddress({ ...address, city: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="CalenderBooking-address-row">
//                   <label>State</label>
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setAddress({ ...address, state: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="CalenderBooking-address-row">
//                   <label>Postal Code</label>
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setAddress({ ...address, postalCode: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* BUTTON SECTION */}
//           <div className="CalenderBooking-button-section">
//             <button
//               className="CalenderBooking-book-btn"
//               onClick={handleBooking}
//             >
//               Book your Service
//             </button>
//             <div className="CalenderBooking-back-link" onClick={() => navigate(-1)}>
//               Back
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Success / Error Modal */}
//       <CommonMessageModal
//         show={showMessageModal}
//         message={modalMessage}
//         onClose={() => {
//           setShowMessageModal(false);
//           if (redirectAfterModal) {
//             setRedirectAfterModal(false);
//             navigate("/payment-details");
//           }
//         }}
//       />
//     </>
//   );
// };

// export default CalenderBookingPage;



import React, { useState } from "react";
import "./CalenderBookingPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { createBookingUsingPrice } from "../../../utils/APIs/bookingApis";
import Loader from "../../../Template/Loader/Loader";
import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
import PleaseLoginModal from "../../../AuthModule/PleaseLoginModal/PleaseLoginModal";
import NavigationButtons from "../../../Template/NavigationButtons/NavigationButtons";

const CalenderBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ✅ IDs & price from previous page */
  const { mainServiceId, additionalServiceId, price } = location.state || {};
 

  /* ✅ Today reference */
  const today = new Date();

  /* ✅ Calendar state */
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  /* ✅ Address state */
  const [address, setAddress] = useState({
    flatOrHouseNo: "",
    streetName: "",
    landMark: "",
    city: "",
    state: "",
    postalCode: "",
  });

  /* ✅ Loader & Modals */
  const [loading, setLoading] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [redirectAfterModal, setRedirectAfterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // ✅ NEW

  /* ✅ Booking data */
  const [bookingData, setBookingData] = useState(null);

  /* ✅ Month navigation */
  const handlePrevMonth = () => {
    const isCurrentMonth =
      currentYear === today.getFullYear() &&
      currentMonth === today.getMonth();

    if (isCurrentMonth) return;

    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  /* ✅ BOOKING API CALL */
  const handleBooking = async () => {
    const token = localStorage.getItem("PhotographerUserToken");
    console.log("price",price)
    if (!token) {
      const bookingPayload = {
        service_id: mainServiceId,
        additionalServicesId: additionalServiceId,
        selectedDate:selectedDate,
        currentMonth:currentMonth,
        currentYear:currentYear,
        bookingDate: `${selectedDate}-${currentMonth + 1}-${currentYear}`,
        flatOrHouseNo: address.flatOrHouseNo,
        streetName: address.streetName,
        landMark: address.landMark,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        totalAmount: Number(price),

      };
      const existingData = localStorage.getItem("bookingData");

      if (existingData) {
        const parsedData = JSON.parse(existingData);

        const updatedBookingData = {
          ...parsedData,        // keep old values
          ...bookingPayload,    // overwrite only updated fields
        };

        localStorage.setItem(
          "bookingData",
          JSON.stringify(updatedBookingData)
        );
      }
      else {
        localStorage.setItem(
          "bookingData",
          JSON.stringify(bookingPayload)
        );
      }

      setShowLoginModal(true);
      return;
    }

    try {
      setLoading(true);

      const clientId = localStorage.getItem("client_id");

      const payload = {
        service_id: mainServiceId,
        additionalServicesId: additionalServiceId,
        client_id: clientId,
        bookingDate: `${selectedDate}-${currentMonth + 1}-${currentYear}`,
        flatOrHouseNo: address.flatOrHouseNo,
        streetName: address.streetName,
        landMark: address.landMark,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        totalAmount: Number(price),
      };

      const response = await createBookingUsingPrice(payload);

      if (response.data?.success) {
        setBookingData(response.data.data);
        setModalMessage("Booking created successfully");
        setRedirectAfterModal(true);
        setShowMessageModal(true);
      } else {
        setModalMessage(response.data?.message || "Booking failed");
        setShowMessageModal(true);
      }
    } catch (error) {
      setModalMessage(
        error.response?.data?.message || "Something went wrong"
      );
      setShowMessageModal(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {loading && <Loader />}

      <div className="CalenderBooking-page" style={{ position: 'relative' }}>
        <NavigationButtons />
        <h2 className="CalenderBooking-page-title">
          Review your Booking Details
        </h2>

        <div className="CalenderBooking-container container">
          <div className="row g-4 align-items-stretch">

            {/* PICK A DATE */}
            <div className="col-12 col-md-12 col-lg-4">
              <h4 className="CalenderBooking-section-title">Pick a Date</h4>

              <div className="CalenderBooking-calendar-box">
                <div className="CalenderBooking-calendar-month">
                  <span onClick={handlePrevMonth} style={{ cursor: "pointer" }}>
                    ‹
                  </span>

                  <span style={{ margin: "0 12px" }}>
                    {new Date(currentYear, currentMonth).toLocaleString(
                      "default",
                      { month: "long" }
                    )}{" "}
                    {currentYear}
                  </span>

                  <span onClick={handleNextMonth} style={{ cursor: "pointer" }}>
                    ›
                  </span>
                </div>

                <div className="CalenderBooking-calendar-grid">
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
                    <span key={day} className="CalenderBooking-calendar-day">
                      {day}
                    </span>
                  ))}

                  {Array.from({ length: firstDayOfMonth }, (_, i) => (
                    <span
                      key={`prev-${i}`}
                      className="CalenderBooking-calendar-date disabled"
                    >
                      {daysInPrevMonth - firstDayOfMonth + i + 1}
                    </span>
                  ))}

                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const date = i + 1;
                    const isPastDate =
                      currentYear === today.getFullYear() &&
                      currentMonth === today.getMonth() &&
                      date < today.getDate();

                    return (
                      <span
                        key={date}
                        className={`CalenderBooking-calendar-date ${selectedDate === date ? "active" : ""
                          } ${isPastDate ? "disabled" : ""}`}
                        onClick={() => {
                          if (!isPastDate) setSelectedDate(date);
                        }}
                      >
                        {date}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="col-12 col-md-12 col-lg-8">
              <h4 className="CalenderBooking-section-title">Address</h4>

              <div className="CalenderBooking-address-box">
                {[
                  ["flatOrHouseNo", "House/Flat No."],
                  ["streetName", "Street/Lane Name"],
                  ["landMark", "Landmark"],
                  ["city", "City/Town/Village"],
                  ["state", "State"],
                  ["postalCode", "Postal Code"],
                ].map(([key, label]) => (
                  <div key={key} className="CalenderBooking-address-row">
                    <label>{label}</label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setAddress({ ...address, [key]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="CalenderBooking-button-section">
            <button
              className="CalenderBooking-book-btn"
              onClick={handleBooking}
            >
              Book your Service
            </button>

          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      <CommonMessageModal
        show={showMessageModal}
        message={modalMessage}
        onClose={() => {
          setShowMessageModal(false);
          if (redirectAfterModal && bookingData) {
            setRedirectAfterModal(false);
            navigate("/payment-details", {
              state: {
                mainServiceId: bookingData.service_id,
                additionalServiceId: bookingData.additionalServicesId,
                bookingId: bookingData._id,
              },
            });
          }
        }}
      />

      {/* 🔐 LOGIN REQUIRED MODAL */}
      <PleaseLoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default CalenderBookingPage;
