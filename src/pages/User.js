import React from "react";
import { Helmet } from "react-helmet";
import Repos from "../components/Repos";
import Avatar from "../components/Avatar";
import Bio from "../components/Bio";
import withUser from "../HOC";

const User = () => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ="
          crossorigin="anonymous"
        />
      </Helmet>
      <div id="user__container">
        <div className="grid">
          <Avatar />
          <Bio />
        </div>
        <Repos />
      </div>
    </>
  );
};

export default withUser(User);
