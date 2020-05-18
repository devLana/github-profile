import React, { useState } from 'react';
import SearchBox from "./SearchBox";
import "./styles/Home.scss";


const Home = () => {
  const [user, setUser] = useState({name: ""});

  return (
    <main id="main">
      <div className="container">
        <div className="home__wrapper">
          <h1>Search for a Github user</h1>
          <SearchBox />
          <p id="search__error"></p>
        </div>
      </div>
    </main>
  );
};

export default Home;
