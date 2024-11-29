import React from "react";
import UserItem from './UserItem';

const UserList = ({ items }) => {
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
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          favoritesCount={user.favoritesCount || 0} // Pass favorites count with default value 0
        />
      ))}
    </ul>
  );
};

export default UserList;