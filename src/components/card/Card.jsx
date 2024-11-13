import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ data = [] }) => {
  const navigate = useNavigate();

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
        {/* HEADER */}
          {item.data && item.data[0] && item.data[0].title ? (
            <h3>{item.data[0].title}</h3>
          ) : (
            <h3>Title not available</h3>
          )}

          {/* PICTURE*/}
          {item.links && item.links[0] && item.links[0].href ? (
            <img
              src={item.links[0].href}
              alt={item.data[0]?.title || 'Image'}
              width="200"
            />
          ) : (
            <p>No image available</p>
          )}

          <button onClick={() => navigate("/detail",{ state: { title: item.data[0]?.title, links: item.links  ,description: item.data[0]?.description}})}>
            More Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default Card;

