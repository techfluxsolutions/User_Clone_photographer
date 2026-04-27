// import './BookingSuccess.css';

// const BookingSuccess = () => {
//     return (
//         <div className="booking-success-container">
//             <div className="booking-success-content">
//                 <h1 className="success-title">
//                     Yayy ! It’s Done 
//                     <img src="/asset/BookingDone/yayy.png" alt="Party Hat" className="success-icon" />
//                 </h1>
                
//                 <div className="success-image-container">
//                     <img src="/asset/BookingDone/tick.png" alt="Success Tick" className="success-tick" />
//                 </div>

//                 <p className="success-message">Be ready to get behind the lens!!</p>
//             </div>
//         </div>
//     );
// };

// export default BookingSuccess;



import './BookingSuccess.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavigationButtons from "../../../Template/NavigationButtons/NavigationButtons";

const BookingSuccess = () => {
    const navigate = useNavigate();

    const handleGoProfile = () => {
        navigate("/myProfile", { replace: true });
    };

    useEffect(() => {
        // Push a dummy state so back button triggers popstate
        window.history.pushState(null, "", window.location.href);

        const handleBackButton = () => {
            navigate("/myProfile", { replace: true });
        };

        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, [navigate]);

    return (
        <div className="booking-success-container" style={{ position: 'relative' }}>
            <NavigationButtons onBack={() => navigate("/myProfile", { replace: true })} />
            <div className="booking-success-content">
                <h1 className="success-title">
                    Yayy ! It’s Done 
                    <img
                        src="/asset/BookingDone/yayy.png"
                        alt="Party Hat"
                        className="success-icon"
                    />
                </h1>

                <div className="success-image-container">
                    <img
                        src="/asset/BookingDone/tick.png"
                        alt="Success Tick"
                        className="success-tick"
                    />
                </div>

                <p className="success-message">
                    Be ready to get behind the lens!!
                </p>

                <button className="go-profile-btn" onClick={handleGoProfile}>
                    Go to Profile
                </button>
            </div>
        </div>
    );
};

export default BookingSuccess;