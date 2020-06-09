import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { findExactUser } from "../firebase";
import { UserResult } from "./User/UserExports";

export default function Search() {
  return <section id="Search" className="content"></section>;
}

export function SearchBar() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    findExactUser(search).then((res) => setResults(res));
  }, [search]);

  return (
    <div>
      <input
        id="SearchBar"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
        placeholder="Search"
      />
      {open ? (
        <Modal
          setOpen={setOpen}
          content={<SearchResults results={results} />}
        />
      ) : null}
    </div>
  );
}

function SearchResults({ results }) {
  if (results) {
    return (
      <div id="SearchResults">
        {results.map((result, i) => (
          <UserResult result={result} key={i} />
        ))}
      </div>
    );
  } else {
    return null;
  }
}
