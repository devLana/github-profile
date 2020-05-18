import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import "./styles/Navbar.scss";

const Navbar = () => {
  const page = "home";

  return (
  <nav id="navbar">
    <div className="container">
      {
        page === "home"
          ? (
            <div className="nav-container">
              <Link to="/">
                <div className="logo">
                  <span className="logo__one">Github</span>
                  <span className="logo__two">Profile</span>
                </div>
              </Link>
            </div>
          ) : (
            <div className="nav-container">
              <Link to="/">
                <div className="logo">
                  <span className="logo__one">Github</span>
                  <span className="logo__two">Profile</span>
                </div>
              </Link>
              <SearchBox />
            </div>
          )
      }
    </div>
  </nav>
  );
};

export default Navbar;
