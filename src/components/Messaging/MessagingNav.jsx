import React from "react";
import { FullNavDiv, FullNavDivItem } from "../StyledComponents";

export default function MessagingNav() {
    return (
        <FullNavDiv>
            <MessagingNavItem name={"New Message"} path={`/new`} />
        </FullNavDiv>
    );
}

function MessagingNavItem({ name, path }) {
    return <FullNavDivItem to={`/messaging${path}`}>{name}</FullNavDivItem>;
}
