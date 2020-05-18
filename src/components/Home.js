import React from 'react';
import "./styles/Home.scss";


const Home = () => {
  return (
    <main id="main">
      <div className="container">
        <div className="home__wrapper">
          <h1>Search for a Github user</h1>
          <div className="search-box">
            <input
              type="search"
              name="search"
            />
            <span id="search-btn">
              <svg width="100%" height="100%">
                <g fill="none" strokeWidth="2px" stroke="#fff">
                  <circle cx="26" cy="15.5" r="6" />
                  <line x1="16" y1="26" x2="22" y2="20" />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
