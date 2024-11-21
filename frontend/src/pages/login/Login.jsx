// import React from "react";
// import "./Login.css";
// import {
//   VALIDATOR_EMAIL,
//   VALIDATOR_MINLENGTH,
//   VALIDATOR_REQUIRE,
// } from "../../util/validators";
// import { useForm } from "../../hooks/form-hook";
// import { useState } from "react";

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formState, inputHandler, setFormData] = useForm(
//     {
//       email: {
//         value: "",
//         isValid: false,
//       },
//       password: {
//         value: "",
//         isValid: false,
//       },
//     },
//     false
//   );

//   const AuthSubmitHandler = (event) => {
//     event.preventDefault();
//     console.log(formState.inputs);
//   };

//   const switchMode = () => {
//     if(!isLogin )
//     {
//       setFormData({
//         ...formState.inputs,
//         name: undefined
//       },formState.inputs.email.isValid && formState.inputs.password.isValid)
//     }
//     else
//     {
//       setFormData({
//         ...formState.input,
//         name:{
//           value:'',
//           isValid:false
//         }
//       }, false)
//     }
//     setIsLogin((prevMode) => !prevMode);
//   };
//   return (
//     <div className="login">
//       <div className="formWr">
//         <form onSubmit="">
//           {!isLogin && (
//             <input
//               element="input"
//               id="name"
//               type="text"
//               label="name"
//               validators={[VALIDATOR_REQUIRE]}
//               errorText = "Please enter the name"
//               onInput={inputHandler}
//             ></input>
//           )}
//           <div className="inputWr">
//             <label htmlFor="name">Login form</label>
//             <input
//               className="window"
//               id="email"
//               type="email"
//               label="E-mail"
//               validators={[VALIDATOR_EMAIL()]}
//               errorText="Please enter a valid email."
//               onInput={inputHandler}
//             />
//             <input
//               className="window"
//               id="password"
//               type="password"
//               label="Password"
//               validators={[VALIDATOR_MINLENGTH(5)]}
//               errorText="Please enter password."
//               onInput={inputHandler}
//             />
//           </div>
//           <button type="submit">{isLogin ? "Login" : "SignUp"}</button>
//           <button type="submit" inverse onClick={switchMode}>
//             Switch to {isLogin ? "SignUp" : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';
import { useForm } from '../../hooks/form-hook';
import Input from '../../components/input/Input'; // Assuming Input component exists
import './Login.css';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined, // Remove the name field in LOGIN mode
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false, // Add the name field in SIGNUP mode, initially invalid
          },
        },
        false // Reset form validity
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Log form data
  };

  return (
    <div className="login">
      <div className='formWr'>
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
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </button>
        <button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </button>
      </form>
      </div>
    </div>
  );
};

export default Auth;
