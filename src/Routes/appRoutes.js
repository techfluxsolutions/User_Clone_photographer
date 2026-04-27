// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import "./../App.css";
// import ScrollToTop from "./../utils/scrollToTop/ScrollToTop";
// import InternetChecker from "./../utils/InternetChecker/InternetChecker";
// import { useEffect, useState } from "react";

// import Navbar from "../Template/Layout/Navbar/Navbar";

// import SignUp from "../AuthModule/SignUp/SignUp";
// import VerifyOTP from "../AuthModule/VerifyOTP/VerifyOTP";
// import Login from "../AuthModule/Login/Login";
// import LandingPage from "../Pages/LandingPage/LandingPage";
// import PersonalizedQuotePage from "../Pages/PersonalizedQuotePage/PersonalizedQuotePage";
// import PersonalizedBudgetPage from "../Pages/PersonalizedBudgetPage/PersonalizedBudgetPage";
// import MyProfile from "../Pages/MyProfile/MyProfile";
// import AllBookings from "../Pages/MyProfile/BookingTabs/AllBookings/AllBookings";
// import EditProfile from "../Pages/MyProfile/ProfileDetails/EditProfile/EditProfile";
// import RaiseQuery from "../Pages/MyProfile/BookingTabs/AllBookings/RaiseQuery/RaiseQuery";
// import RatingsAndFeedback from "../Pages/MyProfile/BookingTabs/AllBookings/RatingsAndFeedback/RatingsAndFeedback";

// /* ================================
//    Layout Component
// ================================ */
// const Layout = ({ children }) => {
//   const location = useLocation();

//   // Routes where Navbar should be hidden
//   const hideLayoutRoutes = [
//     "/login",
//     "/sign-up",
//     "/verify-otp",
//   ];

//   const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

//   return (
//     <>
//       {!shouldHideLayout && <Navbar />}
//       {children}
//     </>
//   );
// };

// /* ================================
//    App Routes
// ================================ */
// const AppRoutes = () => {
//   const [isOffline, setIsOffline] = useState(false);

//   /* Internet checker */
//   useEffect(() => {
//     const handleOffline = () => setIsOffline(true);
//     const handleOnline = () => setIsOffline(false);

//     window.addEventListener("offline", handleOffline);
//     window.addEventListener("online", handleOnline);

//     return () => {
//       window.removeEventListener("offline", handleOffline);
//       window.removeEventListener("online", handleOnline);
//     };
//   }, []);

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <ScrollToTop />

//         {isOffline && <InternetChecker />}

//         <Layout>
//           <Routes>

//             {/* Auth Routes (NO Navbar) */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/sign-up" element={<SignUp />} />
//             <Route path="/verify-otp" element={<VerifyOTP />} />

//             {/* Public / Normal Pages */}
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/personalizedQuotePage" element={<PersonalizedQuotePage />} />
//             <Route path="/personalizedBudgetPage" element={<PersonalizedBudgetPage />} />
//             <Route path="/myProfile" element={<MyProfile />} />
//             <Route path="/bookingDetails" element={<AllBookings />} />
//             <Route path="/editProfile" element={<EditProfile />} />
//             <Route path="/raiseQuery" element={<RaiseQuery />} />
//             <Route path="/ratingsAndFeedback" element={<RatingsAndFeedback />} />


//           </Routes>
//         </Layout>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default AppRoutes;



import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./../App.css";
import InternetChecker from "./../utils/InternetChecker/InternetChecker";
import ScrollToTop from "./../utils/scrollToTop/ScrollToTop";
import Navbar from "../Template/Layout/Navbar/Navbar";
import ProtectedRoute from "./ProtectedRoute";
/* Auth */
import Login from "../AuthModule/Login/Login";
import SignUp from "../AuthModule/SignUp/SignUp";
import VerifyOTP from "../AuthModule/VerifyOTP/VerifyOTP";

/* Pages */
import LandingPage from "../Pages/LandingPage/LandingPage";
import AllBookings from "../Pages/MyProfile/BookingTabs/AllBookings/AllBookings";
import RaiseQuery from "../Pages/MyProfile/BookingTabs/AllBookings/RaiseQuery/RaiseQuery";
import RatingsAndFeedback from "../Pages/MyProfile/BookingTabs/AllBookings/RatingsAndFeedback/RatingsAndFeedback";
import MyProfile from "../Pages/MyProfile/MyProfile";
import EditProfile from "../Pages/MyProfile/ProfileDetails/EditProfile/EditProfile";
import PersonalizedBudgetPage from "../Pages/PersonalizedBudgetPage/PersonalizedBudgetPage";
import PersonalizedQuotePage from "../Pages/PersonalizedQuotePage/PersonalizedQuotePage";
import BookingSuccess from "../Pages/ServiceBooking/BookingSuccess/BookingSuccess";
import FullPayment from "../Pages/ServiceBooking/FullPayment/FullPayment";
import PartialPayment from "../Pages/ServiceBooking/PartialPayment/PartialPayment";
import PaymentDetails from "../Pages/ServiceBooking/PaymentDetails/PaymentDetails";
import Fashion from "../Pages/ServicesPages/Fashion/Fashion";
import Footer from "../Template/Layout/Footer/Footer";
import CalenderBookingPage from "../Pages/ServiceBooking/CalenderBookingPage/CalenderBookingPage";
import Chats from "../Pages/MyProfile/BookingTabs/AllBookings/Chats/Chats";
import ModifyBooking from "../Pages/MyProfile/BookingTabs/AllBookings/ModifyBooking/ModifyBooking";
import ServiceRouter from "./ServiceRouter";
import ExploreServices from "../Pages/ServicesPages/ExploreServices/ExploreServices";
import HourlyStandard from "../Pages/ServicesPages/HourlyStandard/HourlyStandard";
import HourlyPremium from "../Pages/ServicesPages/HourlyPremium/HourlyPremium";
import EditingPage from "../Pages/EditingPage/EditingPage";

