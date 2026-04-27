// With Map
// after 24 march


// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import PleaseLoginModal from "../../AuthModule/PleaseLoginModal/PleaseLoginModal";
// import Loader from "../../Template/Loader/Loader";
// import { postPersonalizedBudget } from "../../utils/APIs/bookingApis";
// import CommonMessageModal from "../CommonMessageModal/CommonMessageModal";
// import "./PersonalizedBudgetPage.css";
// import LocationPickerMap from "../PersonalizedQuotePage/LocationPikerMap/LocationPikerMap";

// const PersonalizedBudgetPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [redirectAfterClose, setRedirectAfterClose] = useState(false);
//   const { serviceId, serviceName } = location.state || {};

//   /* =========================
//      FORM STATES
//   ========================= */
//   const [budget, setBudget] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   // const [selectedCity, setSelectedCity] = useState("");

//   /* =========================
//      UI STATES
//   ========================= */
//   // const [showCityDropdown, setShowCityDropdown] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalTitle, setModalTitle] = useState("Message");
//   const [clientName, setClientName] = useState("");
//   const [requirements, setRequirements] = useState([]);
//   const [editingPreferences, setEditingPreferences] = useState(null);
//   const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
//   const budgetDropdownRef = useRef(null);
//   const [quoteId,setQuoteId] = useState(0)
//   // const [isOtherCity, setIsOtherCity] = useState(false);
//   // const [citySearchTerm, setCitySearchTerm] = useState("");
//   const [isAddressOpen, setIsAddressOpen] = useState(false);
//   const cityDropdownRef = useRef(null);
//   const [addressData, setAddressData] = useState({
//     location: "",
//     lat: "",
//     lng: "",
//     flatOrHouseNo: "",
//     streetName: "",
//     city: "",
//     state: "",
//     postalCode: "",
//   });
//   // const [otherCity, setOtherCity] = useState("");

//   // useEffect(() => {
//   //   if (!serviceId || !serviceName) {
//   //     navigate("/dummy-services");
//   //   }
//   // }, [serviceId, serviceName, navigate]);
//   const isAddressSelected = !!addressData.location;
//   const weddingBudgetOptions = [
//     "Less than ₹1,00,000",
//     "₹1,00,000 - ₹2,00,000",
//     "₹2,00,000 - ₹3,00,000",
//     "Above ₹3,00,000",
//     "Not Sure",
//   ];

//   const maternityBudgetOptions = [
//     "Less than ₹50,000",
//     "₹50,000 - ₹1,00,000",
//     "Above ₹1,00,000",
//     "Not Sure",
//   ];

//   const isWedding = serviceName === "Wedding Photography";
//   const isMaternity = serviceName === "Maternity and Baby Shoot";

//   const budgetOptions = isWedding
//     ? weddingBudgetOptions
//     : maternityBudgetOptions;


//   // const metroCities = [
//   //   "Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Chandigarh", "Kochi", "Indore",
//   //   "Bhopal", "Lucknow", "Patna", "Ranchi", "Bhubaneswar", "Raipur", "Guwahati", "Dehradun", "Shimla", "Amritsar", "Ludhiana", "Jalandhar",
//   //   "Other",
//   // ];

//   const formatDate = (date) => {
//     const d = new Date(date);
//     return `${String(d.getDate()).padStart(2, "0")}-${String(
//       d.getMonth() + 1
//     ).padStart(2, "0")}-${d.getFullYear()}`;
//   };
//   const handleRequirementChange = (value) => {
//     setRequirements((prev) =>
//       prev.includes(value)
//         ? prev.filter((item) => item !== value)
//         : [...prev, value]
//     );
//   };
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const minDate = tomorrow.toISOString().split("T")[0];



//   const handleLocationSelect = (data) => {
//     console.log("LOCATRION DATA", data)
//     setAddressData({
//       location: data.location || "",
//       lat: data.lat || "",
//       lng: data.lng || "",
//       streetName: data.streetName || "",
//       city: data.city || "",
//       state: data.state || "",
//       postalCode: data.postalCode || "",
//     });



