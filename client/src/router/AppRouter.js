import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../../src/components/context/auth-context";
import Navbar from "../components/navbar/Navbar";
import Users from "../pages/home/Users";
import Login from "../pages/login/Login";
import Search from "../pages/search/Search";
import Default from "../pages/default/Default";
import Detail from "../pages/details/Detail";
import Favorites from "../pages/favorites/Favorites";
import Profile from "../pages/profile/Profile";
import FavoriteArticlesPage from "../pages/userArticle/FavoriteArticlesPage";

const AppRouter = () => {
  const auth = useContext(AuthContext); // checking if it is logged in or not

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Default />} />
        {/* In case if logged in but go bck is not allow go to login or home pages */}
        <Route
          path="/users"
          element={auth.isLoggedIn ? <Navigate to="/search" /> : <Users />}
        />
        <Route
          path="/login"
          element={auth.isLoggedIn ? <Navigate to="/search" /> : <Login />}
        />
        {/* Whn logged in */}
        <Route
          path="/search"
          element={auth.isLoggedIn ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={auth.isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/detail"
          element={auth.isLoggedIn ? <Detail /> : <Navigate to="/login" />}
        />
        <Route
          path="/favorites"
          element={auth.isLoggedIn ? <Favorites /> : <Navigate to="/login" />}
        />
        <Route path="/shared-favorites" element={<FavoriteArticlesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
