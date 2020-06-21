import React, { useState, useEffect } from "react";
import { InputBox, VerticalWrapper } from "./StyledComponents";
import { getUsers } from "../firebase";
import { UserListItem } from "./User/UserExports";
import Loader from "./Loader";
import { useRef } from "react";

export default function Search() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        document.title = "Search";
    });

    console.log(results);

    return (
        <VerticalWrapper>
            <SearchBar setResults={setResults} />
            <SearchResults results={results} />
        </VerticalWrapper>
    );
}

export function SearchBar({ setResults }) {
    const [search, setSearch] = useState("");
    const users = useRef(null);

    useEffect(() => {
        (async function fetchUsers() {
            const temp = await getUsers();
            users.current = temp;
            setResults(temp);
        })();
    }, [setResults]);

    function handleSearch(e) {
        setSearch(e.target.value.toLowerCase());
        setResults(
            users.current.filter(
                (user) =>
                    user.username
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                    user.fullname
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
            )
        );
    }
    if (users) {
        return (
            <InputBox
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search"
            />
        );
    } else return <Loader />;
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
