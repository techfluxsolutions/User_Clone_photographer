// import React from "react";
// import "./PersonalizedQuotePage.css";

// const PersonalizedQuotePage = () => {
//   return (
//     <div className="quote-wrapper d-flex justify-content-center align-items-center">
//       <div className="container text-center">
//         <h1 className="title mb-5">
//           Get your Personalized Quote
//         </h1>

//         <div className="quote-card mx-auto">
//           <form>

//             {/* Row wrapper */}
//             <div className="row align-items-end mb-4">
//               <div className="col-lg-6 col-12 mb-2 mb-lg-0">
//                 <label className="center-label">Event Type</label>
//               </div>
//               <div className="col-lg-6 col-12">
//                 <select className="form-control quote-input w-100">
//                   <option>Select</option>
//                   <option>Wedding</option>
//                   <option>Birthday</option>
//                   <option>Corporate</option>
//                 </select>
//               </div>
//             </div>

//             <div className="row align-items-end mb-4">
//               <div className="col-lg-6 col-12 mb-2 mb-lg-0">
//                 <label className="center-label">Event Date</label>
//               </div>
//               <div className="col-lg-6 col-12">
//                 <input type="date" className="form-control quote-input w-100" />
//               </div>
//             </div>

//             <div className="row align-items-end mb-4">
//               <div className="col-lg-6 col-12 mb-2 mb-lg-0">
//                 <label className="center-label">Event Location</label>
//               </div>
//               <div className="col-lg-6 col-12">
//                 <input type="text" className="form-control quote-input w-100" />
//               </div>
//             </div>

//             <div className="row align-items-end mb-4">
//               <div className="col-lg-6 col-12 mb-2 mb-lg-0">
//                 <label className="center-label">Event Duration</label>
//               </div>
//               <div className="col-lg-6 col-12">
//                 <input type="text" className="form-control quote-input w-100" />
//               </div>
//             </div>

//             <div className="row align-items-end mb-4">
//               <div className="col-lg-6 col-12 mb-2 mb-lg-0">
//                 <label className="center-label">Photography Requirements</label>
//               </div>
//               <div className="col-lg-6 col-12">
//                 <input type="text" className="form-control quote-input w-100" />
//               </div>
//             </div>

//             <div className="row align-items-end mb-4">
//               <div className="col-lg-6 col-12 mb-2 mb-lg-0">
//                 <label className="center-label">Your Name</label>
//               </div>
//               <div className="col-lg-6 col-12">
//                 <input type="text" className="form-control quote-input w-100" />
//               </div>
//             </div>

//             <div className="row align-items-end mb-4">
//               <div className="col-lg-6 col-12 mb-2 mb-lg-0">
//                 <label className="center-label">Phone No.</label>
//               </div>
//               <div className="col-lg-6 col-12">
//                 <input type="tel" className="form-control quote-input w-100" />
//               </div>
//             </div>

//             <div className="row align-items-end mb-5">
//               <div className="col-lg-6 col-12 mb-2 mb-lg-0">
//                 <label className="center-label">Email ID</label>
//               </div>
//               <div className="col-lg-6 col-12">
//                 <input type="email" className="form-control quote-input w-100" />
//               </div>
//             </div>

//             <button className="btn buttons w-50 w-50 d-lg-inline-block">
//               Save Details
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalizedQuotePage;


import React, { useState } from "react";
import "./PersonalizedQuotePage.css";
import Loader from "../../Template/Loader/Loader";
import CommonMessageModal from "../CommonMessageModal/CommonMessageModal";
import { postPersonalizedBudget } from "../../utils/APIs/bookingApis";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../../Template/NavigationButtons/NavigationButtons";


const PersonalizedQuotePage = () => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

