import React from "react";
import type { SearchBoxType } from "../dataTypes";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  searchBox?: SearchBoxType;
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