//     // also update selectedCity (important for payload)
//     // setSelectedCity(data.city || data.location);
//   };
//   useEffect(() => {
//     console.log("ADDRESSSSS", addressData);
//   }, [addressData]);

//   /* =========================
//      SUBMIT HANDLER
//   ========================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 🔴 MANUAL VALIDATION
//     // if (
//     //   !clientName ||
//     //   !budget ||
//     //   !fromDate ||
//     //   !toDate ||
//     //   !addressData.location ||
//     //   // (isOtherCity && !otherCity) ||
//     //   requirements.length === 0 ||
//     //   editingPreferences === null
//     // ) {



//     //   setModalTitle("Message");
//     //   setModalMessage("Please fill all fields");
//     //   setRedirectAfterClose(false);
//     //   setShowModal(true);
//     //   return;
//     // }


//     const showError = (message) => {
//   setModalTitle("Message");
//   setModalMessage(message);
//   setRedirectAfterClose(false);
//   setShowModal(true);
// };

// const nameRegex = /^[A-Za-z\s.-]+$/;
// const flatHouseRegex = /^[A-Za-z0-9\s\-/#]+$/;
// if (!nameRegex.test(clientName)) {
//   return showError(
//     "Client name should not contain numbers or special characters"
//   );
// }
// if (!clientName) return showError("Please enter client name");
// if (!budget) return showError("Please enter budget");
// if (!fromDate) return showError("Please select from date");
// if (!toDate) return showError("Please select to date");
// if (!addressData.location) return showError("Please select location");
// if(!addressData.flatOrHouseNo) return showError("Flat or House Number should Required");
// if (!flatHouseRegex.test(addressData.flatOrHouseNo)) {
//   return showError(
//     "Enter proper flat or house number"
//   );
// }
// // if (isOtherCity && !otherCity) return showError("Please enter other city");
// if (requirements.length === 0) return showError("Please add at least one requirement");
// if (editingPreferences === null) return showError("Please select editing preference");


//     const token = localStorage.getItem("PhotographerUserToken");

//     const payload = {
//       clientName,
//       service_id: serviceId,
//       eventType: serviceName,
//       startDate: formatDate(fromDate),
//       endDate: formatDate(toDate),
//       location: addressData.location,
//       address: addressData.location,
//       lat: addressData.lat,
//       lng: addressData.lng,
//       streetName: addressData.streetName,
//       city: addressData.city,
//       state: addressData.state,
//       postalCode: addressData.postalCode,
//       budget,
//       requirements,
//       editingPreferences,
//       flatOrHouseNo:addressData.flatOrHouseNo
//     };


//     console.log("PAYLOAD", payload)

//     if (!token) {
//       const existingData = localStorage.getItem("quoteData");
//       localStorage.setItem(
//         "quoteData",
//         JSON.stringify(existingData ? { ...JSON.parse(existingData), ...payload } : payload)
//       );
//       setShowLoginModal(true);
//       return;
//     }

//     try {
//       setLoading(true);
//      const response = await postPersonalizedBudget(payload);
//       setModalTitle("Success");
//       setModalMessage("Your quote request has been submitted successfully.");
//       setRedirectAfterClose(true);
//       setShowModal(true);
//       console.log("response QUOTE",response?.data?.data?._id)
//       setQuoteId(response?.data?.data?._id)
//     } catch (error) {
//       setModalTitle("Error");
//       setModalMessage(
//         error?.response?.data?.message || "Something went wrong. Please try again."
//       );
//       setShowModal(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);

//     if (redirectAfterClose) {
//      navigate(`/chat/${quoteId}`)
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         budgetDropdownRef.current &&
//         !budgetDropdownRef.current.contains(event.target)
//       ) {
//         setShowBudgetDropdown(false);
//       }

