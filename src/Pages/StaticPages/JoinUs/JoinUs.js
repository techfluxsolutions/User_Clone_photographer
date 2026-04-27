

// import React, { useState } from "react";
// import "./JoinUs.css";
// import Loader from "../../../Template/Loader/Loader";
// import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
// import { postJoinUs } from "../../../utils/APIs/JoinUs&contactUsApis";

// const SERVICES_OPTIONS = [
//   "Product Photography",
//   "Commercial / Advertising Photography",
//   "Corporate Photography",
//   "Fashion / Lifestyle",
//   "Food Photography",
//   "Automobile Photography",
//   "Sports Photography",
//   "Industrial / Architecture",
//   "Event Coverage",
//   "Videography (Brand Films)",
//   "Reels / Social Media Content",
//   "Documentary / Interviews",
//   "Editing / Post-production",
// ];

// const JoinUs = () => {
//   const [loader, setLoader] = useState(false);

//   const [modal, setModal] = useState({
//     show: false,
//     message: "",
//   });

//   const [formData, setFormData] = useState({
//     fullName: "",
//     phoneNumber: "",
//     emailId: "",
//     city: "",
//     cameraGearsOwned: "",
//     portfolioLinks: "",
//     employmentType: "",
//     gender: "",
//     willingToTravel: "",
//     experience: "",
//     professionalExpertise: [],
//     primaryServicesOffered: [],
//     comfortableWorkingUnderBrand: "",
//     gstRegistration: "",
//     kycAvailable: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: checked
//           ? [...prev[name], value]
//           : prev[name].filter((i) => i !== value),
//       }));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };
// const phoneRegex = /^[6-9]\d{9}$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const {
//       fullName,
//       phoneNumber,
//       emailId,
//       city,
//       cameraGearsOwned,
//       portfolioLinks,
//       employmentType,
//       gender,
//       willingToTravel,
//       experience,
//       professionalExpertise,
//       primaryServicesOffered,
//       comfortableWorkingUnderBrand,
//       gstRegistration,
//       kycAvailable,
//     } = formData;

//     // 🔴 CUSTOM VALIDATION (MODAL BASED)
//     if (
//       !fullName.trim() ||
//       !phoneNumber.trim() ||
//       !emailId.trim() ||
//       !city.trim() ||
//       !cameraGearsOwned.trim() ||
//       !portfolioLinks.trim() ||
//       !employmentType ||
//       !gender ||
//       !willingToTravel ||
//       !experience ||
//       !comfortableWorkingUnderBrand ||
//       !gstRegistration ||
//       !kycAvailable ||
//       professionalExpertise.length === 0 ||
//       primaryServicesOffered.length === 0
//     ) {
//       setModal({
//         show: true,
//         message: "Please fill all the fields.",
//       });
//       return;
//     }
// // 📞 Phone format validation
// if (!phoneRegex.test(phoneNumber)) {
//   setModal({
//     show: true,
//     message: "Please enter a valid 10-digit phone number.",
//   });
//   return;
// }

// // 📧 Email format validation
// if (!emailRegex.test(emailId)) {
//   setModal({
//     show: true,
//     message: "Please enter a valid email address.",
//   });
//   return;
// }
//     try {
//       setLoader(true);

//       const res = await postJoinUs(formData);

//       if (res?.data?.success) {
//         setModal({
//           show: true,
//           message: res.data.message,
//         });

//         setFormData({
//           fullName: "",
//           phoneNumber: "",
//           emailId: "",
//           city: "",
//           cameraGearsOwned: "",
//           portfolioLinks: "",
//           employmentType: "",
//           gender: "",
//           willingToTravel: "",
//           experience: "",
//           professionalExpertise: [],
//           primaryServicesOffered: [],
//           comfortableWorkingUnderBrand: "",
//           gstRegistration: "",
//           kycAvailable: "",
//         });
//       }
//     } catch (error) {
//       setModal({
//         show: true,
//         message:
//           error?.response?.data?.message ||
//           "Something went wrong. Please try again.",
//       });
//     } finally {
//       setLoader(false);
//     }
//   };

//   const renderRadio = (name, options) => (
//     <div className="joinUs-options">
//       {options.map((item) => (
//         <label key={item} className="joinUs-option-item">
//           <input
//             type="radio"
//             name={name}
//             value={item}
//             checked={formData[name] === item}
//             onChange={handleChange}
//           />
//           {item}
//         </label>
//       ))}
//     </div>
//   );

//   const renderCheckbox = (name, options) => (
//     <div className="joinUs-options">
//       {options.map((item) => (
//         <label key={item} className="joinUs-option-item">
//           <input
//             type="checkbox"
//             name={name}
//             value={item}
//             checked={formData[name]?.includes(item)}
//             onChange={handleChange}
//           />
//           {item}
//         </label>
//       ))}
//     </div>
//   );

