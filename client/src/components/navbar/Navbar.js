import React, { useContext } from "react";
import { AuthContext } from "../../components/context/auth-context";
import { NavLink, useNavigate } from "react-router-dom"; // Используем NavLink для навигации
import "./Navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext); // Получаем контекст авторизации
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShow((prevShow) => !prevShow);

  const logoutHandler = () => {
    auth.logout();  // Выход из системы
    navigate("/");   // После выхода перенаправляем на главную страницу
  };

  return (
    <nav className="navWr">
      <div className="logo">
        <NavLink to="/default">Sasha's Universe</NavLink>
      </div>
      <div className={show ? "linkWr show" : "linkWr"}>
        {!auth.isLoggedIn && (
          <>
            <NavLink to="/" onClick={toggleMenu}> {/* Перейти на страницу Home */}
              Home
            </NavLink>

            <NavLink to="/login" onClick={toggleMenu}> {/* Перейти на страницу Login */}
              Login/Signup
            </NavLink>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <NavLink to="/search" onClick={toggleMenu}> {/* Перейти на страницу Search */}
              Search
            </NavLink>
            <NavLink to="/favorites" onClick={toggleMenu}> {/* Перейти на страницу Favorites */}
              Mine Favorites
            </NavLink>
            <NavLink to="/profile" onClick={toggleMenu}> {/* Перейти на страницу Favorites */}
              Profile
            </NavLink>
            <NavLink onClick={logoutHandler}> {/* Выход из системы */}
              Logout
            </NavLink>
          </>
        )}
      </div>
      <div className="burgerMenu" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