const handleModalClose = () => {
  setShowMessage(false);
  navigate("/myProfile", {
    state: { openTab: "quotes" },
  });
};


  const [formData, setFormData] = useState({
    eventType: "",
    startDate: "",
    endDate: "",
    location: "",
    photographyRequirements: "",
    clientName: "",
    phoneNumber: "",
    email: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      eventType: formData.eventType,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
      location: formData.location,
      photographyRequirements: formData.photographyRequirements,
      clientName: formData.clientName,
      clientId: localStorage.getItem("client_id"),
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      budget: formData.budget,
      quoteType: "personalizedQuotes",
    };

    try {
      setLoading(true);
      const response = await postPersonalizedBudget(payload);
      setMessage(response?.data?.message || "Quote submitted successfully");
      setShowMessage(true);
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-wrapper d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
      <NavigationButtons />
      {loading && <Loader />}

      <div className="container text-center">
        <h1 className="title mb-5">Get your Personalized Quote </h1>

        <div className="quote-card mx-auto">
          <form onSubmit={handleSubmit}>

            <div className="row align-items-end mb-4">
              <div className="col-lg-6 col-12 mb-2 mb-lg-0">
                <label className="center-label">Event Type</label>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  type="text"
                  name="eventType"
                  className="form-control quote-input w-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row align-items-end mb-4">
              <div className="col-lg-6 col-12 mb-2 mb-lg-0">
                <label className="center-label">Event Start Date</label>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  type="date"
                  name="startDate"
                  min={today}
                  className="form-control quote-input w-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row align-items-end mb-4">
              <div className="col-lg-6 col-12 mb-2 mb-lg-0">
                <label className="center-label">Event End Date</label>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  type="date"
                  name="endDate"
                  min={today}
                  className="form-control quote-input w-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row align-items-end mb-4">
              <div className="col-lg-6 col-12 mb-2 mb-lg-0">
                <label className="center-label">Event Budget</label>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  type="text"
                  name="budget"
                  className="form-control quote-input w-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row align-items-end mb-4">
              <div className="col-lg-6 col-12 mb-2 mb-lg-0">
                <label className="center-label">Event Location</label>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  type="text"
                  name="location"
                  className="form-control quote-input w-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row align-items-end mb-4">
              <div className="col-lg-6 col-12 mb-2 mb-lg-0">
                <label className="center-label">
                  Photography Requirements
                </label>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  type="text"
                  name="photographyRequirements"
                  className="form-control quote-input w-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row align-items-end mb-4">
              <div className="col-lg-6 col-12 mb-2 mb-lg-0">
                <label className="center-label">Your Name</label>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  type="text"
                  name="clientName"
                  className="form-control quote-input w-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row align-items-end mb-4">
              <div className="col-lg-6 col-12 mb-2 mb-lg-0">
                <label className="center-label">Phone No.</label>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  type="tel"
                  name="phoneNumber"
                  className="form-control quote-input w-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row align-items-end mb-5">
              <div className="col-lg-6 col-12 mb-2 mb-lg-0">
                <label className="center-label">Email ID</label>
              </div>
              <div className="col-lg-6 col-12">
                <input
                  type="email"
                  name="email"
                  className="form-control quote-input w-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn buttons w-50 d-lg-inline-block">
              Save Details
            </button>

          </form>
        </div>
      </div>

      <CommonMessageModal
  show={showMessage}
  onClose={handleModalClose}
  message={message}
/>

    </div>
  );
};

export default PersonalizedQuotePage;


// import React, { useState } from "react";
// import "./PersonalizedQuotePage.css";
// import Loader from "../../Template/Loader/Loader";
// import CommonMessageModal from "../CommonMessageModal/CommonMessageModal";
// import { postPersonalizedBudget } from "../../utils/APIs/bookingApis";
// import { useNavigate } from "react-router-dom";
// import LocationPickerMap from "./LocationPikerMap/LocationPikerMap";

