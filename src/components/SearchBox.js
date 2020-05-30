import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

const SearchBox = props => {
  const [initialUser, setInitialUser] = useState("");

  const history = useHistory();
  const location = useLocation();
  const { user } = useParams();

  const inputElement = useRef(null);
  const searchBox = useRef(null);

  const { setError, unSetError, setLoading } = props;

  useEffect(() => {
    if (user) setInitialUser(user);
  }, [user]);

  const change = e => setInitialUser(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputElement.current.blur();
      submit();
    }
  };

  const inputBlur = () => {
    location.pathname === "/"
      ? searchBox.current.style.border = "2px solid #745811"
      : searchBox.current.style.border = "2px solid #1b503f";
  };

  const inputFocus = () => {
    if (location.pathname === "/") unSetError();
    searchBox.current.style.border = "2px solid #e64fb6";
  };

  const submit = () => {
    const search = inputElement.current.value.trim();

    if (initialUser === user) return;

    if (search === "") return;

    if (!navigator.onLine) {
      setError();
      return;
    }

    if (setLoading) setLoading();

    history.push(`/${search}`);
  };

  return (
    <div id="search-box" ref={searchBox}>
      <input
        type="search"
        name="search"
        value={initialUser}
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
