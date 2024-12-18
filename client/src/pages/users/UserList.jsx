import React from "react";
import UserItem from "./UserItem";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import './UserList.css';

const UserList = ({ items, loading }) => {

  return (
    <ul className="users-list">
      {items.length === 0 &&  <h2 className="center">No users found</h2>}
      {loading && <LoadingSpinner asOverlay />}
      {items.map((user) => (
        <div key={user.id} className="user-card">
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            favoritesCount={user.favoritesCount || 0}// fav counts or defalut 0
            articles={user.favorites} 
          />
        </div>
      ))}
    </ul>
  );
};

export default UserList;