//   return (
//     <>
//       {loader && <Loader />}

//       <div className="joinUs-wrapper">
//         <div className="container">
//           <h2 className="joinUs-title text-center">Join Us</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="joinUs-card mx-auto">
//               <div className="row">

//                 {[
//                   ["Full Name", "fullName"],
//                   ["Phone Number", "phoneNumber"],
//                   ["Email", "emailId"],
//                   ["City", "city"],
//                 ].map(([label, name]) => (
//                   <div className="col-md-6 mb-4" key={name}>
//                     <label className="center-label">
//                       {label} <span className="required">*</span>
//                     </label>
//                     <input
//                       className="form-control joinUs-input"
//                       name={name}
//                       value={formData[name]}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 ))}

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     Employment Type <span className="required">*</span>
//                   </label>
//                   {renderRadio("employmentType", [
//                     "Freelancer",
//                     "Studio Owner",
//                     "Part Time",
//                     "Other",
//                   ])}
//                 </div>

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     Gender <span className="required">*</span>
//                   </label>
//                   {renderRadio("gender", ["Male", "Female", "Others"])}
//                 </div>

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     Willing to Travel <span className="required">*</span>
//                   </label>
//                   {renderRadio("willingToTravel", [
//                     "Yes (Pan India)",
//                     "Yes (Selected Cities)",
//                     "No",
//                   ])}
//                 </div>

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     Experience <span className="required">*</span>
//                   </label>
//                   {renderRadio("experience", [
//                     "0-2 Years",
//                     "3-5 Years",
//                     "6-10 Years",
//                     "10+ Years",
//                   ])}
//                 </div>

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     Professional Expertise <span className="required">*</span>
//                   </label>
//                   {renderCheckbox("professionalExpertise", [
//                     "Photography",
//                     "Videography",
//                     "Cinematography",
//                     "Editing",
//                   ])}
//                 </div>

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     GST Registration <span className="required">*</span>
//                   </label>
//                   {renderRadio("gstRegistration", [
//                     "Available",
//                     "Not Available",
//                   ])}
//                 </div>

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     Comfortable Under Brand <span className="required">*</span>
//                   </label>
//                   {renderRadio("comfortableWorkingUnderBrand", ["Yes", "No"])}
//                 </div>

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     KYC Available <span className="required">*</span>
//                   </label>
//                   {renderRadio("kycAvailable", ["Yes", "No"])}
//                 </div>

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     Camera Gears Owned <span className="required">*</span>
//                   </label>
//                   <input
//                     className="form-control joinUs-input"
//                     name="cameraGearsOwned"
//                     value={formData.cameraGearsOwned}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-4">
//                   <label className="center-label">
//                     Portfolio Link <span className="required">*</span>
//                   </label>
//                   <input
//                     className="form-control joinUs-input"
//                     name="portfolioLinks"
//                     value={formData.portfolioLinks}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-12 mb-4">
//                   <label className="center-label">
//                     Primary Services Offered <span className="required">*</span>
//                   </label>
//                   {renderCheckbox(
//                     "primaryServicesOffered",
//                     SERVICES_OPTIONS
//                   )}
//                 </div>

//                 <div className="text-center mt-4">
//                   <button type="submit" className="joinUs-submit-btn">
//                     Submit
//                   </button>
//                 </div>

//               </div>
//             </div>
//           </form>
//         </div>
//       </div>

//       <CommonMessageModal
//         show={modal.show}
//         message={modal.message}
//         onClose={() => setModal({ show: false, message: "" })}
//       />
//     </>
//   );
// };

// export default JoinUs;








import React, { useState } from "react";
import "./JoinUs.css";
import Loader from "../../../Template/Loader/Loader";
import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
import { postJoinUs } from "../../../utils/APIs/JoinUs&contactUsApis";
import NavigationButtons from "../../../Template/NavigationButtons/NavigationButtons";

const SERVICES_OPTIONS = [
  "Product Photography",
  "Commercial / Advertising Photography",
  "Corporate Photography",
  "Fashion / Lifestyle",
  "Food Photography",
  "Automobile Photography",
  "Sports Photography",
  "Industrial / Architecture",
  "Event Coverage",
  "Videography (Brand Films)",
  "Reels / Social Media Content",
  "Documentary / Interviews",
  "Editing / Post-production",
];

