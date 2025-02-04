import React, { useState, useEffect } from "react";
import UserList from "../users/UserList";
import ErrorModal from "../../components/error_component/ErrorModal";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = process.env.REACT_APP_BACKEND_URL;

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${url}/api/users/`); // just fetch for only getting users
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err: unknown) {
        // unkknown will handle error types from Axios, JS, unknown
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An  unknown error occured");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means it runs once

  return (
    <div>
      {error && <ErrorModal error={error} onClear={() => setError("")} />}
      <h1 className="h2">User List</h1>
      <UserList items={users} loading={loading} />
    </div>
  );
};

export default Users;
