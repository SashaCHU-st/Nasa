import React, { useState, useEffect } from 'react';
import UserList from '../users/UserList';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://nasa-79xl.onrender.com/api/users/`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means it runs once when the component mounts

  if (error) {
    return (
      <div className="center">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h2">User List</h1>
      <UserList items={users} loading={loading} />
    </div>
  );
};

export default Home;