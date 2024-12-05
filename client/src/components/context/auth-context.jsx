import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");// this is needed if we update page and in login stage will remain the same
  const [isLoggedIn, setIsLoggedIn] = useState(storedUserLoggedInInfo === "true");// by default set it true, it will change accordinally

  // save stage accordinally 
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.setItem("isLoggedIn", "false");
    }
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
