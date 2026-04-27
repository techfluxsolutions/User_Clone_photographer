import React, { useState } from "react";
import "./EditingQuoteForm.css";
import Loader from "../../../Template/Loader/Loader";
import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
import { postPersonalizedBudget } from "../../../utils/APIs/bookingApis";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../../../Template/NavigationButtons/NavigationButtons";

const EditingQuoteForm = () => {
  const navigate = useNavigate();

  const editingOptions = [
    { id: "photos", label: "Photos" },
    { id: "reel", label: "Reel < 60sec" },
    { id: "video", label: "Video < 1 min" }
  ];

  const [formData, setFormData] = useState({
    clientName: "",
    editingRequired: [], // Array for checkboxes
    location: "",
    additionalDetails: "",
    phoneNumber: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleCheckboxChange = (optionId) => {
    setFormData((prev) => {
      const current = prev.editingRequired;
      if (current.includes(optionId)) {
        return { ...prev, editingRequired: current.filter(id => id !== optionId) };
      } else {
        return { ...prev, editingRequired: [...current, optionId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.editingRequired.length === 0) {
      alert("Please select at least one editing requirement.");
      return;
    }

    const payload = {
      eventType: "Video Editing",
      location: formData.location,
      photographyRequirements: formData.editingRequired.join(", "),
      clientName: formData.clientName,
      clientId: localStorage.getItem("client_id"),
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      quoteType: "editingQuote",
      additionalDetails: formData.additionalDetails
    };

    try {
      setLoading(true);
      const response = await postPersonalizedBudget(payload);
      setMessage(response?.data?.message || "Editing quote submitted successfully");
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
            Get your Personalized Editing Quote
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
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="budget-row">
                <label className="budget-label">
                  Editing Required <span className="text-danger">*</span>
                </label>
                <div className="budget-options">
                  {editingOptions.map((opt) => (
                    <label key={opt.id} className="budget-option-item">
                      <input
                        type="checkbox"
                        checked={formData.editingRequired.includes(opt.id)}
                        onChange={() => handleCheckboxChange(opt.id)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="budget-row">
                <label className="budget-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  className="form-control budget-input"
                  placeholder="Enter city"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="budget-row">
                <label className="budget-label">
                  Additional Details
                </label>
                <textarea
                  name="additionalDetails"
                  className="form-control budget-input"
                  placeholder="Tell us more about your project..."
                  onChange={handleChange}
                  style={{ height: '100px', padding: '12px' }}
                />
              </div>

              <div className="text-center mt-5">
                <button type="submit" className="btn buttons w-50">
                  Submit Request
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

export default EditingQuoteForm;
