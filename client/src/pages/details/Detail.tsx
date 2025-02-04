
import React from "react";
import { useLocation } from "react-router-dom";
import "./Detail.css";
import defaultImage from "../../assets/home1.jpg"; 

const Detail = () => {
  // useLocation is used to access the state passed from Favorites component
  const { state } = useLocation();// e.g /details
  const { title, description, image, links } = state || {}; // Extract all possible properties

  // Determine the image source:
  const imageSrc =
    image ||
    (links && links[0]?.href) || // Fallback to links[0].href if available
    defaultImage;

  return (
    <div className="detailWr">
      <div className="desc">
        <h1>{title || "No title available"}</h1>
        
        {/* Display image source */}
        <img
          src={imageSrc}
          alt={title || "No title available"} // Fallback alt text
          // width="400" // Set width as needed
        />
        
        <h4>Description</h4>
        {description ? <p>{description}</p> : <p>No description available</p>}
      </div>
    </div>
  );
};

export default Detail;
