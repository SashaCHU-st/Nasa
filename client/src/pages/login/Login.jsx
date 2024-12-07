///Page for login/signup users
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import Input from "../../components/input/Input";
import "./Login.css";
import ErrorModel from "../../components/error_component/ErrorModal";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL;
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(// custom one for following validity on each step
  // and hadle differrnt actions such change_input and set_form
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false // form is invalid from the begining
  ); //// = state

  const switchModeHandler = () => {
    if (!isLoginMode) {// if it is registartion
      // set to LOGIN mode
      setFormData(
        {
          ...formState.inputs, // save current fields
          name: undefined, // Remove the name field in LOGIN mode
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid // and check if it is field are valid
      );
    } else {
      ///set to SignUP mode
      setFormData(
        {
          ...formState.inputs, // save current fields
          name: {
            value: "",
            isValid: false, // Add the name field in SIGNUP mode, at the begining invalid
          },
        },
        false // Reset form validity
      );
    }
    setIsLoginMode((prevMode) => !prevMode);//changing mode
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isLoginMode) {
      // when logged mode
      try {
        setError(null);
        const response = await fetch(`${url}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.userId); // needed for future add fav
        setIsLoading(false);
        auth.login(responseData.userId, responseData.token); // loggin users with token and userid that goten url
        navigate("/search"); // when logged in move to search
      } catch (err) {
        setError(err.message || "Something went wrong");
        setIsLoading(false);
      }
    } else {
      //When signup
      try {
        const response = await fetch(`${url}/api/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.userId);
        auth.login(responseData.userId, responseData.token); // loggin users with token and userid that goten url, neede for latwr add to favorite/delte/update
        navigate("/search"); // sending to search page
      } catch (err) {
        setError(err.message || "Something went wrong");
        setIsLoading(false);
      }
    }
  };

  const errorHandler = () => {
    setError(null);// when parent will close it will set error to null
  };

  return (
    <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="login">
        <div className="formWr">
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
            )}
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid password, at least 5 characters."
              onInput={inputHandler}
            />
            <button type="submit" disabled={!formState.isValid}> {/*disables while !formState.isValid*, when bacsame valid it 
            it will switch to active*/}
              {/*if form is !isVAlid then the buttton is disabled */}
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </button>
            <button type="button" onClick={switchModeHandler}>
              SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