/* Static Pages */
import AboutUs from "../Pages/StaticPages/AboutUs/AboutUs";
import PrivacyPolicy from "../Pages/StaticPages/PrivacyPolicy/PrivacyPolicy";
import JoinUs from "../Pages/StaticPages/JoinUs/JoinUs";
import ContactUs from "../Pages/StaticPages/ContactUs/ContactUs";
import GalleryPage from "../Pages/GalleryPage/GalleryPage";
import ViewCart from "../Pages/MyProfile/BookingTabs/AllBookings/ViewCart/ViewCart";
import CancellationPolicy from "../Pages/StaticPages/CancellationPolicy/CancellationPolicy";
import TermsAndConditions from "../Pages/StaticPages/TermsAndCondition/Terms&Condition";
import SalesAndRefund from "../Pages/StaticPages/SalesAndRefund/SalesAndRefund";
import Gallery from "../Pages/MyProfile/BookingTabs/AllBookings/Gallery/Gallery";
import HourlyStandardQuoteForm from "../Pages/ServicesPages/HourlyStandard/HourlyStandardQuoteForm/HourlyStandardQuoteForm";
import HourlyPremiumQuoteForm from "../Pages/ServicesPages/HourlyPremium/HourlyPremiumQuoteForm/HourlyPremiumQuoteForm";
import EditingQuoteForm from "../Pages/EditingPage/EditingQuoteForm/EditingQuoteForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ================================
   Layout Component
================================ */
const Layout = ({ children }) => {
  const location = useLocation();

  const hideLayoutRoutes = [
    "/login",
    "/sign-up",
    "/verify-otp",
  ];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Footer */}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

/* ================================
   App Routes
================================ */
const AppRoutes = () => {
  const [isOffline, setIsOffline] = useState(false);

  /* Internet checker */
  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        {isOffline && <InternetChecker />}

        <Layout>
          <Routes>

            {/* ================= AUTH ROUTES ================= */}
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />

            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/personalizedQuotePage" element={<PersonalizedQuotePage />} />
            <Route path="/personalizedBudgetPage" element={<PersonalizedBudgetPage />} />
            <Route path="/hourly-standard" element={<HourlyStandard />} />
            <Route path="/hourly-premium" element={<HourlyPremium />} />
            <Route path="/editing" element={<EditingPage />} />
            <Route path="/hourly-standard-quote" element={<HourlyStandardQuoteForm />} />
            <Route path="/hourly-premium-quote" element={<HourlyPremiumQuoteForm />} />
            <Route path="/editing-quote" element={<EditingQuoteForm />} />
            <Route path="/view-cart" element={<ViewCart />} />

            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/sales-and-refund" element={<SalesAndRefund />} />
            {/* /cancellation-policy */}
            <Route path="/gallery" element={<GalleryPage />} />
             <Route path="/gallery-booking" element={<Gallery />} />

            {/* ================= PROTECTED ROUTES ================= */}
            <Route
              path="/myProfile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />

            {/* <Route
                path="/bookingDetails"
              element={
                <ProtectedRoute>
                  <AllBookings />
                </ProtectedRoute>
              }
            /> */}

            <Route
              path="/bookingDetails/:bookingId"
              element={
                <ProtectedRoute>
                  <AllBookings />
                </ProtectedRoute>
              }
            />


            {/* <Route
            path="/bookingDetails/:bookingId"
            element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            }
          /> */}

            <Route
              path="/bookingChat/:bookingId"
              element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              }
            />


            <Route
              path="/chat/:quoteId"
              element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editProfile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/raiseQuery"
              element={
                <ProtectedRoute>
                  <RaiseQuery />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ratingsAndFeedback"
              element={
                <ProtectedRoute>
                  <RatingsAndFeedback />
                </ProtectedRoute>
              }
            />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/partial-payment" element={<PartialPayment />} />
            <Route path="/full-payment" element={<FullPayment />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/service/:serviceId" element={<ServiceRouter />} />
            <Route path="/explore-services" element={<ExploreServices />} />



            {/* for service booking id wise */}
            <Route path="/calenderBooking" element={<CalenderBookingPage />} />
            <Route path="/modifyBooking" element={<ModifyBooking />} />


          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
