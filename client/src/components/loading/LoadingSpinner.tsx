import React from "react";
import "./LoadingSpinner.css"; 

interface LoadingSpinnerProps {
  asOverlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay ? "spinner-overlay" : "spinner"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
