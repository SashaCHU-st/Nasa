import React from 'react';

import './UserCard.css';

const UserCard = props => {
  return (
    <div className={`cardUser ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default UserCard;
