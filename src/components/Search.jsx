import React, { useState, useEffect } from "react";
import { InputBox, VerticalWrapper } from "./StyledComponents";
import { getUsers } from "../firebase";
import { UserListItem } from "./User/UserExports";

export default function Search() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        document.title = "Search";
    });

    return (
        <VerticalWrapper>
            <SearchBar setResults={setResults} />
            <SearchResults results={results} />
        </VerticalWrapper>
    );
}

export function SearchBar({ setResults }) {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async function fetchUsers() {
            const temp = await getUsers();
            setUsers(temp);
            setResults(temp);
        })();
    }, [setResults]);

    function handleSearch(e) {
        setSearch(e.target.value);
        setResults(
            users.filter(
                (user) =>
                    user.username
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    user.fullname.toLowerCase().includes(search.toLowerCase())
            )
        );
    }

    return (
        <InputBox
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
            <div style={{ maxHeight: 500, width: "100%" }}>
                {results.map((result, i) => (
                    <UserListItem user={result} key={i} />
                ))}
            </div>
        );
    } else {
        return null;
    }
}
