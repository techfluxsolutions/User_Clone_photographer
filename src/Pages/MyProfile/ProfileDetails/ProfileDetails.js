// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProfileDetails.css";
// import { GetProfile } from "../../../utils/APIs/myProfileApis";
// import Loader from "../../../Template/Loader/Loader"; // ✅ loader

// const ProfileDetails = () => {
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(false); // ✅ loader state

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true); // ✅ start loader
//       const response = await GetProfile();

//       if (response?.data?.success) {
//         setProfile(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     } finally {
//       setLoading(false); // ✅ stop loader
//     }
//   };

//   return (
//     <>
//       {/* ✅ Loader */}
//       {loading && <Loader />}

//       <div className="profile-wrapper">
//         <div className="container">
//           <h1 className="title profile-title mb-3">My Profile</h1>
//           <p className="profile-subtitle">Edit your personal information</p>

//           <div className="profile-card d-flex align-items-center justify-content-between flex-wrap">

//             <div className="d-flex align-items-center gap-4">
//               <img
//                 src={profile?.avtar || "./asset/Profile-page/Profileimage.png"}
//                 alt="Profile"
//                 className="profile-image"
//               />

//               <h2 className="profile-greeting">
//                 Hello {profile?.mobileNumber || "User"},
//               </h2>
//             </div>

//             <button
//               className="btn buttons edit-profile-btn"
//               onClick={() => navigate("/editProfile")}
//             >
//               Edit Profile
//               <img src="/editIcon.png" alt="Edit" className="edit-icon" />
//             </button>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfileDetails;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileDetails.css";
import { GetProfile } from "../../../utils/APIs/myProfileApis";
import Loader from "../../../Template/Loader/Loader";
import LogoutModal from "../../../Template/Layout/LogoutModal/LogoutModal";

const ProfileDetails = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
     localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await GetProfile();

      if (response?.data?.success) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Name-based greeting ONLY
  // const greetingText = profile?.name?.trim()
  //   ? `Hello ${profile.name}`
  //   : "Hey There !";

  return (
    <>
      {loading && <Loader />}

      <div className="profile-wrapper">
        <div className="container">
          <h1 className="title profile-title mb-3">My Profile</h1>
          <p className="profile-subtitle">Edit your personal information</p>

          <div className="profile-card d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center gap-4">
              {/* <img
                src={profile?.avtar}
                alt="Profile"
                className="profile-image"
              /> */}

              <img
                src={profile?.avtar || "./asset/Profile-page/NoProfile.png"}
                alt="Profile"
                className="profile-image"
                onError={(e) => {
                  e.target.src = "./asset/Profile-page/NoProfile.png";
                }}
              />


              <h2 className="profile-greeting">
                {profile?.username?.trim()
                  ? profile.username
                  : "Add your name"}
              </h2>
            </div>

            <div className="profile-actions">
              <button
                className="btn buttons edit-profile-btn"
                onClick={() => navigate("/editProfile")}
              >
                Edit Profile
                <img src="/editIcon.png" alt="Edit" className="edit-icon" />
              </button>

              <button
                className="btn buttons logout-profile-btn"
                onClick={() => setShowLogoutModal(true)}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          handleLogout();
        }}
      />
    </>
  );
};

export default ProfileDetails;
