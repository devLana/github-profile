import React, { useState } from 'react';
import Layout from "./Layout";
import SearchBox from "./SearchBox";
import "../styles/Home.scss";


const Home = () => {
  const [errMsg, setErrMsg] = useState("");

  const setError = () => setErrMsg("Network error! Please try again later.");

  const unSetError = () => setErrMsg("");

  return (
    <Layout>
      <div id="home--container">
        <h1>Search for a Github user</h1>
        <div className="search-box--container">
          <SearchBox setError={setError} unSetError={unSetError} />
          <p id="search__error">{errMsg}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
