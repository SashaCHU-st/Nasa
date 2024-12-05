import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserItem.css";  // Use similar CSS styles for UserItem
import image from "../../assets/dog.jpg";  // Default image
import UserCard from "./UserCard";

const UserItem = ({ id, name, email, favoritesCount }) => {
  const navigate = useNavigate();

  const handleViewArticles = () => {
    // Navigate to a page showing favorite articles for the user, passing the userId through state
    navigate('/shared-favorites', { state: { userId: id } });
  };

  return (
    <li className="user-item">
      <UserCard className="user-item__content">
        <img src={image} alt={name} className="user-item__image" />
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
