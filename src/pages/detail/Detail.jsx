import React from 'react';
import { useLocation } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const { state } = useLocation();
  const { title, description, links } = state || {};
  console.log("STATE", state);
  return (
    <div className='detailWr'>
      <div className='desc'>
      <h1>{title || 'No title available'}</h1>
        <img src={links && links[0] && links[0].href} alt="pic" />
        <h4>Description</h4>
        {description ? (
          <p>{description}</p>
        ) : (
          <p>No description available</p>
        )}
      </div>
    </div>
  );
};

export default Detail;
