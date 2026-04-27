// import React, { useState } from "react";
// import "./CalenderBookingPage.css";

// const CalenderBookingPage = () => {
//   const [selectedDate, setSelectedDate] = useState(25);

//   return (
//   <div className="calendar-page">
//     <h2 className="text-center mb-4">Review your Booking Details</h2>
//     <div className="d-flex align-items-center justify-content-center">
//       <div className="container booking-card"> 
//         <div className="row g-4">
//           {/* Pick a Date */}
//           <div className="col-lg-6 col-md-12">
//             <h5 className="mb-3">Pick a Date</h5>
//             <div className="calendar-box">
//               <p className="calendar-month">December</p>

//               <div className="calendar-grid">
//                 {[
//                   "SUN",
//                   "MON",
//                   "TUE",
//                   "WED",
//                   "THU",
//                   "FRI",
//                   "SAT",
//                 ].map((day) => (
//                   <span key={day} className="calendar-day">
//                     {day}
//                   </span>
//                 ))}

//                 {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
//                   <span
//                     key={date}
//                     className={`calendar-date ${
//                       selectedDate === date ? "active" : ""
//                     }`}
//                     onClick={() => setSelectedDate(date)}
//                   >
//                     {date}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Address */}
//           <div className="col-lg-6 col-md-12">
//             <h5 className="mb-3">Address</h5>
//             <div className="address-box">
//               <input type="text" placeholder="House/Flat No." />
//               <input type="text" placeholder="Street/Lane Name" />
//               <input type="text" placeholder="Landmark" />
//               <input type="text" placeholder="City/Town/Village" />
//               <input type="text" placeholder="State" />
//               <input type="text" placeholder="Postal Code" />
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
        
//       </div>
//     </div>
//     <div className="text-center mt-4">
//           <button className="btn book-btn">Book your Service</button>
//           <div className="mt-2">
//             <span className="back-link">Back</span>
//           </div>
//         </div>
//     </div>
//   );
// };

// export default CalenderBookingPage;



import React, { useState } from "react";
import "./CalenderBookingPage.css";

const CalenderBookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(25);

  return (
    <div className="CalenderBooking-page">
      <h2 className="CalenderBooking-page-title">
        Review your Booking Details
      </h2>

      <div className="CalenderBooking-container">
        <div className="CalenderBooking-row">

          {/* PICK A DATE */}
          <div>
            <h4 className="CalenderBooking-section-title">Pick a Date</h4>

            <div className="CalenderBooking-calendar-box">
              <p className="CalenderBooking-calendar-month">December</p>

              <div className="CalenderBooking-calendar-grid">
                {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(day => (
                  <span
                    key={day}
                    className="CalenderBooking-calendar-day"
                  >
                    {day}
                  </span>
                ))}

                {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
                  <span
                    key={date}
                    className={`CalenderBooking-calendar-date ${
                      selectedDate === date ? "active" : ""
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <h4 className="CalenderBooking-section-title">Address</h4>

            <div className="CalenderBooking-address-box">
              {[
                "House/Flat No.",
                "Street/Lane Name",
                "Landmark",
                "City/Town/Village",
                "State",
                "Postal Code"
              ].map(label => (
                <div key={label} className="CalenderBooking-address-row">
                  <label>{label}</label>
                  <input type="text" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* BUTTON SECTION */}
        <div className="CalenderBooking-button-section">
          <button className="CalenderBooking-book-btn">
            Book your Service
          </button>
          <div className="CalenderBooking-back-link">Back</div>
        </div>
      </div>
    </div>
  );
};

export default CalenderBookingPage;
