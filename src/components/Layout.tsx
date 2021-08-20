import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  searchBox?: JSX.Element;
}

const Layout = ({ searchBox, children }: LayoutProps) => {
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
