import React, { useContext } from "react";
import { FullNavDiv, FullNavDivItem } from "../StyledComponents";
import { UserContext } from "../Application";
import { useLocation } from "react-router-dom";

export default function MessagingNav() {
    const { currentUser } = useContext(UserContext);

    return (
        <FullNavDiv>
            <MessagingNavItem name={"New Chat"} path={`/new`} />
            {currentUser.chats.map((chat, i) => {
                return (
                    <MessagingNavItem
                        key={i}
                        name={chat.name}
                        path={`/${chat.id}`}
                    />
                );
            })}
        </FullNavDiv>
    );
}

function MessagingNavItem({ name, path }) {
    const pathname = useLocation().pathname.slice(10);

    return (
        <FullNavDivItem
            style={
                pathname === path
                    ? { borderLeft: "2px solid var(--accent)" }
                    : {}
            }
            to={`/messaging${path}`}
        >
            {name}
        </FullNavDivItem>
    );
}
