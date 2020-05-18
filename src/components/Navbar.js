import React from "react";
import "./styles/Navbar.scss";

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="container">
        <div className="logo">
          <span className="logo__one">Github</span>
          <span className="logo__two">Profile</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
