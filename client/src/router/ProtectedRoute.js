import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  if (!isLoggedIn) {
    // Сохраняем путь, на который пользователь хотел попасть
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Если авторизован, рендерим дочерние компоненты
};

export default ProtectedRoute;
