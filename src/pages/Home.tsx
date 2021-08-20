import React from "react";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";

const Home = () => {
  document.title = "Github Profile";

  return (
    <Layout>
      <div id="home--container">
        <h1>Search for a Github user</h1>
        <div className="search-box--container">
          <SearchBox autoFocus />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