const JoinUs = () => {
  const [loader, setLoader] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailId: "",
    city: "",
    cameraGearsOwned: "",
    portfolioLinks: "",
    employmentType: "",
    gender: "",
    willingToTravel: "",
    experience: "",
    professionalExpertise: [],
    primaryServicesOffered: [],
    comfortableWorkingUnderBrand: "",
    gstRegistration: "",
    kycAvailable: "",
  });


  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Please fill this field";

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Please fill this field";
    else if (!phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter valid 10-digit phone number";

    if (!formData.emailId.trim())
      newErrors.emailId = "Please fill this field";
    else if (!emailRegex.test(formData.emailId))
      newErrors.emailId = "Enter valid email address";

    if (!formData.city.trim())
      newErrors.city = "Please fill this field";

    if (!formData.cameraGearsOwned.trim())
      newErrors.cameraGearsOwned = "Please fill this field";

    const urlRegex =
      /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/;

    if (!formData.portfolioLinks.trim())
      newErrors.portfolioLinks = "Please fill this field";
    else if (!urlRegex.test(formData.portfolioLinks))
      newErrors.portfolioLinks = "Enter a valid URL";

    if (!formData.employmentType)
      newErrors.employmentType = "Please select an option";

    if (!formData.gender)
      newErrors.gender = "Please select an option";

    if (!formData.willingToTravel)
      newErrors.willingToTravel = "Please select an option";

    if (!formData.experience)
      newErrors.experience = "Please select an option";

    if (!formData.comfortableWorkingUnderBrand)
      newErrors.comfortableWorkingUnderBrand =
        "Please select an option";

    if (!formData.gstRegistration)
      newErrors.gstRegistration = "Please select an option";

    if (!formData.kycAvailable)
      newErrors.kycAvailable = "Please select an option";

    if (formData.professionalExpertise.length === 0)
      newErrors.professionalExpertise =
        "Please select at least one option";

    if (formData.primaryServicesOffered.length === 0)
      newErrors.primaryServicesOffered =
        "Please select at least one option";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((i) => i !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoader(true);

      const res = await postJoinUs(formData);

      if (res?.data?.success) {
        setModal({
          show: true,
          message: res.data.message,
        });

        setFormData({
          fullName: "",
          phoneNumber: "",
          emailId: "",
          city: "",
          cameraGearsOwned: "",
          portfolioLinks: "",
          employmentType: "",
          gender: "",
          willingToTravel: "",
          experience: "",
          professionalExpertise: [],
          primaryServicesOffered: [],
          comfortableWorkingUnderBrand: "",
          gstRegistration: "",
          kycAvailable: "",
        });

        setErrors({});
      }
    } catch (error) {
      setModal({
        show: true,
        message:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoader(false);
    }
  };

  const renderRadio = (name, options) => (
    <div className="joinUs-options">
      {options.map((item) => (
        <label key={item} className="joinUs-option-item">
          <input
            type="radio"
            name={name}
            value={item}
            checked={formData[name] === item}
            onChange={handleChange}
          />
          {item}
        </label>
      ))}
    </div>
  );

  const renderCheckbox = (name, options) => (
    <div className="joinUs-options">
      {options.map((item) => (
        <label key={item} className="joinUs-option-item">
          <input
            type="checkbox"
            name={name}
            value={item}
            checked={formData[name]?.includes(item)}
            onChange={handleChange}
          />
          {item}
        </label>
      ))}
    </div>
  );

  return (
    <>
      {loader && <Loader />}

      <div className="joinUs-wrapper" style={{ position: 'relative' }}>
        <NavigationButtons />
        <div className="container">
          <h2 className="joinUs-title text-center">Join Us</h2>

          <form onSubmit={handleSubmit}>
            <div className="joinUs-card mx-auto">
              <div className="row">

                {/* TEXT INPUTS */}
                {[
                  ["Full Name", "fullName", "text"],
                  ["Phone Number", "phoneNumber", "tel"],
                  ["Email", "emailId", "email"],
                  ["City", "city", "text"],
                ].map(([label, name, type]) => (
                  <div className="col-md-6 mb-4" key={name}>
                    <label className="center-label">
                      {label} <span className="required">*</span>
                    </label>

                    <input
                      type={type}
                      className={`form-control joinUs-input ${errors[name] ? "error-input" : ""
                        }`}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                    />

                    {errors[name] && (
                      <small className="error-text">
                        {errors[name]}
                      </small>
                    )}
                  </div>
                ))}

                {/* EMPLOYMENT TYPE */}
                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    Employment Type <span className="required">*</span>
                  </label>

                  <div className={errors.employmentType ? "error-group" : ""}>
                    {renderRadio("employmentType", [
                      "Freelancer",
                      "Studio Owner",
                      "Part Time",
                      "Other",
                    ])}
                  </div>

                  {errors.employmentType && (
                    <small className="error-text">
                      {errors.employmentType}
                    </small>
                  )}
                </div>

                {/* GENDER */}
                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    Gender <span className="required">*</span>
                  </label>

                  <div className={errors.gender ? "error-group" : ""}>
                    {renderRadio("gender", [
                      "Male",
                      "Female",
                      "Others",
                    ])}
                  </div>

                  {errors.gender && (
                    <small className="error-text">
                      {errors.gender}
                    </small>
                  )}
                </div>

                {/* WILLING TO TRAVEL */}
                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    Willing to Travel <span className="required">*</span>
                  </label>

                  <div className={errors.willingToTravel ? "error-group" : ""}>
                    {renderRadio("willingToTravel", [
                      "Yes (Pan India)",
                      "Yes (Selected Cities)",
                      "No",
                    ])}
                  </div>

                  {errors.willingToTravel && (
                    <small className="error-text">
                      {errors.willingToTravel}
                    </small>
                  )}
                </div>

                {/* EXPERIENCE */}
                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    Experience <span className="required">*</span>
                  </label>

                  <div className={errors.experience ? "error-group" : ""}>
                    {renderRadio("experience", [
                      "0-2 Years",
                      "3-5 Years",
                      "6-10 Years",
                      "10+ Years",
                    ])}
                  </div>

                  {errors.experience && (
                    <small className="error-text">
                      {errors.experience}
                    </small>
                  )}
                </div>

                {/* PROFESSIONAL EXPERTISE */}
                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    Professional Expertise <span className="required">*</span>
                  </label>

                  <div className={errors.professionalExpertise ? "error-group" : ""}>
                    {renderCheckbox("professionalExpertise", [
                      "Photography",
                      "Videography",
                      "Cinematography",
                      "Editing",
                    ])}
                  </div>

                  {errors.professionalExpertise && (
                    <small className="error-text">
                      {errors.professionalExpertise}
                    </small>
                  )}
                </div>


                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    GST Registration <span className="required">*</span>
                  </label>

                  <div className={errors.gstRegistration ? "error-group" : ""}>
                    {renderRadio("gstRegistration", [
                      "Available",
                      "Not Available",
                    ])}
                  </div>

                  {errors.gstRegistration && (
                    <small className="error-text">
                      {errors.gstRegistration}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    Comfortable Working Under Brand{" "}
                    <span className="required">*</span>
                  </label>

                  <div
                    className={
                      errors.comfortableWorkingUnderBrand
                        ? "error-group"
                        : ""
                    }
                  >
                    {renderRadio(
                      "comfortableWorkingUnderBrand",
                      ["Yes", "No"]
                    )}
                  </div>

                  {errors.comfortableWorkingUnderBrand && (
                    <small className="error-text">
                      {errors.comfortableWorkingUnderBrand}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    KYC Available <span className="required">*</span>
                  </label>

                  <div className={errors.kycAvailable ? "error-group" : ""}>
                    {renderRadio("kycAvailable", ["Yes", "No"])}
                  </div>

                  {errors.kycAvailable && (
                    <small className="error-text">
                      {errors.kycAvailable}
                    </small>
                  )}
                </div>

                {/* CAMERA */}
                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    Camera Gears Owned <span className="required">*</span>
                  </label>

                  <input
                    className={`form-control joinUs-input ${errors.cameraGearsOwned ? "error-input" : ""
                      }`}
                    name="cameraGearsOwned"
                    value={formData.cameraGearsOwned}
                    onChange={handleChange}
                  />

                  {errors.cameraGearsOwned && (
                    <small className="error-text">
                      {errors.cameraGearsOwned}
                    </small>
                  )}
                </div>

                {/* PORTFOLIO */}
                <div className="col-md-6 mb-4">
                  <label className="center-label">
                    Portfolio Link <span className="required">*</span>
                  </label>

                  <input
                    className={`form-control joinUs-input ${errors.portfolioLinks ? "error-input" : ""
                      }`}
                    name="portfolioLinks"
                    value={formData.portfolioLinks}
                    onChange={handleChange}
                  />

                  {errors.portfolioLinks && (
                    <small className="error-text">
                      {errors.portfolioLinks}
                    </small>
                  )}
                </div>

                {/* PRIMARY SERVICES */}
                <div className="col-12 mb-4">
                  <label className="center-label">
                    Primary Services Offered <span className="required">*</span>
                  </label>

                  <div className={errors.primaryServicesOffered ? "error-group" : ""}>
                    {renderCheckbox(
                      "primaryServicesOffered",
                      SERVICES_OPTIONS
                    )}
                  </div>

                  {errors.primaryServicesOffered && (
                    <small className="error-text">
                      {errors.primaryServicesOffered}
                    </small>
                  )}
                </div>

                {/* SUBMIT */}
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="joinUs-submit-btn"
                  >
                    Submit
                  </button>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL */}
      <CommonMessageModal
        show={modal.show}
        message={modal.message}
        onClose={() =>
          setModal({ show: false, message: "" })
        }
      />
    </>
  );
};

export default JoinUs;

