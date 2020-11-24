import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";

const Navbar = ({ searchBox }) => {
  const location = useLocation();
  const searchBar = searchBox ? searchBox : <SearchBox />;

  return (
    <nav id="navbar">
      <div className="container">
        <div id="nav--container">
          <Link to="/">
            <div className="logo">
              <span className="logo__one">Github</span>
              <span className="logo__two">Profile</span>
            </div>
          </Link>
          {location.pathname !== "/" && searchBar}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  searchBox: PropTypes.element,
};
