///Page that will just diaplaying All users and how many likes they have
import React, { useEffect, useState } from "react";
import UserList from '../users/UserList'
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import './Home.css'

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://nasa-79xl.onrender.com/api/users/`);
        //const response = await fetch("http://localhost:5000/api/users/");
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

  if (users.length === 0) {
    return (
      <div className="center">
        <h2>No users found</h2>
      </div>
    );
  }
  return (

    <div>
      <h1 className="h2">User List</h1>
      {loading && <LoadingSpinner asOverlay />}
        <UserList items={users}/>
    </div>
  );
};

export default Home;
