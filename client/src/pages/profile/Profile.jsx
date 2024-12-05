import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Input from "../../components/input/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../util/validators';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import ErrorModal from '../../components/error_component/ErrorModal';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({ name: '', password: '' });
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get(`${url}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData({ name: response.data.user.name, password: '' });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once

  const inputHandler = useCallback((id, value, isValid) => {
    setUserData((prevData) => ({
      ...prevData,
      [id]: value
    }));
    setFormIsValid(isValid);
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      await axios.patch(`${url}/api/users/me`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // setSuccess('Updated');
      alert('Updated')
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
      setSuccess(null);
    }
  };

  if (loading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {loading && <LoadingSpinner asOverlay />}

      <div className="profile">
        <div className="formWr">
          <form onSubmit={handleSubmit}>
            <h2>Update Profile</h2>
            {success && <h2 >{success}</h2>}
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name."
              onInput={inputHandler}
              value={userData.name}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid password, at least 5 characters."
              onInput={inputHandler}
              value={userData.password}
            />
            <button type="submit" disabled={!formIsValid}>
              Update
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;