//       if (
//         cityDropdownRef.current &&
//         !cityDropdownRef.current.contains(event.target)
//       ) {
//         // setShowCityDropdown(false);
//         // setCitySearchTerm(""); // optional: clear search
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       {loading && <Loader />}

//       <div className="budget-wrapper d-flex justify-content-center align-items-center">
//         <div className="container">
//           <h1 className="title text-center mb-3">
//             Get your Personalized Quote
//           </h1>
//           <h5 className="mb-4">Service Name - {serviceName}</h5>
//           <div className="budget-card mx-auto">
//             <form onSubmit={handleSubmit}>
//               <div className="budget-row">
//                 <label className="budget-label">
//                   Name <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control budget-input"
//                   placeholder="Enter Name"
//                   value={clientName}
//                   onChange={(e) => setClientName(e.target.value)}
                  
//                 />
//               </div>

//               {/* Budget */}
//               <div className="budget-row">
//                 <label className="budget-label">
//                   Budget <span className="text-danger">*</span>
//                 </label>

//                 {(isWedding || isMaternity) ? (
//                   <div className="custom-dropdown-wrapper" ref={budgetDropdownRef}>
//                     <button
//                       type="button"
//                       className="form-control budget-input custom-dropdown-btn"
//                       onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
//                     >
//                       {budget || "Select Budget"}
//                     </button>

//                     {showBudgetDropdown && (
//                       <div className="custom-dropdown-menu">
//                         {budgetOptions.map((item, index) => (
//                           <div
//                             key={index}
//                             className="custom-dropdown-item"
//                             onClick={() => {
//                               setBudget(item);
//                               setShowBudgetDropdown(false);
//                             }}
//                           >
//                             {item}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <input
//                     type="text"
//                     className="form-control budget-input"
//                     placeholder="₹ Enter Budget"
//                     value={budget}
//                     onChange={(e) => setBudget(e.target.value)}
//                   />
//                 )}
//               </div>

//               {/* Event Dates */}
//               <div className="budget-row">
//                 <label className="budget-label">
//                   Event Dates <span className="text-danger">*</span>
//                 </label>

//                 <div className="date-group">
//                   <span className="date-text">From</span>
//                   <input
//                     type="date"
//                     className="form-control budget-input date-input"
//                     min={minDate}
//                     value={fromDate}
//                     onChange={(e) => {
//                       setFromDate(e.target.value);
//                       setToDate("");
//                     }}
//                   />

//                   <span className="date-text">To</span>
//                   <input
//                     type="date"
//                     className="form-control budget-input date-input"
//                     min={fromDate || minDate}
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Event City */}

//               <div className="full-width-row mb-2">
//                 <div
//                   className={`accordion-header ${isAddressOpen ? "open" : ""}`}
//                   onClick={() => setIsAddressOpen(!isAddressOpen)}
//                 >
//                   <span>Event Address & Location</span>
//                   <span className="arrow">{isAddressOpen ? "▲" : "▼"}</span>
//                 </div>

//                 <div className={`accordion-body ${isAddressOpen ? "show" : ""}`}>
//                   {isAddressOpen && (
//                     <div className="inner-grid">

//                       {/* 🗺️ MAP */}
//                       <div style={{ gridColumn: "span 2" }}>
//                         <LocationPickerMap onSelect={handleLocationSelect} isOpen={isAddressOpen} />
//                       </div>

//                       {/* 📍 Full Address */}
//                       <input
//                         type="text"
//                         className="form-control budget-input mb-2"
//                         placeholder="Full Address"
//                         value={addressData.location}
//                         onChange={(e) =>
//                           setAddressData({ ...addressData, location: e.target.value })
//                         }
//                         disabled={isAddressSelected}
//                       />

