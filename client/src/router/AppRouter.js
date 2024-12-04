import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../../src/components/context/auth-context";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Search from "../pages/search/Search";
import Default from "../pages/default/Default";
import Detail from "../pages/details/Detail";
import Favorites from "../pages/favorites/Favorites";
import Profile from "../pages/profile/Profile";


const AppRouter = () => {
  const auth = useContext(AuthContext); // Получаем данные из контекста

  return (
    <BrowserRouter>
      <Navbar /> {/* Навигационная панель */}
      <Routes>
        <Route path="/" element={<Default />} />
        <Route
          path="/default"
          element={auth.isLoggedIn ? <Navigate to="/search" /> : <Home />}  
        />
        <Route
          path="/login"
          element={auth.isLoggedIn ? <Navigate to="/search" /> : <Login />} 
        />
        
        {/* Защищённый маршрут для страницы Search */}
        <Route
          path="/search"
          element={auth.isLoggedIn ? <Search /> : <Navigate to="/login" />} 
        />
        <Route path="/profile" element={auth.isLoggedIn ? <Profile /> : <Navigate to="/login"/> }/>
        <Route path="/detail" element={auth.isLoggedIn ? <Detail /> : <Navigate to="/login"/> }/>
        <Route path="/favorites" element={auth.isLoggedIn ? <Favorites /> : <Navigate to="/login"/> }/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
