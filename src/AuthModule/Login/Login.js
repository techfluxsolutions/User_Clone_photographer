import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Login.css";
import { getTokenAPI, LoginAPI, VerifyOTP } from "../../utils/APIs/credentialsApis";
import { useNavigate } from "react-router-dom";
import Loader from "../../Template/Loader/Loader"; // ✅ Loader import
import { encryptData } from "../../utils/CRYPTO/cryptoFunction";
import CommonMessageModal from "../../Pages/CommonMessageModal/CommonMessageModal";
import { createBookingUsingPrice, getBookingPrice, postPersonalizedBudget } from "../../utils/APIs/bookingApis";
import { getAccessToken } from "../../utils/APIs/commonHeadApiLogic";

const Login = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  /* 🔹 Loader State */
  const [loading, setLoading] = useState(false);

  /* 🔹 Modal State */
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Message");
  const [modalMessage, setModalMessage] = useState("");
  const [redirectAfterModal, setRedirectAfterModal] = useState(false);
  // const [serviceCost, setServiceCost] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  /* 🔹 Timer State */
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);



  useEffect(() => {
    const checkExistingLogin = async () => {
      try {
        const token = getAccessToken();

        if (token) {
          setLoading(true)
          await getTokenAPI(token);  // sends token in body
          navigate("/editProfile");
        }
      } catch (error) {
        setLoading(false)
        console.log("Token invalid or expired");
        localStorage.clear();
      }
      finally {
        setLoading(false)
      }
    };

    checkExistingLogin();
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  const openModal = (title, message, redirect = false) => {
    if (!message) return;
    setModalTitle(title);
    setModalMessage(message);
    setRedirectAfterModal(redirect);
    setShowMessageModal(true);
  };

  // const formatDate = (date) => {
  //   const d = new Date(date);
  //   const day = String(d.getDate()).padStart(2, "0");
  //   const month = String(d.getMonth() + 1).padStart(2, "0");
  //   const year = d.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };


  /* 🔹 SEND OTP */
  const handleVerify = async () => {
    setOtp(["", "", "", ""])
    try {
      setLoading(true); // ✅ start loader

      const payload = {
        mobileNumber: phone,
        role: "user",
      };

      const response = await LoginAPI(payload);
      console.log("LOGIN RESPONSE",response?.data)

      openModal(
        response.data?.success ? "Success" : "Error",
        response.data?.message
      );

      if (response.data?.success) {
        setShowOtp(true);
        setTimer(60);
        setCanResend(false);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      }
    } catch (error) {
      openModal("Error", error.response?.data?.message);
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  /* 🔹 VERIFY OTP */
  const handleLogin = async () => {
    try {
      setLoading(true); // ✅ start loader

      const payload = {
        mobileNumber: phone,
        role: "user",
        otp: otp.join(""),
      };

      const response = await VerifyOTP(payload);
       console.log("LOGIN DETAILS",response?.data)

      openModal(
        response.data?.success ? "Success" : "Error",
        response.data?.message,
        response.data?.success
      );

      if (response.data?.success) {

       
        // ✅ SAVE TOKEN
        localStorage.setItem("PhotographerUserToken", encryptData(response.data?.token)
        );
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("mobileNumber", phone);
        localStorage.setItem("client_id", response?.data?.user?._id);
        localStorage.setItem(
          "user",
          JSON.stringify({ mobileNumber: phone, role: "user" })
        );
      }
    } catch (error) {
      openModal("Error", error.response?.data?.message);
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  /* 🔹 OTP INPUT HANDLERS */
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };
  // const existingData = localStorage.getItem("bookingData");
  // const parsedData = JSON.parse(existingData);

  // const fetchPrice = async () => {
  //   const response = await getBookingPrice({
  //     serviceId: parsedData?.service_id,
  //     additionalServicesId: parsedData?.additionalServicesId,
  //   });

  //   if (!response.data?.success) {
  //     throw new Error("Failed to fetch booking price");
  //   }

  //   const rawPrice = response.data.data?.serviceCost; // "5,999"
  //   if (!rawPrice) {
  //     throw new Error("Service cost missing");
  //   }

  //   const price = Number(String(rawPrice).replace(/,/g, ""));

  //   if (Number.isNaN(price)) {
  //     throw new Error("Invalid price format");
  //   }

  //   return price; // ✅ 5999
  // };



  // useEffect(() => {
  //   if (
  //     isLoggedIn &&
  //     parsedData?.service_id &&
  //     parsedData?.additionalServicesId
  //   ) {
  //     fetchPrice();
  //   }
  // }, [isLoggedIn]);
  const fetchPrice = useCallback(async () => {
  const existingData = localStorage.getItem("bookingData");
  if (!existingData) return;

  const parsed = JSON.parse(existingData);

  const response = await getBookingPrice({
    serviceId: parsed?.service_id,
    additionalServicesId: parsed?.additionalServicesId,
  });

  if (!response.data?.success) {
    throw new Error("Failed to fetch booking price");
  }

  const rawPrice = response.data.data?.serviceCost;
  if (!rawPrice) {
    throw new Error("Service cost missing");
  }

  const price = Number(String(rawPrice).replace(/,/g, ""));

  if (Number.isNaN(price)) {
    throw new Error("Invalid price format");
  }

  return price;
}, []);
  
  useEffect(() => {
  if (!isLoggedIn) return;

  const existingData = localStorage.getItem("bookingData");
  if (!existingData) return;

  const parsed = JSON.parse(existingData);

  if (parsed?.service_id && parsed?.additionalServicesId) {
    fetchPrice();
  }
}, [isLoggedIn, fetchPrice]);


  return (
    <>
      {/* ✅ GLOBAL LOADER */}
      {loading && <Loader />}

      <div className="login-wrapper">
        <div className="login-card text-center">
          <h1 className="title">Login to your Account</h1>

          {/* Phone */}
          {!showOtp && (
            <div className="form-group phone-verify-group text-start">
              <div className="phone-input-wrapper">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control login-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                />
              </div>

              <button
                className="btn buttons verify-btn"
                onClick={handleVerify}
              >
                Verify
              </button>
            </div>
          )}

          {/* OTP */}
          {showOtp && (
            <>
              <div className="form-group text-start">
                <label className="form-label">Please enter your OTP</label>
                <div className="otp-group">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      className="otp-input"
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, index)
                      }
                      onKeyDown={(e) =>
                        handleOtpKeyDown(e, index)
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                {canResend ? (
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                    onClick={handleVerify}
                  >
                    Resend OTP
                  </span>
                ) : (
                  <span className="text-secondary">
                    Resend OTP in {timer}s
                  </span>
                )}
              </div>

              <button className="btn buttons" onClick={handleLogin}>
                Login
              </button>
            </>
          )}
        </div>
      </div >

      {/* 🔹 Common Message Modal */}
      < CommonMessageModal
        show={showMessageModal}
        title={modalTitle}
        message={modalMessage}
        onClose={async () => {
          setShowMessageModal(false);

          if (!redirectAfterModal) return;

          setRedirectAfterModal(false);

          const existingBookingData = localStorage.getItem("bookingData");
          const existingQuoteData = localStorage.getItem("quoteData");

          try {
            setLoading(true);

            const clientId = localStorage.getItem("client_id");

            let bookingSuccess = false;
            let quoteSuccess = false;

            /* =========================
               BOOKING FLOW
            ========================= */
            if (existingBookingData) {
              const parsedData = JSON.parse(existingBookingData);
              const price = await fetchPrice();

              const payload = {
                service_id: parsedData?.service_id,
                additionalServicesId: parsedData?.additionalServicesId,
                client_id: clientId,
                bookingDate: `${parsedData?.selectedDate}-${parsedData?.currentMonth + 1}-${parsedData?.currentYear}`,
                flatOrHouseNo: parsedData.flatOrHouseNo,
                streetName: parsedData.streetName,
                landMark: parsedData.landMark,
                city: parsedData.city,
                state: parsedData.state,
                postalCode: parsedData.postalCode,
                totalAmount: price,
                is_Incomplete: true,
              };

              const response = await createBookingUsingPrice(payload);

              if (response.data?.success) {
                bookingSuccess = true;
                localStorage.removeItem("bookingData");
              }
            }

            /* =========================
               QUOTE FLOW
            ========================= */
            if (existingQuoteData) {
              const parsedQuote = JSON.parse(existingQuoteData);

              const payload = {
                service_id: parsedQuote.service_id,
                eventType: parsedQuote.eventType,
                startDate: parsedQuote.startDate,
                endDate: parsedQuote.endDate,
                location: parsedQuote.location,
                budget: parsedQuote.budget,
              };

              const response = await postPersonalizedBudget(payload);

              if (response.data?.success) {
                quoteSuccess = true;
                localStorage.removeItem("quoteData");
              }
            }

            /* =========================
               FINAL RESULT HANDLING
            ========================= */

            if (bookingSuccess && quoteSuccess) {
              setModalMessage("Booking and Quote created successfully");
            } else if (bookingSuccess) {
              setModalMessage("Booking created successfully");
            } else if (quoteSuccess) {
              setModalMessage("Quote created successfully");
            }
            // else {
            //   setModalMessage("Something failed. Please try again.");
            // }

            setShowMessageModal(true);
            navigate("/editProfile");

          } catch (error) {
            setModalMessage(
              error.response?.data?.message || "Something went wrong"
            );
            setShowMessageModal(true);
          } finally {
            setLoading(false);
          }


        }}

      />

    </>
  );
};

export default Login;
