import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserItem.css";
import image from "../../assets/dog.jpg";
import UserCard from "./UserCard";

interface UserItemProps {
  id: string;
  name: string;
  // email:string;
  favoritesCount: number;
  articles: string[];
}

const UserItem: React.FC<UserItemProps> = ({ id, name, favoritesCount }) => {
  const navigate = useNavigate();
  const handleViewArticles = () => {
    navigate("/shared-favorites", { state: { userId: id } }); // passing userId to check favorites for users
  };

  return (
    <UserCard className="user-item__content">
      <img src={image} alt={name} className="user-item__image" />{" "}
      {/*default image for now for everyone*/}
      <div>
        <h2>{name}</h2>
        {/* <p>{email}</p> */}
        <p>Favorites: {favoritesCount}</p>
        <button onClick={handleViewArticles}>View Favorite Articles</button>
      </div>
    </UserCard>
  );
};

export default UserItem;
