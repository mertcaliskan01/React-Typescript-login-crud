import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import "./navbar.css";
import { Link } from "react-router-dom";

interface NavbarProps {
  currentUser: any; // Update this to match your actual user type
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout }) => {
  const [toggleMenu, setToggleMenu] = useState(false);


  return (
    <div className="book_app__navbar">
      <div className="book_app__navbar-links">
        <div className="book_app__navbar-links_logo">
          <img src={logo} alt="" />
        </div>
        <div className="book_app__navbar-links_container">
          <p>
            <Link to={"/"} className="navbar-brand">
              Home
            </Link>
          </p>
          <p>
            <Link to={"/list"} className="navbar-brand">
              Book List
            </Link>
          </p>
              <p>
                <Link to={"/add"} className="navbar-brand">
                  New Book
                </Link>
              </p>
        </div>
      </div>

      {currentUser ? (
        <div className="book_app__navbar-sign">
          <Link className="link-button" to={"/profile"}>
            {currentUser.firstName} {currentUser.lastName}
          </Link>
          <p>
            <a className="button" href="/login" onClick={onLogout}>
              LogOut
            </a>
          </p>
        </div>
      ) : (
        <div className="book_app__navbar-sign">
          <p>
            <Link className="link-button" to={"/login"}>Login</Link>
          </p>
          <p>

          <Link to={"/register"}>
            Sign Up
          </Link>
          </p>

        </div>
      )}
      <div className="book_app__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={30}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={30}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="book_app__navbar-menu_container scale-up-center">
            <div className="book_app__navbar-menu_container-links">
              <p>
                <Link to={"/"} className="navbar-brand">
                  Home
                </Link>
              </p>
              <p>
                <Link to={"/list"} className="navbar-brand">
                  Book List
                </Link>
              </p>
              <p>
                <Link to={"/add"} className="navbar-brand">
                  New Book
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
