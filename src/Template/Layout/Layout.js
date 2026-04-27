// import React, { useState } from 'react';
// import Navbar from './Navbar/Navbar';
// import Sidebar from './Sidebar/Sidebar';
// import { Outlet } from "react-router-dom";

// import './Layout.css';

// const Layout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };
 
//   localStorage.setItem('sidebarOpen', sidebarOpen);
//   return (
//     <div>
//      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//         <div style={{ flex: 1 }}>
//             <Navbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
            
//           </div>
        
//         </div>
//         <Sidebar isOpen={sidebarOpen} toggleSidebarClose={toggleSidebar}/>
//         <div className="content">
//           <Outlet /> 
//         </div>
//     </div>
//   );
// };

// export default Layout;


import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import { Outlet } from "react-router-dom";
import './Layout.css';
import SomethingWentWrongComponent from '../../Pages/SomethingWentWrongComponent/SomethingWentWrongComponent';






const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ⭐ GLOBAL ERROR STATE
  const [pageError, setPageError] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // ⭐ SHOW FULL PAGE ERROR
  if (pageError) {
    return <SomethingWentWrongComponent onRetry={handleRetry} />;
  }

  return (
    <div>
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Navbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebarClose={toggleSidebar}
        closeSidebar={closeSidebar}
      />

      {/* ⭐ PASS ERROR HANDLER TO ALL CHILD PAGES */}
      <div className="content">
        <Outlet context={{ setPageError }} />
      </div>
    </div>
  );
};

export default Layout;

// const Layout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Check screen size on mount and adjust sidebar state
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768 && window.innerWidth < 1200) {
//         // Medium screens (md)
//         setSidebarOpen(true);
//       } else if (window.innerWidth >= 1200) {
//         // Large screens (lg)
//         setSidebarOpen(true);
//       } else {
//         setSidebarOpen(false); // Close sidebar for smaller screens (mobile)
//       }
//     };

//     // Call once on component mount
//     handleResize();

//     // Attach event listener for window resizing
//     window.addEventListener('resize', handleResize);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   // Function to close the sidebar
//   const closeSidebar = () => {
//     if (window.innerWidth < 768) {
//       setSidebarOpen(false);
//     }
//   };
//   localStorage.setItem('sidebarOpen', sidebarOpen);
//   localStorage.setItem('isSidebarOpen', sidebarOpen);
//   return (
//     <div>
//       <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//         <div style={{ flex: 1 }}>
//           <Navbar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
//         </div>
//       </div>
//       <Sidebar isOpen={sidebarOpen} toggleSidebarClose={toggleSidebar} closeSidebar={closeSidebar} />
//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;

