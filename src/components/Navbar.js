import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";

const Navbar = ({searchBox}) => {
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState(false);

  const location = useLocation();

  const setError = () => {
    setErr(true);
    setErrMsg("Network error! Please try again later.");
    setTimeout(() => setErr(false), 3000);
  };

  const searchBar = searchBox
    ? searchBox(setError)
    : <SearchBox setError={setError} />

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
        { location.pathname !== "/" && searchBar}
        { err && <div className="nav__error">{errMsg}</div> }
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
