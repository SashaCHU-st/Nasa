import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./Navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext); // Use AuthContext here
  const [show, setShow] = React.useState(false);

  const toggleMenu = () => setShow((prevShow) => !prevShow);

  return (
    <nav className="navWr">
      <div className="logo">
        <NavLink to="/">Sasha's Universe</NavLink>
      </div>
      <div className={show ? "linkWr show" : "linkWr"}>
        <NavLink to="/" onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/userlist" onClick={toggleMenu}>
          User List
        </NavLink> {/* Ссылка на страницу User List */}
        {!auth.isLoggedIn && (
          <NavLink to="/login" onClick={toggleMenu}>
            Login/Signup
          </NavLink>
        )}
        {auth.isLoggedIn && (
          <>
            <NavLink to="/detail" onClick={toggleMenu}>
              Detail
            </NavLink>
            <NavLink onClick={() => {
                auth.logout(); // Call the logout method
                toggleMenu();
              }}
            >
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
