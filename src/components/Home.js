import React, { useState } from 'react';
import Layout from "./Layout";
import SearchBox from "./SearchBox";
import "../styles/Home.scss";


const Home = () => {
  const [errMsg, setErrMsg] = useState("");
  const setError = str => {

    switch (str) {
      case "Not Found":
        setErrMsg("This user could not be found.");
        break;
      case "Offline":
        setErrMsg("Network error. Please try again later!");
        break;
      default:
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
