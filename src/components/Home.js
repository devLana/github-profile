import React, { useState } from 'react';
import Layout from "../templates/Layout";
import SearchBox from "./SearchBox";

const Home = () => {
  document.title = "Github Profile";
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState(false);

  const setError = () => {
    setErr(true);
    setErrMsg("Network error! Please try again later.");
  };

  const unSetError = () => {
    setErr(false);
    setErrMsg("");
  };

  return (
    <Layout>
      <div id="home--container">
        <h1>Search for a Github user</h1>
        <div className="search-box--container">
          <SearchBox setError={setError} unSetError={unSetError} />
          {err && <p id="search__error">{errMsg}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
