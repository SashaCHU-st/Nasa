import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { NavLink } from "react-router-dom"; // Use navLink for navigation
import "./Navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext); // get the context of authorization
  const [show, setShow] = React.useState(false);
  // const navigate = useNavigate();

  const toggleMenu = () => setShow((prevShow) => !prevShow);

  const logoutHandler = () => {
    auth?.logout(); // loggeed out
    //  navigate("/");   // after logout to the main page, maybe not need... fix later
  };

  return (
    <nav className="navWr">
      <div className="logo">
        <NavLink to="/">Sasha's Universe</NavLink>
      </div>
      <div className={show ? "linkWr show" : "linkWr"}>
        {!auth?.isLoggedIn && (
          <>
            <NavLink to="/users" onClick={toggleMenu}>
              Users
            </NavLink>

            <NavLink to="/login" onClick={toggleMenu}>
              Login/Signup
            </NavLink>
          </>
        )}
        {auth?.isLoggedIn && (
          <>
            <NavLink to="/search" onClick={toggleMenu}>
              Search
            </NavLink>
            <NavLink to="/favorites" onClick={toggleMenu}>
              My Favorites
            </NavLink>
            <NavLink to="/profile" onClick={toggleMenu}>
              Profile
            </NavLink>
            <NavLink to="/" onClick={logoutHandler}>
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
