import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Input from "../../components/input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import ErrorModal from "../../components/error_component/ErrorModal";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({ name: "", password: "" }); // init name, pass
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formValidity, setFormValidity] = useState({
    name: false,
    password: false,
  });
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData({ name: response.data.user.name, password: "" });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      // memorize function , that do not recreate it again, if dependecies
      //have not changed
      setUserData((state) => ({
        ...state,
        [id]: value,
      }));
      setFormIsValid(isValid);
    },
    []
  ); // when it is empty then never will be reacreted

  const errorHandler = () => {
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${url}/api/users/me`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Updated");
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError("Failed to update profile");
      setSuccess("");
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {loading && <LoadingSpinner asOverlay />}

      <div className="profile">
        <div className="formWr">
          <form onSubmit={handleSubmit}>
            <h2>Update Profile</h2>
            {success && <h2>{success}</h2>}
            <Input
              // element="input"
              id="name"
              data-testid = "nameUpdate"
              type="text"
              label="Name (max 28 characters)"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(28)]}
              errorText="Please enter a name, not more then 28 characters"
              onInput={inputHandler}
              value={userData.name}
              valid={formValidity.name}
            />
            <Input
              // element="input"
              id="password"
              type="password"
              label="Password (max 30 characters)"
              validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(30)]}
              errorText="Please enter a valid password, at least 5 characters."
              onInput={inputHandler}
              value={userData.password}
              valid={formValidity.password}
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
