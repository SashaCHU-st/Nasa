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
    <ul className="users-list">
      {items.length === 0 && <h2 className="center">No users found</h2>}
      {loading && <LoadingSpinner asOverlay />}
      {items.map((user) => (
        <div key={user.id} className="user-card">
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            // email={user.email}
            favoritesCount={user.favoritesCount || 0} // fav counts or defalut 0
            articles={user.favorites}
          />
        </div>
      ))}
    </ul>
  );
};

export default UserList;
