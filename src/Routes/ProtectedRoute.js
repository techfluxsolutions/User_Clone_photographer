import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn === "true"
    ? children
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;


// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const location = useLocation();
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   // 🔓 PUBLIC ALL SERVICES (DEV ONLY)
//   if (location.pathname.startsWith("/service/")) {
//     return children;
//   }

//   return isLoggedIn ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;



