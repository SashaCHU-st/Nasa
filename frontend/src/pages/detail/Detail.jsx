import React from 'react';
import { useLocation } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  // useLocation используется для того чтобы узнать инфо содержащая в текущем URL
  const { state } = useLocation();
  const { title, description, links } = state || {}; // то что передали
  console.log("STATE", state);// проверка что нам выдает для обьекта
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
