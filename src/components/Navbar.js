import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import "./styles/Navbar.scss";

const Navbar = () => {
  const path = window.location.pathname;
  let user;

  if (path !== "/") {
    const newPathName = path.slice(1);
    const index = newPathName.indexOf("/");
    user = (index !== -1)
      ? newPathName.substr(0, index)
      : newPathName.substr(0);
  }

  return (
  <nav id="navbar">
    <div className="container">
      {
        path === "/"
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
              <SearchBox initialUser={user} />
            </div>
          )
      }
    </div>
  </nav>
  );
};

export default Navbar;
