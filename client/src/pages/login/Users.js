// import { useEffect } from 'react';
// import { useEffect } from 'react';
import React, { useEffect, useState } from "react";
import ErrorModal from "../../components/error_component/ErrorModal";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import UsersList from "../components/UsersList";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    // useEffect doe snot tretrun a promise, so no async or awit need
    const sendReq = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://nasa-57eq.onrender.com/api/users");

        const responseData = await response.json();
        if (!response.ok) throw new Error(responseData.users);
        setLoadedUsers(responseData.users);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };
    sendReq();
  }, []);
  const errorHandler = () =>
  {
    setError(null)
  }
  return <React.Fragment> 
        <ErrorModal error ={error} onClear={errorHandler}></ErrorModal>
        {isLoading && 
        <div className="center">
            <LoadingSpinner/>
        </div>
        }
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
};

export default Users;
