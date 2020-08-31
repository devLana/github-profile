import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";

const Layout = ({ searchBox, children }) => {
  const navBar = searchBox ? <Navbar searchBox={searchBox} /> : <Navbar />;

  return (
    <>
      {navBar}
      <main id="main">
        <div className="container">{children}</div>
      </main>
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  searchBox: PropTypes.element,
};
