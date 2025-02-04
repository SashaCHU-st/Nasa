import React, { useState, createContext, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthContext = createContext();
interface AuthProviderProps {
  children: ReactNode; // `children` can be any valid ReactNode (JSX, strings, numbers, etc.)
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");// if getItem will return null=> means that user never logged in
  const [isLoggedIn, setIsLoggedIn] = useState(storedUserLoggedInInfo === "true");// checking if storedUserLoggedInInfo equal === true, if not
  // it means that null !== true => so it will be false in this case

  // // save stage accordinally 
  // useEffect(() => {
  //   if (isLoggedIn) {// if it was true then it will be here
  //   } else {// then logged out
  //   }
  // }, [isLoggedIn]);// always reacting on chenage of logged in/out
  
  const login = () => {
    setIsLoggedIn(true);// call when loogin when auth.login
    localStorage.setItem("isLoggedIn", "true");
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
       {children}  {/*children has acces to data */}
    </AuthContext.Provider>
  );
};
