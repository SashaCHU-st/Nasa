import React, { useState, createContext, useEffect, ReactNode } from "react";

interface AuthContextType {
  userId: string | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (userId: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// export const AuthContext = createContext();
interface AuthProviderProps {
  children: ReactNode; // `children` can be any valid ReactNode (JSX, strings, numbers, etc.)
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn"); // if getItem will return null=> means that user never logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    storedUserLoggedInInfo === "true"
  ); // checking if storedUserLoggedInInfo equal === true, if not
  // it means that null !== true => so it will be false in this case

  // // save stage accordinally
  // useEffect(() => {
  //   if (isLoggedIn) {// if it was true then it will be here
  //     localStorage.setItem("isLoggedIn", "true");
  //   } else {// then logged out
  //     localStorage.setItem("isLoggedIn", "false");
  //   }
  // }, [isLoggedIn]);// always reacting on chenage of logged in/out


  const login = (userId: string, token: string) => {
    setIsLoggedIn(true); // call when loogin when auth.login
    localStorage.setItem("isLoggedIn", "true");

    setUserId(userId);
    setToken(token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, token }}>
      {children} {/*children has acces to data */}
    </AuthContext.Provider>
  );
};
