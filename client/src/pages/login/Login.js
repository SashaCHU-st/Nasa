///Page for login/signup users
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import Input from "../../components/input/Input";
import "./Login.css";
import ErrorModel from '../../components/error_component/ErrorModal';
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  // const location = useLocation();

  // Сохранённый маршрут или путь по умолчанию "/"
  // const from = location.state?.from?.pathname || "/";

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,// сохраняем текузие поля 
          name: undefined, // Remove the name field in LOGIN mode
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,// сохраняем текузие поля 
          name: {
            value: "",
            isValid: false, // Add the name field in SIGNUP mode, initially invalid
          },
        },
        false // Reset form validity
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isLoginMode) {
      // Handle login
      try {
        setError(null);
        const response = await fetch("http://localhost:5000/api/users/login", {
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
      //  console.log("Login response:", responseData);
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.userId); // Assuming the user ID is returned in the response
        
        // Retrieve the values to confirm they're stored correctly
        localStorage.getItem('token');
        localStorage.getItem('userId');
        setIsLoading(false);
        auth.login(responseData.userId, responseData.token); // Логиним пользователя
        navigate("/search"); // Перенаправляем на исходный маршрут
      } catch (err) {
        setError(err.message || "Something went wrong, please try again.");
        setIsLoading(false);
      }
    } else {
      // Handle signup
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name?.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        localStorage.getItem('token');
        localStorage.getItem('userId'); // Assuming the user ID is returned in the response
        // console.log("tokenS:", haha); // This will log the stored token
        // console.log("userIdS:", hihi); // This will log the stored userId
        auth.login(responseData.userId, responseData.token); // Логиним пользователя
        navigate("/search"); // Перенаправляем на исходный маршрут
      } catch (err) {
        setError(err.message || "Something went wrong, please try again.");
        setIsLoading(false);
      }
    }
  };

  const errorHandler = () => {
    setError(null);
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
            <button type="submit" disabled={!formState.isValid}>
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
