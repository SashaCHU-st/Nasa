import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {
    const [show, setShow] = useState(false)

    const toggleMenu=()=>
    {
        setShow(!show)
    }
  return (
    <nav className='navWr'>
        <div className='logo'>
            <NavLink to="/">
                <i>Sasha's universe</i>
            </NavLink>
        </div>
        <div className={show ? "linkWr show" : "linkWr"}>
            <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
            <NavLink to="login" onClick={toggleMenu}>Login</NavLink>
            <NavLink to="signup" onClick={toggleMenu}>SignUp</NavLink>
        </div>
        <div className="burgerMenu" onClick={toggleMenu}>&#9776;</div>
    </nav>
  );
};

export default Navbar
