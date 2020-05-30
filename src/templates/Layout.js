import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <main id="main">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
