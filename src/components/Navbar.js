import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import "../styles/Navbar.scss";

const Navbar = () => {
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState(false);

  const path = window.location.pathname;
  let user;

  if (path !== "/") {
    const newPathName = path.slice(1);
    const index = newPathName.indexOf("/");
    user = (index !== -1)
      ? newPathName.substr(0, index)
      : newPathName.substr(0);
  }

  const setError = () => {
    setErr(true);
    setErrMsg("Network error! Please try again later.");
    setTimeout(() => setErr(false), 3000);
  };

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
        { path !== "/" && <SearchBox initialUser={user} setError={setError} /> }
        { err && <div className="nav__error">{errMsg}</div> }
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
