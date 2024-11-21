import React, { useState, useCallback } from "react";
import { AuthContext } from "../context/auth-context";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Detail from "../pages/detail/Detail";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          {isLoggedIn && <Route path="/detail" element={<Detail />} />}
          {/* Redirect rules */}
          {isLoggedIn && <Route path="/login" element={<Navigate to="/" />} />}
          {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
