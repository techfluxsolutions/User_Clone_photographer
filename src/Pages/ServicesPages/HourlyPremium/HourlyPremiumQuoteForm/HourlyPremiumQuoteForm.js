import React, { useState, useRef, useEffect } from "react";
import "./HourlyPremiumQuoteForm.css";
import Loader from "../../../../Template/Loader/Loader";
import CommonMessageModal from "../../../CommonMessageModal/CommonMessageModal";
import { postPersonalizedBudget } from "../../../../utils/APIs/bookingApis";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../../../../Template/NavigationButtons/NavigationButtons";
import HourlyPremiumDatePicker from "./HourlyPremiumDatePicker";

const HourlyPremiumQuoteForm = () => {
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
      quoteType: "hourlyPremiumQuote",
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
      <div className="premium-quote-wrapper d-flex justify-content-center align-items-center">
        <div className="premium-overlay"></div>
        <NavigationButtons />
        
        <div className="container premium-container">
          <div className="text-center mb-5">
            <h1 className="premium-title">
              Request Your Elite Hourly Experience
            </h1>
            <p className="premium-subtitle">Tailored perfection for those who demand the extraordinary</p>
          </div>

          <div className="premium-quote-card mx-auto">
            <form onSubmit={handleSubmit}>
              
              <div className="premium-row">
                <label className="premium-label">
                  Client Name <span className="gold-star">*</span>
                </label>
                <input
                  type="text"
                  name="clientName"
                  className="premium-input"
                  placeholder="Ex. John Doe"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="premium-row">
                <label className="premium-label">
                  Elite Category <span className="gold-star">*</span>
                </label>
                <div className="premium-dropdown-wrapper" ref={categoryDropdownRef}>
                  <button
                    type="button"
                    className="premium-input premium-dropdown-btn"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  >
                    {formData.eventType || "Select Experience"}
                    <span className="premium-dropdown-arrow"></span>
                  </button>

                  {showCategoryDropdown && (
                    <div className="premium-dropdown-menu">
                      {services.map((service) => (
                        <div
                          key={service}
                          className="premium-dropdown-item"
                          onClick={() => handleCategorySelect(service)}
                        >
                          {service}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="premium-row">
                <label className="premium-label">
                  Event Date <span className="gold-star">*</span>
                </label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  placeholder="DD / MM / YY"
                  className="premium-input"
                  onClick={() => setShowDatePicker(true)}
                  readOnly
                  required
                />
              </div>

              {showDatePicker && (
                <HourlyPremiumDatePicker
                  onCancel={() => setShowDatePicker(false)}
                  onSet={handleDateSet}
                  initialDateStr={formData.startDate}
                />
              )}

              <div className="premium-row">
                <label className="premium-label">
                  Event City <span className="gold-star">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  className="premium-input"
                  placeholder="Enter City"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="premium-row">
                <label className="premium-label">
                  Elite Requirements <span className="gold-star">*</span>
                </label>
                <div className="premium-options-group">
                  {requirementsList.map((req) => (
                    <label key={req} className="premium-option-item">
                      <input
                        type="radio"
                        name="photographyRequirements"
                        value={req}
                        checked={formData.photographyRequirements === req}
                        onChange={handleChange}
                        required
                      />
                      <span className="premium-radio-label">{req}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-center mt-5">
                <button type="submit" className="premium-submit-btn">
                  Reserve Experience
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

export default HourlyPremiumQuoteForm;
