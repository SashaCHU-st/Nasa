import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Detail from "../pages/detail/Detail";
import UserList from "../pages/UserList/UserList"; // Импортируем UserList

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlist" element={<UserList />} /> {/* Здесь показываем компонент UserList */}
        <Route
          path="/detail"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" state={{ from: "/detail" }} />
            ) : (
              <Detail />
            )
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
