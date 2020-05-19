import React, { useState } from 'react';
import Layout from "./Layout";
import SearchBox from "./SearchBox";
import "./styles/Home.scss";


const Home = () => {
  const [errMsg, setErrMsg] = useState("");
  const setError = str => {

    switch (str) {
      case "Not Found":
        setErrMsg("This user was not found");
        break;
      case "Offline":
        setErrMsg("It appears you are offline! Please check your network and try again.");
        break;
      default:
        setErrMsg("Search for a user");
    }
  };

  const unSetError = () => setErrMsg(null);

  return (
    <Layout>
      <h1>Search for a Github user</h1>
      <div className="search-box__container">
        <SearchBox setError={setError} unSetError={unSetError} />
        <p id="search__error">{errMsg}</p>
      </div>
    </Layout>
  );
};

export default Home;