//                       {/* 🏠 Flat / House No */}
//                       <input
//                         type="text"
//                         className="form-control budget-input mb-2"
//                         placeholder="Flat / House No."
//                         value={addressData.flatOrHouseNo || ""}
//                         onChange={(e) =>
//                           setAddressData({
//                             ...addressData,
//                             flatOrHouseNo: e.target.value,
//                           })
//                         }
//                       />

//                       {/* 🛣 Street */}
//                       <input
//                         type="text"
//                         className="form-control budget-input mb-2"
//                         placeholder="Street"
//                         value={addressData.streetName}
//                         readOnly
//                         disabled={isAddressSelected}
//                       />

//                       {/* 🏙 City */}
//                       <input
//                         type="text"
//                         className="form-control budget-input mb-2"
//                         placeholder="City"
//                         value={addressData.city}
//                         readOnly
//                         disabled={isAddressSelected}
//                       />

//                       {/* 🗺 State */}
//                       <input
//                         type="text"
//                         className="form-control budget-input mb-2"
//                         placeholder="State"
//                         value={addressData.state}
//                         readOnly
//                         disabled={isAddressSelected}
//                       />

//                       {/* 📮 Postal Code */}
//                       <input
//                         type="text"
//                         className="form-control budget-input mb-2"
//                         placeholder="Postal Code"
//                         value={addressData.postalCode}
//                         readOnly
//                         disabled={isAddressSelected}
//                       />

//                       {/* hidden lat/lng */}
//                       <input type="hidden" value={addressData.lat} />
//                       <input type="hidden" value={addressData.lng} />

//                     </div>
//                   )}
//                 </div>
//               </div>
            
//               <div className="budget-row">
//                 <label className="budget-label">
//                   Coverage Required <span className="text-danger">*</span>
//                 </label>

//                 <div className="budget-options">
//                   {["Photography", "Videography", "Complete Coverage (Photo + Video)"].map((item) => (
//                     <label key={item} className="budget-option-item">
//                       <input
//                         type="checkbox"
//                         checked={requirements.includes(item)}
//                         onChange={() => handleRequirementChange(item)}
//                       />
//                       {item}
//                     </label>
//                   ))}
//                 </div>
//               </div>


//               <div className="budget-row">
//                 <label className="budget-label">
//                   Editing Preferences <span className="text-danger">*</span>
//                 </label>

//                 <div className="budget-options">
//                   <label className="budget-option-item">
//                     <input
//                       type="radio"
//                       name="editingPreferences"
//                       checked={editingPreferences === true}
//                       onChange={() => setEditingPreferences(true)}
//                     />
//                     Yes, I’d like professionally edited photos/videos
//                   </label>

//                   <label className="budget-option-item">
//                     <input
//                       type="radio"
//                       name="editingPreferences"
//                       checked={editingPreferences === false}
//                       onChange={() => setEditingPreferences(false)}
//                     />
//                     No, I only need raw files
//                   </label>
//                 </div>
//               </div>
//               {/* Submit */}
//               <div className="text-center mt-5">
//                 <button type="submit" className="btn buttons w-50">
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       <PleaseLoginModal
//         show={showLoginModal}
//         onClose={() => setShowLoginModal(false)}
//       />

//       <CommonMessageModal
//         show={showModal}
//         onClose={handleModalClose}
//         title={modalTitle}
//         message={modalMessage}
//         buttonText="Okay"
//       />
//     </>
//   );
// };

// export default PersonalizedBudgetPage;

//==============================================================
// after 24 march (Without Map)
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PleaseLoginModal from "../../AuthModule/PleaseLoginModal/PleaseLoginModal";
import Loader from "../../Template/Loader/Loader";
import { postPersonalizedBudget } from "../../utils/APIs/bookingApis";
import CommonMessageModal from "../CommonMessageModal/CommonMessageModal";
import "./PersonalizedBudgetPage.css";
import NavigationButtons from "../../Template/NavigationButtons/NavigationButtons";

const PersonalizedBudgetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [redirectAfterClose, setRedirectAfterClose] = useState(false);
  const { serviceId, serviceName } = location.state || {};

  /* =========================
     FORM STATES
  ========================= */
  const [budget, setBudget] = useState("");
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  /* =========================
     UI STATES
  ========================= */
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Message");
  const [clientName, setClientName] = useState("");
  const [requirements, setRequirements] = useState("");
  const [editingPreferences, setEditingPreferences] = useState(null);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const budgetDropdownRef = useRef(null);
  const [isOtherCity, setIsOtherCity] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState("");

  const cityDropdownRef = useRef(null);
  // const [otherCity, setOtherCity] = useState("");

  // useEffect(() => {
  //   if (!serviceId || !serviceName) {
  //     navigate("/dummy-services");
  //   }
  // }, [serviceId, serviceName, navigate]);
  const weddingBudgetOptions = [
    "Less than ₹1,00,000",
    "₹1,00,000 - ₹2,00,000",
    "₹2,00,000 - ₹3,00,000",
    "Above ₹3,00,000",
    "Not Sure",
  ];

  const maternityBudgetOptions = [
    "Less than ₹50,000",
    "₹50,000 - ₹1,00,000",
    "Above ₹1,00,000",
    "Not Sure",
  ];

  const isWedding = serviceName === "Wedding Photography";
  const isMaternity = serviceName === "Maternity and Baby Shoot";

  const budgetOptions = isWedding
    ? weddingBudgetOptions
    : maternityBudgetOptions;


  const metroCities = [
  "Ahmedabad",
  "Amritsar",
  "Bengaluru",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Dehradun",
  "Delhi",
  "Faridabad",
  "Ghaziabad",
  "Gurugram",
  "Guwahati",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Jalandhar",
  "Kanpur",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Meerut",
  "Mumbai",
  "Mysuru",
  "Nagpur",
  "Nashik",
  "New Delhi",
  "Noida",
  "Patna",
  "Pune",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Surat",
  "Thane",
  "Thiruvananthapuram",
  "Vadodara",
  "Varanasi",
  "Vijayawada",
  "Visakhapatnam",
  "Other"
]

  const formatDate = (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  const filteredCities = metroCities
    .filter((city) =>
      city.toLowerCase().includes(citySearchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a === "Other") return 1;
      if (b === "Other") return -1;

      const term = citySearchTerm.toLowerCase();
      if (!term) {
        return a.localeCompare(b);
      }

      const aStarts = a.toLowerCase().startsWith(term);
      const bStarts = b.toLowerCase().startsWith(term);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return a.localeCompare(b);
    });




  // const handleRequirementChange = (value) => {
  //   setRequirements((prev) =>
  //     prev.includes(value)
  //       ? prev.filter((item) => item !== value)
  //       : [...prev, value]
  //   );
  // };
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const minDate = tomorrow.toISOString().split("T")[0];


    const showError = (message) => {
  setModalTitle("Message");
  setModalMessage(message);
  setRedirectAfterClose(false);
  setShowModal(true);
};

  /* =========================
     SUBMIT HANDLER
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 MANUAL VALIDATION
    // if (
    //   !clientName ||
    //   !budget ||
    //   !eventDate||
    //   // !fromDate ||
    //   // !toDate ||
    //   !selectedCity ||
    //   // (isOtherCity && !otherCity) ||
    //   !requirements||
    //   requirements.length === 0 ||
    //   editingPreferences === null
    // ) {
    //   setModalTitle("Message");
    //   setModalMessage("Please fill all fields");
    //   setRedirectAfterClose(false);
    //   setShowModal(true);
    //   return;
    // }


    const nameRegex = /^[A-Za-z\s.-]+$/;
    const cityRegex = /^[A-Za-z\s.-]+$/;

// const flatHouseRegex = /^[A-Za-z0-9\s\-/#]+$/;
if (!nameRegex.test(clientName)) {
  return showError(
    "Client name should not contain numbers or special characters"
  );
}
if (!clientName) return showError("Please enter client name");
if (!budget) return showError("Please enter budget");
if (!(isWedding || isMaternity)) {
  if (!/^\d+$/.test(budget)) {
    return showError("Budget should contain only numbers");
  }
}
if (!eventDate) return showError("Please select event date");
// if (!toDate) return showError("Please select to date");
if (!location) return showError("Please select City");
if (!cityRegex.test(selectedCity)) {
  return showError(
    "City name should contain only letters"
  );
}

if (!isOtherCity && !metroCities.includes(selectedCity)) {
  return showError("Please select a valid city from the list");
}
// Validate numeric budget only for manual entry

// if(!addressData.flatOrHouseNo) return showError("Flat or House Number should Required");
// if (!flatHouseRegex.test(addressData.flatOrHouseNo)) {
//   return showError(
//     "Enter proper flat or house number"
//   );
// }
// if (isOtherCity && !otherCity) return showError("Please enter other city");
if (requirements.length === 0) return showError("Please add at least one requirement");
if (editingPreferences === null) return showError("Please select editing preference");


    const token = localStorage.getItem("PhotographerUserToken");

    const payload = {
      clientName,
      service_id: serviceId,
      eventType: serviceName,
      startDate: formatDate(eventDate),
      endDate: formatDate(eventDate),
      // startDate: formatDate(fromDate),
       address: selectedCity,
      location: selectedCity,
      budget,
     requirements: [requirements],
      editingPreferences,
    };

    if (!token) {
      const existingData = localStorage.getItem("quoteData");
      localStorage.setItem(
        "quoteData",
        JSON.stringify(existingData ? { ...JSON.parse(existingData), ...payload } : payload)
      );
      setShowLoginModal(true);
      return;
    }

    try {
      setLoading(true);
      await postPersonalizedBudget(payload);
      setModalTitle("Success");
      setModalMessage("Your quote request has been submitted successfully.");
      setRedirectAfterClose(true);
      setShowModal(true);
    } catch (error) {
      setModalTitle("Error");
      setModalMessage(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);

    if (redirectAfterClose) {
      navigate("/myProfile", {
        state: { openTab: "quotes" },
      });
    }
  };

 useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      budgetDropdownRef.current &&
      !budgetDropdownRef.current.contains(event.target)
    ) {
      setShowBudgetDropdown(false);
    }

    if (
      cityDropdownRef.current &&
      !cityDropdownRef.current.contains(event.target)
    ) {
      setShowCityDropdown(false);
      setCitySearchTerm(""); // optional: clear search
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <>
      {loading && <Loader />}

      <div className="budget-wrapper d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
        <NavigationButtons />
        <div className="container">
          <h1 className="title text-center mb-3">
            Get your Personalized Quote
          </h1>
          <h5 className="mb-4">Service Name - {serviceName}</h5>
          <div className="budget-card mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="budget-row">
                <label className="budget-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control budget-input"
                  placeholder="Enter Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              {/* Budget */}
              <div className="budget-row">
                <label className="budget-label">
                  Budget <span className="text-danger">*</span>
                </label>

                {(isWedding || isMaternity) ? (
                  <div className="custom-dropdown-wrapper" ref={budgetDropdownRef}>
                    <button
                      type="button"
                      className="form-control budget-input custom-dropdown-btn"
                      onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
                    >
                      {budget || "Select Budget"}
                    </button>

                    {showBudgetDropdown && (
                      <div className="custom-dropdown-menu">
                        {budgetOptions.map((item, index) => (
                          <div
                            key={index}
                            className="custom-dropdown-item"
                            onClick={() => {
                              setBudget(item);
                              setShowBudgetDropdown(false);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // <input
                  //   type="text"
                  //   className="form-control budget-input"
                  //   placeholder="₹ Enter Budget"
                  //   value={budget}
                  //   onChange={(e) => setBudget(e.target.value)}
                  // />

                    <input
                      type="number"
                      className="form-control budget-input"
                      placeholder="Enter Budget"
                      value={budget}
                      min="0"
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-"].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                )}
              </div>

              {/* Event Dates */}
              <div className="budget-row">
                <label className="budget-label">
                  Event Date <span className="text-danger">*</span>
                </label>

                {/* <div className="date-group">
                  <span className="date-text">From</span>
                 <input
                  type="date"
                  className="form-control budget-input date-input"
                  min={minDate}
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    setToDate("");
                  }}
                />

                  <span className="date-text">To</span>
                  <input
                    type="date"
                    className="form-control budget-input date-input"
                    min={fromDate || minDate}
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div> */}

                <input
  type="date"
  className="form-control budget-input"
  min={minDate}
  value={eventDate}
  onChange={(e) => setEventDate(e.target.value)}
/>
              </div>

              {/* Event City */}
              <div className="budget-row">
                <label className="budget-label">
                  Event City <span className="text-danger">*</span>
                </label>

                {isOtherCity ? (
                  // 🔥 SAME INPUT AREA BECOMES TEXT INPUT
                  <input
                    type="text"
                    className="form-control budget-input"
                    placeholder="Enter your city name here"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    onBlur={() => {
                      if (!selectedCity) {
                        setIsOtherCity(false);
                      }
                    }}
                  />
                ) : (
                 <div className="custom-dropdown-wrapper" ref={cityDropdownRef}>
                <input
                  type="text"
                  className="form-control budget-input"
                  placeholder="Search or select city"
                  value={selectedCity}
                  onFocus={() => setShowCityDropdown(true)}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setCitySearchTerm(e.target.value);
                    setShowCityDropdown(true);
                  }}
                />

                {showCityDropdown && (
                  <div className="custom-dropdown-menu">
                    {filteredCities.map((city, index) => (
                      <div
                        key={index}
                        className="custom-dropdown-item"
                        onClick={() => {
                          if (city === "Other") {
                            setIsOtherCity(true);
                            setSelectedCity("");
                          } else {
                            setSelectedCity(city);
                          }
                          setCitySearchTerm("");
                          setShowCityDropdown(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}

                    {filteredCities.length === 0 && (
                      <div className="custom-dropdown-item text-center" style={{color:"white"}}>
                        No cities found
                      </div>
                    )}
                  </div>
                )}
              </div>
                              )}
              </div>


              <div className="budget-row">
                <label className="budget-label">
                  Coverage Required <span className="text-danger">*</span>
                </label>

               <div className="budget-options">
  {[
    "Photography",
    "Videography",
    "Complete Coverage (Photo + Video)",
  ].map((item) => (
    <label key={item} className="budget-option-item">
      <input
        type="radio"
        name="coverageRequired"
        value={item}
        checked={requirements === item}
        onChange={() => setRequirements(item)}
      />
      {item}
    </label>
  ))}
</div>
                
              </div>


              <div className="budget-row">
                <label className="budget-label">
                  Editing Preferences <span className="text-danger">*</span>
                </label>

                <div className="budget-options">
                  <label className="budget-option-item">
                    <input
                      type="radio"
                      name="editingPreferences"
                      checked={editingPreferences === true}
                      onChange={() => setEditingPreferences(true)}
                    />
                    Yes, I’d like professionally edited photos/videos
                  </label>

                  <label className="budget-option-item">
                    <input
                      type="radio"
                      name="editingPreferences"
                      checked={editingPreferences === false}
                      onChange={() => setEditingPreferences(false)}
                    />
                    No, I only need raw files
                  </label>
                </div>
              </div>
              {/* Submit */}
              <div className="text-center mt-5">
                <button type="submit" className="btn buttons w-50">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <PleaseLoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <CommonMessageModal
        show={showModal}
        onClose={handleModalClose}
        title={modalTitle}
        message={modalMessage}
        buttonText="Okay"
      />
    </>
  );
};

export default PersonalizedBudgetPage;