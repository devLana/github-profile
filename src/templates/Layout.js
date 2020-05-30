import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({searchBox, children}) => {
  const navBar = searchBox
    ? <Navbar searchBox={searchBox} />
    : <Navbar />;

  return (
    <>
      {navBar}
      <main id="main">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
