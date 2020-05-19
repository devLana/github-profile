import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/SearchBox.scss";

const SearchBox = props => {
  const [user, setUser] = useState("");

  const inputElement = useRef(null);
  const searchBox = useRef(null);

  const path = window.location.pathname;
  const { setError, unSetError, initialUser } = props;

  useEffect(() => {
    if (initialUser) setUser(initialUser);
  }, [initialUser]);

  const change = e => setUser(e.target.value);

  const inputFocus = () => {
    searchBox.current.style.borderColor = "#000";
    unSetError();
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      submit();
      inputElement.current.blur();
    }
  }

  const handleNavKeyPress = e => {
    if (e.key === "Enter") {
      navSubmit();
      inputElement.current.blur();
    }
  };

  const submit = async () => {
    const search = inputElement.current.value.trim();

    if (!navigator.onLine) {
      setError("Offline");
      searchBox.current.style.borderColor = "#f00";
      return;
    } else if (search === "") {
      return;
    }

    try {
      const fetchUser = await axios.get(`https://api.github.com/users/${search}`);
      window.location = `/${fetchUser.data.login}`;
    } catch (err) {
      if (err.response.status === 404) {
        setError("Not Found");
        searchBox.current.style.borderColor = "#f00";
      }
    }
  };

  const navSubmit = async () => {
    const search = inputElement.current.value.trim();

    if (!navigator.onLine) {
      setError("Offline");
      return;
    } else if (search === "") {
      return;
    }

    try {
      const fetchUser = await axios.get(`https://api.github.com/users/${search}`);
      window.location = `/${fetchUser.data.login}`;
    } catch (err) {
      if (err.response.status === 404) {
        setError("Not Found");
      }
    }

  };

  return (
    <>
      {
        path === "/"
          ? (
            <div id="search-box" ref={searchBox}>
              <input
                type="search"
                name="search"
                value={user}
                id="search"
                onChange={change}
                onFocus={inputFocus}
                onKeyUp={handleKeyPress}
                ref={inputElement}
              />
              <button id="search-btn" onClick={submit}>
                <svg width="100%" height="100%">
                  <g className="graphics" fill="none" strokeWidth="2px" stroke="#fff">
                    <circle cx="21" cy="14" r="6" />
                    <line x1="13" y1="26" x2="18" y2="19" />
                  </g>
                </svg>
              </button>
            </div>
          ) : (
            <div id="search-box">
              <input
                type="search"
                name="search"
                value={user}
                id="search"
                onChange={change}
                onKeyUp={handleNavKeyPress}
                ref={inputElement}
              />
              <button id="search-btn" onClick={navSubmit}>
                <svg width="100%" height="100%">
                  <g className="graphics" fill="none" strokeWidth="2px" stroke="#fff">
                    <circle cx="21" cy="14" r="6" />
                    <line x1="13" y1="26" x2="18" y2="19" />
                  </g>
                </svg>
              </button>
            </div>
          )
      }
    </>
  );
};

export default SearchBox;
