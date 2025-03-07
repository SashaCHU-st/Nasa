// import React from "react";
// import "./LoadingSpinner.css"; 

// interface LoadingSpinnerProps {
//   asOverlay?: boolean;
// }

// const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ asOverlay }) => {
//   return (
//     <div className={`${asOverlay ? "spinner-overlay" : "spinner"}`}>
//       <div className="lds-dual-ring">
//       ‼️Note: It may take some time for the database to connect (1-2 minutes). 
//       Please wait a moment and refresh the page. ⏳
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;
import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  asOverlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ asOverlay }) => {
  return (
    <div className="spinner-overlay">
      <p className="loading-message">
        ‼️ Note: It may take some time for the database to connect (1-2 minutes).  
        Please wait a moment and refresh the page. ⏳
      </p>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;


