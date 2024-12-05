import React from "react";
import UserItem from "./UserItem";
import LoadingSpinner from "../../components/loading/LoadingSpinner"; // Import LoadingSpinner
import './UserList.css';

const UserList = ({ items, loading }) => {
  if (loading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="center">
        <h2>No users found</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {items.map((user) => (
        <div key={user.id} className="user-card">
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            // email={user.email}
            favoritesCount={user.favoritesCount || 0}
            articles={user.favorites} // Pass favorites count with default value 0
          />
        </div>
      ))}
    </ul>
  );
};

export default UserList;