import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { SearchBoxType } from "../dataTypes";
import SearchBox from "./SearchBox";

interface NavbarProps {
  searchBox?: SearchBoxType;
}

const Navbar = ({ searchBox }: NavbarProps) => {
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
