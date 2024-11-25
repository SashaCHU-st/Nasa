import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Detail from "../pages/detail/Detail";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Защищённый маршрут для Details */}
          <Route
            path="/detail"
            element={
              !isLoggedIn ? (
                <Navigate
                  to="/login"
                  state={{ from: "/detail" }} // Передаем путь на детальную страницу
                />
              ) : (
                <Detail />
              )
            }
          />
          
          {/* Страница логина */}
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
