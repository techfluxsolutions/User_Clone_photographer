import React, { useState, useRef, useEffect } from "react";
import "./HourlyStandardQuoteForm.css";
import Loader from "../../../../Template/Loader/Loader";
import CommonMessageModal from "../../../CommonMessageModal/CommonMessageModal";
import { postPersonalizedBudget } from "../../../../utils/APIs/bookingApis";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../../../../Template/NavigationButtons/NavigationButtons";
import HourlyStandardDatePicker from "./HourlyStandardDatePicker";

const HourlyStandardQuoteForm = () => {
  const navigate = useNavigate();

  const services = [
    "Wedding Photography",
    "Maternity & Baby Shoot",
    "Event Photography",
    "Fashion Photography",
    "Product Photography",
    "Food Photography",
    "Automobile Photography",
    "Corporate Photography",
    "Sports Photography"
  ];

  const requirementsList = [
    "Photography",
    "Videography",
    "Lightening setup",
    "Editing"
  ];

  const [formData, setFormData] = useState({
    clientName: "",
    eventType: "", // Category
    startDate: "", // Date
    location: "",  // City
    photographyRequirements: "", // Requirement
    phoneNumber: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModalClose = () => {
    setShowMessage(false);
    navigate("/myProfile", {
      state: { openTab: "quotes" },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, eventType: category }));
    setShowCategoryDropdown(false);
  };

  const handleDateSet = (date) => {
    setFormData((prev) => ({ ...prev, startDate: date }));
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
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
      location: formData.location,
      photographyRequirements: formData.photographyRequirements,
      clientName: formData.clientName,
      clientId: localStorage.getItem("client_id"),
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      quoteType: "hourlyStandardQuote",
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
    <>
      {loading && <Loader />}
      <div className="budget-wrapper d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
        <NavigationButtons />
        <div className="container">
          <h1 className="title text-center mb-5">
            Get your Personalized Hourly Shoot Quote
          </h1>

          <div className="budget-card mx-auto">
            <form onSubmit={handleSubmit}>
              
              <div className="budget-row">
                <label className="budget-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="clientName"
                  className="form-control budget-input"
                  placeholder="Enter Name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="budget-row">
                <label className="budget-label">
                  Category <span className="text-danger">*</span>
                </label>
                <div className="custom-dropdown-wrapper" ref={categoryDropdownRef}>
                  <button
                    type="button"
                    className="form-control budget-input custom-dropdown-btn"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  >
                    {formData.eventType || "Select Category"}
                    <span className="dropdown-arrow"></span>
                  </button>

                  {showCategoryDropdown && (
                    <div className="custom-dropdown-menu">
                      {services.map((service) => (
                        <div
                          key={service}
                          className="custom-dropdown-item"
                          onClick={() => handleCategorySelect(service)}
                        >
                          {service}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="budget-row">
                <label className="budget-label">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  placeholder="DD/MM/YY"
                  className="form-control budget-input"
                  onClick={() => setShowDatePicker(true)}
                  readOnly
                  required
                />
              </div>

              {showDatePicker && (
                <HourlyStandardDatePicker
                  onCancel={() => setShowDatePicker(false)}
                  onSet={handleDateSet}
                  initialDateStr={formData.startDate}
                />
              )}

              <div className="budget-row">
                <label className="budget-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  className="form-control budget-input"
                  placeholder="Enter City"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="budget-row">
                <label className="budget-label">
                  Requirements <span className="text-danger">*</span>
                </label>
                <div className="budget-options">
                  {requirementsList.map((req) => (
                    <label key={req} className="budget-option-item">
                      <input
                        type="radio"
                        name="photographyRequirements"
                        value={req}
                        checked={formData.photographyRequirements === req}
                        onChange={handleChange}
                        required
                      />
                      {req}
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-center mt-5">
                <button type="submit" className="btn buttons w-50">
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      <CommonMessageModal
        show={showMessage}
        onClose={handleModalClose}
        message={message}
      />
    </>
  );
};

export default HourlyStandardQuoteForm;
