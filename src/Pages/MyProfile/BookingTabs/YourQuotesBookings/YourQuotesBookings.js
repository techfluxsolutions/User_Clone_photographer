
// import { FaStar } from "react-icons/fa";
// import { LuCake } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// // import "./UpcomingBookings.css";
// import "./../UpcomingBookings/UpcomingBookings.css";


// const YourQuotesBookings = () => {
//   const navigate = useNavigate();

//   const bookings = [
//     {
//       id: 1,
//       title: "Birthday Event",
//       date: "15 Dec, 2025",
//       day: "Monday",
//       rating: 5,
//       status: "Completed",
//       amount: "Rs. 7,000/-",
//     },
//     {
//       id: 2,
//       title: "Birthday Event",
//       date: "15 Dec, 2025",
//       day: "Monday",
//       rating: 5,
//       status: "Completed",
//       amount: "Rs. 7,000/-",
//     },
//     {
//       id: 3,
//       title: "Birthday Event",
//       date: "15 Dec, 2025",
//       day: "Monday",
//       rating: 4,
//       status: "Completed",
//       amount: "Rs. 7,000/-",
//     },
//   ];

// //   const handleViewDetails = (bookingId) => {
// //     navigate("/bookingDetails", { state: { bookingId } });
// //   };

// //   handleChatNow

//   const handleChatNow = (bookingId) => {
//     navigate("/chat", { state: { bookingId } });
//   };

//   return (
//     <div className="booking-list">
//       {bookings.map((booking) => (
//         <div className="booking-card" key={booking.id}>
//           <div className="booking-left">
//             <h3 className="booking-title-upcoming">
//               <LuCake className="cake-icon" />
//               {booking.title}
//             </h3>

//             <p className="booking-date">
//               {booking.date} &nbsp; <span>{booking.day}</span>
//             </p>

//             <div className="booking-rating">
//               <span className="rating-label">Ratings</span>
//               <div className="stars">
//                 {[...Array(booking.rating)].map((_, index) => (
//                   <FaStar key={index} />
//                 ))}
//               </div>
//             </div>

//            <div className="booking-actions">
//               <button className="modify-btn" onClick={() => handleChatNow(booking.id)}>Chat Now</button>

//               {/* <button
//                 className="view-details"
//                 onClick={() => handleViewDetails(booking.id)}
//               >
//                 View Details
//               </button> */}
//             </div>

//           </div>

//           <div className="booking-right">
//             <span className="status completed">{booking.status}</span>
//             <p className="amount">{booking.amount}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default YourQuotesBookings;



import React, { useEffect, useState } from "react";
// import { LuCake } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./../UpcomingBookings/UpcomingBookings.css";
import { getAllQuotes } from "../../../../utils/APIs/bookingApis";
import Loader from "../../../../Template/Loader/Loader";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


const YourQuotesBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH QUOTES (API)
  ========================= */
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const response = await getAllQuotes();

        const apiData = response?.data?.data || [];

        // 🔁 Map API response to EXISTING UI structure
        const mappedBookings = apiData.map((item) => {
          const createdDate = new Date(item.startDate);

          return {
            id: item._id,
            title: item.eventType, // same place as booking.title
            date: createdDate.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            day: createdDate.toLocaleDateString("en-IN", {
              weekday: "long",
            }),
            rating: 5, // static full rating
            status: item.quoteStatus, // static as requested
            amount: `Rs. ${item.budget || "0"}/-`, // SAME FORMAT
          };
        });

        setBookings(mappedBookings);
      } catch (error) {
        console.error("Failed to fetch quotes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // const handleChatNow = (bookingId) => {
  //   navigate("/chat", { state: { bookingId } });
  // };

  const handleChatNow = (quoteId) => {
  navigate("/chat", {
    state: {
      quoteId, // ✅ send quote _id
    },
  });
};

  return (
    <>
      {loading && <Loader />}

      <div className="booking-list">
        {bookings.map((booking) => (

          
          <div className="booking-card" key={booking.id}>
            <div className="booking-left">
              <h3 className="booking-title-upcoming">
                {/* <LuCake className="cake-icon" /> */}
                {booking.title}
              </h3>

              <p className="booking-date">
                {booking.date} &nbsp; <span>{booking.day}</span>
              </p>

              {/* <div className="booking-rating">
                <span className="rating-label">Ratings</span>
                
                 <div className="stars">
                              {[...Array(5)].map((_, index) => {
                                const rating = booking.ratingsGivenByClient || 0;
                
                                if (rating >= index + 1) {
                                  // Full star
                                  return <FaStar key={index} />;
                                } else if (rating >= index + 0.5) {
                                  // Half star
                                  return <FaStarHalfAlt key={index} />;
                                } else {
                                  // Empty star
                                  return <FaRegStar key={index} />;
                                }
                              })}
                            </div>
              </div> */}

              <div className="booking-actions">
                <button
                  className="modify-btn"
                  onClick={() => handleChatNow(booking.id)}
                >
                  Chat Now
                </button>
              </div>
            </div>

            <div className="booking-right">
              <span className="status completed">
                {booking.status}
              </span>
              <p className="amount">{booking.amount}</p>
            </div>
          </div>
        ))}

        {!loading && bookings.length === 0 && (
          <p className="text-center mt-4">No quotes found</p>
        )}
      </div>
    </>
  );
};

export default YourQuotesBookings;
