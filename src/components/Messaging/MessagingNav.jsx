import React, { useContext } from "react";
import { FullNavDiv, FullNavDivItem } from "../StyledComponents";
import { UserContext } from "../Application";

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
    return <FullNavDivItem to={`/messaging${path}`}>{name}</FullNavDivItem>;
}
