import React from "react";
import "./UserItem.css";
import image from "../../assets/dog.jpg"; // Default image
import UserCard from "./UserCard";
const UserItem = ({ id, name, email, favoritesCount }) => {
  return (
    <li className="user-item">
      <UserCard className="user-item__content">
        <img src={image} alt={name} className="user-item__image" />
        <div>
        <h2>{name}</h2>
        <p>{email}</p>
        <p>Favorites: {favoritesCount}</p> {/* Display the count of favorites */}
      </div>
      </UserCard>
    </li>
  );
};

export default UserItem;