// const PersonalizedQuotePage = () => {
//   const today = new Date().toISOString().split("T")[0];
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     eventType: "",
//     startDate: "",
//     endDate: "",
//     location: "",
//     flatNumber: "",
//     streetName: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     lat: "",
//     lng: "",
//     photographyRequirements: "",
//     clientName: "",
//     phoneNumber: "",
//     email: "",
//     budget: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleModalClose = () => {
//     setShowMessage(false);
//     navigate("/myProfile", {
//       state: { openTab: "quotes" },
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Map selection handler
//   const handleLocationSelect = (data) => {
//     setFormData((prev) => ({
//       ...prev,
//       location: data.location,
//       streetName: data.streetName,
//       city: data.city,
//       state: data.state,
//       postalCode: data.postalCode,
//       lat: data.lat,
//       lng: data.lng,
//     }));
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     const d = new Date(date);
//     return `${String(d.getDate()).padStart(2, "0")}-${String(
//       d.getMonth() + 1
//     ).padStart(2, "0")}-${d.getFullYear()}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       eventType: formData.eventType,
//       startDate: formatDate(formData.startDate),
//       endDate: formatDate(formData.endDate),
//       location: formData.location,
//       flatNumber: formData.flatNumber,
//       streetName: formData.streetName,
//       city: formData.city,
//       state: formData.state,
//       postalCode: formData.postalCode,
//       lat: formData.lat,
//       lng: formData.lng,
//       photographyRequirements: formData.photographyRequirements,
//       clientName: formData.clientName,
//       clientId: localStorage.getItem("client_id"),
//       phoneNumber: formData.phoneNumber,
//       email: formData.email,
//       budget: formData.budget,
//       quoteType: "personalizedQuotes",
//     };

//     try {
//       setLoading(true);
//       const response = await postPersonalizedBudget(payload);
//       setMessage(response?.data?.message || "Quote submitted successfully");
//     } catch (error) {
//       setMessage(
//         error?.response?.data?.message ||
//           "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//       setShowMessage(true);
//     }
//   };

//   return (
//     <div className="quote-wrapper d-flex justify-content-center align-items-center">
//       {loading && <Loader />}

//       <div className="container text-center">
//         <h1 className="title mb-5">Get your Personalized Quote</h1>

//         <div className="quote-card mx-auto">
//           <form onSubmit={handleSubmit}>
//             {/* Event Type */}
//             <input
//               type="text"
//               name="eventType"
//               placeholder="Event Type"
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             {/* Dates */}
//             <input
//               type="date"
//               name="startDate"
//               min={today}
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             <input
//               type="date"
//               name="endDate"
//               min={today}
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             {/* Budget */}
//             <input
//               type="text"
//               name="budget"
//               placeholder="Budget"
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             {/* Location (readonly) */}
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               placeholder="Select location from map"
//               className="form-control mb-3"
//               readOnly
//             />

//             {/* ✅ MAP */}
//             <div className="mb-4">
//               <LocationPickerMap
//                 onSelect={handleLocationSelect}
//                 isOpen={true}
//               />
//             </div>

//             {/* Address Fields */}
//             <input
//               type="text"
//               name="flatNumber"
//               placeholder="Flat / House No."
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="streetName"
//               placeholder="Street Name"
//               value={formData.streetName}
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="state"
//               placeholder="State"
//               value={formData.state}
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="postalCode"
//               placeholder="Postal Code"
//               value={formData.postalCode}
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             {/* Optional Lat/Lng display */}
//             <div className="d-flex gap-2 mb-3">
//               <input
//                 type="text"
//                 value={formData.lat}
//                 placeholder="Latitude"
//                 readOnly
//                 className="form-control"
//               />
//               <input
//                 type="text"
//                 value={formData.lng}
//                 placeholder="Longitude"
//                 readOnly
//                 className="form-control"
//               />
//             </div>

//             {/* Other Fields */}
//             <input
//               type="text"
//               name="photographyRequirements"
//               placeholder="Photography Requirements"
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="clientName"
//               placeholder="Your Name"
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             <input
//               type="tel"
//               name="phoneNumber"
//               placeholder="Phone Number"
//               className="form-control mb-3"
//               onChange={handleChange}
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="form-control mb-4"
//               onChange={handleChange}
//             />

//             <button type="submit" className="btn buttons w-50">
//               Save Details
//             </button>
//           </form>
//         </div>
//       </div>

//       <CommonMessageModal
//         show={showMessage}
//         onClose={handleModalClose}
//         message={message}
//       />
//     </div>
//   );
// };

// export default PersonalizedQuotePage;