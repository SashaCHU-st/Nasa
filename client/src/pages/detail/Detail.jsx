import React from "react";
import { useLocation } from "react-router-dom";
import "./Detail.css";
import image from "../../assets/home1.jpg";

const Detail = () => {
  // useLocation используется для того, чтобы узнать информацию, содержащуюся в текущем URL
  const { state } = useLocation();
  const { title, description, links } = state || {}; // Извлекаем переданные данные котрые идут с api

  return (
    <div className="detailWr">
      <div className="desc">
        <h1>{title || "No title available"}</h1>
        <img
          src={(links && links[0] && links[0].href) || image}
          alt="pic"
        />
        <h4>Description</h4>
        {description ? <p>{description}</p> : <p>No description available</p>}
      </div>
    </div>
  );
};

export default Detail;
