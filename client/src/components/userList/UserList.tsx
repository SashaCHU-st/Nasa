import React from "react";
import UserItem from "../userCardItem/UserItem";
import LoadingSpinner from "../loading/LoadingSpinner";
import "./UserList.css";

interface User {
  id: string;
  name: string;
  favoritesCount: number;
  email: string;
  favorites: string[];
  // articles: string[];
}

interface UserListProps {
  items: User[];
  loading: boolean;
}

const UserList: React.FC<UserListProps> = ({ items, loading }) => {
  return (
    <div className="user-list">
      {items.length === 0 && <h2 className="center">No users found</h2>}
      {loading && <LoadingSpinner asOverlay />}
      <div className="user-items-container">
        {items.map((user) => (
          <div key={user.id} className="user-item">
            <UserItem
              id={user.id}
              name={user.name}
              favoritesCount={user.favoritesCount || 0}
              articles={user.favorites}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
