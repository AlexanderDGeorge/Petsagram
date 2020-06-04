import React, { useState, useEffect } from "react";
import Modal from "./Modal";

export function SearchBar() {
  const [search, setSearch] = useState("");

  useEffect(() => {}, [search]);

  return (
    <div>
      <input
        id="SearchBar"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
      {search ? <Modal /> : null}
    </div>
  );
}
