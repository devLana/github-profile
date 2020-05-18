import React from "react";
import "./styles/SearchBox.scss";

const SearchBox = () => {
  return (
    <div id="search-box">
      <input
        type="search"
        name="search"
        id="search"
      />
      <button id="search-btn">
        <svg width="100%" height="100%">
          <g className="graphics" fill="none" strokeWidth="2px" stroke="#fff">
            <circle cx="21" cy="14" r="6" />
            <line x1="13" y1="26" x2="18" y2="19" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default SearchBox;
