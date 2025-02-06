
import React from 'react';
import './UserCard.css';

interface UserCardProps
{
  className?:string;
  style?:React.CSSProperties;
  children?:React.ReactNode;
}

const UserCard:React.FC<UserCardProps> = props => {
  return (
    <div className={`cardUser ${props.className}`} style={props.style}>
      {props.children} {/*include ALL components that comes from paerent*/}
    </div>
  );
};

export default UserCard;
