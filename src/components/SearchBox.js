import React, { useState, useEffect, useRef } from "react";

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

  const inputBlur = () => {
    (path === "/")
      ? searchBox.current.style.border = "2px solid #745811"
      : searchBox.current.style.border = "2px solid #1b503f";
  };

  const inputFocus = () => {
    if (path === "/") unSetError();
    searchBox.current.style.border = "2px solid #e64fb6";
  };

  const submit = () => {
    const search = inputElement.current.value.trim();

    if (search === "") {
      return;
    } else if (!navigator.onLine) {
      setError();
      return;
    }

    window.location = `/${search}`;
  };

  return (
    <div id="search-box" ref={searchBox}>
      <input
        type="search"
        name="search"
        value={user}
        id="search"
        onChange={change}
        onFocus={inputFocus}
        onBlur={inputBlur}
        onKeyUp={handleKeyPress}
        ref={inputElement}
      />
      <span id="search-btn" onClick={submit}>
        <svg width="100%" height="100%">
          <g className="graphics" fill="none" strokeWidth="2px" stroke="#745811">
            <circle cx="21" cy="14" r="6" />
            <line x1="13" y1="26" x2="18" y2="19" />
          </g>
        </svg>
      </span>
    </div>
  );
};

export default SearchBox;
