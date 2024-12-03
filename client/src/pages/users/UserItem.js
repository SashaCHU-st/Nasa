import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserItem.css";
import image from "../../assets/dog.jpg"; // Default image
import UserCard from "./UserCard";

const UserItem = ({ id, name, email, favoritesCount, articles }) => {
  const navigate = useNavigate();

  const handleViewArticles = () => {
    navigate(`/user/${id}/favorites`, { state: { articles } }); // Pass articles via state
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
