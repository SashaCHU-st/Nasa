import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserItem.css"; 
import image from "../../assets/dog.jpg"; 
import UserCard from "./UserCard";

const UserItem = ({ id, name, email, favoritesCount }) => {
  const navigate = useNavigate();
  const handleViewArticles = () => {
    navigate('/shared-favorites', { state: { userId: id } });// passing userId to check favorites for users
  };

  return (
    <li className="user-item">
      <UserCard className="user-item__content">
        <img src={image} alt={name} className="user-item__image" /> {/*default image for now for everyone*/}
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
          <p>Favorites: {favoritesCount}</p>
          <button onClick={handleViewArticles}>View Favorite Articles</button>
        </div>
      </UserCard>
    </li>
  );
};

export default UserItem;
