import React, { useState } from "react";
import "./../../../../ServiceBooking/CalenderBookingPage/CalenderBookingPage.css";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../../../../../Template/NavigationButtons/NavigationButtons";

const ModifyBooking = () => {
  const [selectedDate, setSelectedDate] = useState(25);
  const year = 2025;
  const month = 11; // December (0-based)

const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sun
const daysInMonth = new Date(year, month + 1, 0).getDate();
const daysInPrevMonth = new Date(year, month, 0).getDate();
const navigate = useNavigate();


  return (
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

                {/* {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
                  <span
                    key={date}
                    className={`CalenderBooking-calendar-date ${
                      selectedDate === date ? "active" : ""
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date}
                  </span>
                ))} */}

                {/* Previous month dates */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <span
                    key={`prev-${i}`}
                    className="CalenderBooking-calendar-date disabled"
                  >
                    {daysInPrevMonth - firstDayOfMonth + i + 1}
                  </span>
                ))}

                {/* Current month dates */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const date = i + 1;
                  return (
                    <span
                      key={date}
                      className={`CalenderBooking-calendar-date ${
                        selectedDate === date ? "active" : ""
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {date}
                    </span>
                  );
                })}

                {/* Next month dates */}
                {Array.from(
                  {
                    length:
                      (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7
                  },
                  (_, i) => (
                    <span
                      key={`next-${i}`}
                      className="CalenderBooking-calendar-date disabled"
                    >
                      {i + 1}
                    </span>
                  )
                )}

              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="col-12 col-md-12 col-lg-8">
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
          <button className="CalenderBooking-book-btn" onClick={() => navigate("/payment-details")}>
            Modify your Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyBooking;
