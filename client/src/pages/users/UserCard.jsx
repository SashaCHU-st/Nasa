import React from 'react';

import './UserCard.css';

const UserCard = props => {
  return (
    <div className={`cardUser ${props.className}`} style={props.style}>
      {props.children} {/*include ALL components that comes from paerent*/}
    </div>
  );
};

export default UserCard;
