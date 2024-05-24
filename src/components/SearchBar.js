import { useEffect, useRef } from "react";
import { useKey } from "../useKey";

export default function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);

  function focusSearchBar() {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  }

  useKey("Enter", focusSearchBar);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
