import React, { useState, useEffect } from "react";
import { getUsers } from "../firebase";
import { UserResult } from "./User/UserExports";

export default function Search() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    document.title = "Search";
  });

  return (
    <section id="Search" className="content">
      <SearchBar setResults={setResults} />
      <SearchResults results={results} />
    </section>
  );
}

export function SearchBar({ setResults }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function fetchUsers() {
      setUsers(await getUsers());
    })();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
    setResults(
      users.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  return (
    <input
      id="SearchBar"
      type="text"
      value={search}
      onChange={handleSearch}
      placeholder="Search"
    />
  );
}

function SearchResults({ results }) {
  if (results) {
    return (
      <div id="SearchResults">
        {results.map((result, i) => (
          <UserResult user={result} key={i} />
        ))}
      </div>
    );
  } else {
    return null;
  }
}
