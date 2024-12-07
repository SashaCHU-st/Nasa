import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");// if getItem will return null=> means that user never logged in
  const [isLoggedIn, setIsLoggedIn] = useState(storedUserLoggedInInfo === "true");// checking if storedUserLoggedInInfo equal === true, if not
  // it means that null !== true => so it will be false in this case

  // save stage accordinally 
  useEffect(() => {
    if (isLoggedIn) {// if it was true then it will be here
      localStorage.setItem("isLoggedIn", "true");
    } else {// then logged out
      localStorage.setItem("isLoggedIn", "false");
    }
  }, [isLoggedIn]);// always reacting on chenage of logged in/out

  const login = () => {
    setIsLoggedIn(true);// call when loogin when auth.login
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
       {children}  {/*children has acces to data */}
    </AuthContext.Provider>
  );
};
