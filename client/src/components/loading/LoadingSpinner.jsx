import React from "react";
import "./LoadingSpinner.css"; 

const LoadingSpinner = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay ? "spinner-overlay" : "spinner"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
