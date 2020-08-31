import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layouts/Layout";
import Repos from "../components/Repos";
import Avatar from "../components/Avatar";
import Bio from "../components/Bio";
import withUser from "../HOC/withUser";

const User = props => {
  const {userData, reposData, reposLoading, searchBox} = props;

  return (
    <Layout searchBox={searchBox}>
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
            <Avatar
              img={userData.avatar_url}
              user={userData.login}
              name={userData.name}
              location={userData.location}
            />
            <Bio
              bio={userData.bio}
              repos={userData.public_repos}
              following={userData.following}
              followers={userData.followers}
              created={userData.created_at}
              url={userData.html_url}
              user={userData.login}
            />
        </div>
        <Repos
          user={userData.login}
          reposData={reposData}
          reposLoading={reposLoading}
        />
      </div>
    </Layout>
  );
};

export default withUser(User);
