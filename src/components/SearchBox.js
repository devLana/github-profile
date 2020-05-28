import React, { useState, useEffect, useRef } from "react";
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputElement.current.blur();
      submit();
    }
  };

  const inputFocus = () => {
    searchBox.current.style.borderColor = "#000";
    unSetError();
  };

  const submit = () => {
    const search = inputElement.current.value.trim();

    if (!navigator.onLine) {
      if (path === "/") searchBox.current.style.borderColor = "#f00";
      setError();
      return;
    } else if (search === "") {
      return;
    }

    window.location = `/${search}`;
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
              <Button func={submit} />
            </div>
          ) : (
            <div id="search-box">
              <input
                type="search"
                name="search"
                value={user}
                id="search"
                onChange={change}
                onKeyUp={handleKeyPress}
                ref={inputElement}
              />
              <Button func={submit} />
            </div>
          )
      }
    </>
  );
};

const Button = ({func}) => {
  return (
    <button id="search-btn" onClick={func}>
      <svg width="100%" height="100%">
        <g className="graphics" fill="none" strokeWidth="2px" stroke="#000">
          <circle cx="21" cy="14" r="6" />
          <line x1="13" y1="26" x2="18" y2="19" />
        </g>
      </svg>
    </button>
  );
};

export default SearchBox;
