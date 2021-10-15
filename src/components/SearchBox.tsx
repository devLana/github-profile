import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

interface SearchBoxProps {
  reset?: () => void;
  autoFocus?: boolean;
}

const SearchBox = ({ reset, autoFocus }: SearchBoxProps) => {
  const [initialUser, setInitialUser] = useState("");

  const history = useHistory();
  const location = useLocation();
  const { user } = useParams<{ user: string }>();

  const inputElement = useRef<HTMLInputElement>(null);
  const searchBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) setInitialUser(user);
  }, [user]);

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInitialUser(e.target.value);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputElement.current) inputElement.current.blur();
      submit();
    }
  };

  const inputBlur = () => {
    if (searchBox.current) {
      location.pathname === "/"
        ? (searchBox.current.style.borderColor = "#745811")
        : (searchBox.current.style.borderColor = "#1b503f");
    }
  };

  const inputFocus = () => {
    if (searchBox.current) {
      searchBox.current.style.borderColor = "#e64fb6";
    }
  };

  const submit = () => {
    const search = inputElement.current
      ? inputElement.current.value.trim()
      : "";

    if (search === "") return;
    if (search === user) return;

    if (reset) reset();
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
        autoFocus={autoFocus ? true : false}
      />
      <span id="search-btn" onClick={submit}>
        <svg width="100%" height="100%">
          <g
            className="graphics"
            fill="none"
            strokeWidth="2px"
            stroke="#745811"
          >
            <circle cx="21" cy="14" r="6" />
            <line x1="13" y1="26" x2="18" y2="19" />
          </g>
        </svg>
      </span>
    </div>
  );
};

export default SearchBox;
