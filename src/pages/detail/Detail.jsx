import React from 'react';
import { useLocation } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const { state } = useLocation();
  const { title, description, links } = state || {};
  console.log("STATE", state);
  return (
    <div>
      <div className='title'>
        <h1>{title || 'No title available'}</h1>
      </div>
      <div>
        <h4>Image</h4>
        <img src={links && links[0] && links[0].href} alt="pic" />
      </div>
      <div className='desc'>
        <h4>Description</h4>
        <p>{description || 'No description available'}</p>
      </div>
    </div>
  );
};

export default Detail;
