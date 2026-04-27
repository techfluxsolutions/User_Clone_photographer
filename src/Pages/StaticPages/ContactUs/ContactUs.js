// import React, { useState } from "react";
// import "./ContactUs.css";
// import Loader from "../../../Template/Loader/Loader";
// import { postContactUs } from "../../../utils/APIs/JoinUs&contactUsApis";
// import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
// import GetInTouch from "./GetInTouch/GetInTouch";


// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   /* Handle Input Change */
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   /* Handle Submit */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const payload = {
//         fullName: formData.fullName,
//         email: formData.email,
//         phoneNumber: formData.phone, // API key mapping
//         message: formData.message,
//       };

//       const res = await postContactUs(payload);

//       if (res?.data?.success) {
//         setModalMessage(res.data.message);

//         // Reset form
//         setFormData({
//           fullName: "",
//           email: "",
//           phone: "",
//           message: "",
//         });
//       } else {
//         setModalMessage("Something went wrong. Please try again.");
//       }

//       setShowModal(true);
//     } catch (error) {
//       setModalMessage(
//         error?.response?.data?.message ||
//         "Something went wrong. Please try again."
//       );
//       setShowModal(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <Loader />}

//       <div className="contactUs-wrapper">
//         <div className="contactUs-content-col">
//           <div className="contactUs-card">
//             <h2 className="contactUs-title">Contact Us</h2>

//             <form onSubmit={handleSubmit}>
//               {/* Full Name */}
//               <div className="mb-3">
//                 <label className="contactUs-label">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   className="contactUs-input"
//                   placeholder="Enter your full name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div className="mb-3">
//                 <label className="contactUs-label">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="contactUs-input"
//                   placeholder="Enter your email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Phone */}
//               <div className="mb-3">
//                 <label className="contactUs-label">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   className="contactUs-input"
//                   placeholder="Enter your phone number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Message */}
//               <div className="mb-4">
//                 <label className="contactUs-label">Message</label>
//                 <textarea
//                   name="message"
//                   className="contactUs-textarea"
//                   placeholder="Enter your message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="text-center">
//                 <button type="submit" className="contactUs-submit-btn">
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>       
//           <GetInTouch/>
//         </div>
//       </div>

//       {/* Message Modal */}
//       <CommonMessageModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         message={modalMessage}
//       />
//     </>
//   );
// };

// export default ContactUs;



import React, { useState } from "react";
import "./ContactUs.css";
import Loader from "../../../Template/Loader/Loader";
import { postContactUs } from "../../../utils/APIs/JoinUs&contactUsApis";
import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
import GetInTouch from "./GetInTouch/GetInTouch";
import NavigationButtons from "../../../Template/NavigationButtons/NavigationButtons";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
const [errors, setErrors] = useState({});
  const phoneRegex = /^[6-9]\d{9}$/;

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
  /* Handle Input Change */
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // clear error while typing
  if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
};

  /* Handle Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 MANUAL VALIDATION
   let newErrors = {};

if (!formData.fullName.trim()) {
  newErrors.fullName = "Please enter full name";
}

if (!formData.email.trim()) {
  newErrors.email = "Please enter email";
} else if (!emailRegex.test(formData.email)) {
  newErrors.email = "Enter valid email address";
}

if (!formData.phone.trim()) {
  newErrors.phone = "Please enter phone number";
} else if (!phoneRegex.test(formData.phone)) {
  newErrors.phone = "Enter valid 10-digit phone number";
}

setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {
  return;
}

    if (errors.length > 0) {
      setModalMessage(errors.join(", "));
      setShowModal(true);
      return; // ❌ stop submit
    }

    try {
      setLoading(true);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        message: formData.message, // optional
      };

      const res = await postContactUs(payload);

      if (res?.data?.success) {
        setModalMessage(res.data.message);

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setModalMessage("Something went wrong. Please try again.");
      }

      setShowModal(true);
    } catch (error) {
      setModalMessage(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="contactUs-wrapper" style={{ position: 'relative' }}>
        <NavigationButtons />
        <div className="contactUs-content-col">
          <div className="contactUs-card">
            <h2 className="contactUs-title">Contact Us</h2>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <input
  type="text"
  name="fullName"
  className={`contactUs-input ${
    errors.fullName ? "error-input" : ""
  }`}
  placeholder="Enter your full name"
  value={formData.fullName}
  onChange={handleChange}
/>

{errors.fullName && (
  <small className="error-text">
    {errors.fullName}
  </small>
)}

              {/* Email */}
           <input
  type="email"
  name="email"
  className={`contactUs-input ${
    errors.email ? "error-input" : ""
  }`}
  placeholder="Enter your email address"
  value={formData.email}
  onChange={handleChange}
/>

{errors.email && (
  <small className="error-text">
    {errors.email}
  </small>
)}

              {/* Phone */}
            <input
  type="tel"
  name="phone"
  className={`contactUs-input ${
    errors.phone ? "error-input" : ""
  }`}
  placeholder="Enter your phone number"
  value={formData.phone}
  onChange={handleChange}
/>

{errors.phone && (
  <small className="error-text">
    {errors.phone}
  </small>
)}
              {/* Message (Optional) */}
              <div className="mb-4">
                <label className="contactUs-label">
                  Message
                </label>
                <textarea
                  name="message"
                  className="contactUs-textarea"
                  placeholder="Enter your message (optional)"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="contactUs-submit-btn"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <GetInTouch />
        </div>
      </div>

      {/* Message Modal */}
      <CommonMessageModal
        show={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </>
  );
};

export default ContactUs;