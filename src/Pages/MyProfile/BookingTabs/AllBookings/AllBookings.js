// import React, { useState } from "react";
// import "./AllBookings.css";
// import BookingDetails from "./BookingDetails/BookingDetails";
// import Gallery from "./Gallery/Gallery";
// import Chats from "./Chats/Chats";

// const AllBookings = () => {
//   const [activeTab, setActiveTab] = useState("details");

//   const renderComponent = () => {
//     switch (activeTab) {
//       case "details":
//         return <BookingDetails />;
//       case "gallery":
//         return <Gallery />;
//       case "chat":
//         return <Chats />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="all-bookings-wrapper">

//       {/* Tabs */}
//       <div className="booking-tabs">
//         <button
//           className={`tab-item ${activeTab === "details" ? "active" : ""}`}
//           onClick={() => setActiveTab("details")}
//         >
//           Details
//         </button>

//         <button
//           className={`tab-item ${activeTab === "gallery" ? "active" : ""}`}
//           onClick={() => setActiveTab("gallery")}
//         >
//           Gallery
//         </button>

//         <button
//           className={`tab-item ${activeTab === "chat" ? "active" : ""}`}
//           onClick={() => setActiveTab("chat")}
//         >
//           Chat
//         </button>
//       </div>

//       {/* Content */}
//       <div className="booking-tab-content">
//         {renderComponent()}
//       </div>

//     </div>
//   );
// };

// export default AllBookings;




import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams,useSearchParams } from "react-router-dom";
import "./AllBookings.css";

import BookingDetails from "./BookingDetails/BookingDetails";
import Gallery from "./Gallery/Gallery";
import Chats from "./Chats/Chats";
import RaiseQuery from "./RaiseQuery/RaiseQuery";
import RatingsAndFeedback from "./RatingsAndFeedback/RatingsAndFeedback";
import NavigationButtons from "../../../../Template/NavigationButtons/NavigationButtons";

const AllBookings = () => {
  const { bookingId } = useParams();
const [searchParams] = useSearchParams();
const navigate = useNavigate();
const location = useLocation();
const defaultTab = searchParams.get("tab") || "details";
const [photographerId, setPhotographerId] =
  useState(location.state?.photographerId || null);

const [clientId, setClientId] =
  useState(location.state?.clientId || null);


  // const [photographerId, setPhotographerId] = useState(null);
  // const [clientId, setClientId] = useState(null);
  // const [activeTab, setActiveTab] = useState("details");
  const [detailsView, setDetailsView] = useState("details");
  const [raiseQueryData, setRaiseQueryData] = useState(null);
  const [ratingData, setRatingData] = useState(null);

const storageKey = `activeBookingTab_${bookingId}`;

// const [activeTab, setActiveTab] = useState(() => {
//   return sessionStorage.getItem(storageKey) || defaultTab;
// });

const [activeTab, setActiveTab] = useState(() => {
  // URL tab should override session storage
  if (defaultTab) return defaultTab;

  return sessionStorage.getItem(storageKey) || "details";
});

useEffect(() => {
  sessionStorage.setItem(storageKey, activeTab);
}, [activeTab, storageKey]);

 const renderDetails = () => {
  switch (detailsView) {
    case "raiseQuery":
      return (
        <RaiseQuery
          bookingData={raiseQueryData}
          onBack={() => setDetailsView("details")}
        />
      );

    case "rating":
      return (
        <RatingsAndFeedback
          ratingData={ratingData}
          onBack={() => setDetailsView("details")}
        />
      );

    default:
      return (
        <BookingDetails
          bookingId={bookingId}
          setPhotographerId={setPhotographerId}
          setClientId={setClientId}
          onRaiseQuery={(data) => {
            setRaiseQueryData(data);
            setDetailsView("raiseQuery");
          }}
          onRating={(data) => {
            setRatingData(data);
            setDetailsView("rating");
          }}
        />
      );
  }
};



const handleBack = () => {
  // If inside Raise Query or Rating → go back to Details
  if (detailsView !== "details") {
    setDetailsView("details");
    return;
  }

  // If in Chat or Gallery → go back to Details tab
  if (activeTab !== "details") {
    setActiveTab("details");
    return;
  }

  // If already in Details → go to previous page
  navigate(-1);
};

  const renderComponent = () => {
    switch (activeTab) {
      case "details":
        return renderDetails();

      case "chat":
        return <Chats bookingId={bookingId} fromtab={true}/>;

      case "gallery":
        return <Gallery bookingId={bookingId} photographerId={photographerId} clientId={clientId} />;

      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <NavigationButtons onBack={handleBack} />
      <div className="all-bookings-wrapper">
      
      {/* Tabs */}
      <div className="booking-tabs">
        <button
          className={`tab-item ${activeTab === "details" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("details");
            setDetailsView("details");
          }}
        >
          Details
        </button>

        <button
          className={`tab-item ${activeTab === "chat" ? "active" : ""}`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>

        <button
          className={`tab-item ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery
        </button>
      </div>

      {/* Content */}
      <div className="booking-tab-content">
        {renderComponent()}
      </div>
    </div>
    </div>
   
  );
};

export default AllBookings;
