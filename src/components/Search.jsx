import React, { useState } from "react";

export function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <input
      id="SearchBar"
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search"
    />
  );
}
