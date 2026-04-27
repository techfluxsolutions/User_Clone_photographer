// import React from "react";
// import { Tab, Tabs } from "react-bootstrap";
// import { useLocation } from "react-router-dom";
// import "./BookingTabs.css";
// import UpcomingBookings from "./UpcomingBookings/UpcomingBookings";
// import PreviousBookings from "./PreviousBookings/PreviousBookings";
// import YourQuotesBookings from "./YourQuotesBookings/YourQuotesBookings";
// // import IncompleteBookings from "./IncompleteBookings/IncompleteBookings";

// const BookingTabs = () => {
//   const location = useLocation();

//   // 👇 if coming from quote page → open quotes tab
//   // otherwise default to upcoming
//   const defaultTab = location.state?.openTab || "quotes";

//   return (
//     <div className="container booking-wrapper mb-5">
//       <h2 className="booking-title">Your Orders</h2>

//       <Tabs
//         defaultActiveKey={defaultTab}
//         transition={false}
//         id="booking-tabs"
//         className="custom-tabs"
//       >
//         <Tab eventKey="quotes" title="Your Quotes">
//           <YourQuotesBookings />
//         </Tab>

//         <Tab eventKey="upcoming" title="Upcoming Bookings">
//           <UpcomingBookings />
//         </Tab>

//         <Tab eventKey="previous" title="Previous Bookings">
//           <PreviousBookings />
//         </Tab>

//          {/* <Tab eventKey="incomplete" title="Incomplete Bookings">
//           <IncompleteBookings />
//         </Tab> */}
//       </Tabs>
//     </div>
//   );
// };

// export default BookingTabs;

import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./BookingTabs.css";

import UpcomingBookings from "./UpcomingBookings/UpcomingBookings";
import PreviousBookings from "./PreviousBookings/PreviousBookings";
import YourQuotesBookings from "./YourQuotesBookings/YourQuotesBookings";

const BookingTabs = () => {
  const location = useLocation();

  // Priority:
  // 1. sessionStorage (refresh case)
  // 2. navigation state (coming from another page)
  // 3. default "quotes"

  const getInitialTab = () => {
    return (
      sessionStorage.getItem("bookingMainTab") ||
      location.state?.openTab ||
      "quotes"
    );
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Save tab whenever changed
  useEffect(() => {
    sessionStorage.setItem("bookingMainTab", activeTab);
  }, [activeTab]);

  return (
    <div className="container booking-wrapper mb-5">
      <h2 className="booking-title">Your Orders</h2>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        transition={false}
        id="booking-tabs"
        className="custom-tabs"
      >
        <Tab eventKey="quotes" title="Your Quotes">
          <YourQuotesBookings />
        </Tab>

        <Tab eventKey="upcoming" title="Upcoming Bookings">
          <UpcomingBookings />
        </Tab>

        <Tab eventKey="previous" title="Previous Bookings">
          <PreviousBookings />
        </Tab>

        {/* <Tab eventKey="incomplete" title="Incomplete Bookings">
          <IncompleteBookings />
        </Tab> */}
      </Tabs>
    </div>
  );
};

export default BookingTabs;
