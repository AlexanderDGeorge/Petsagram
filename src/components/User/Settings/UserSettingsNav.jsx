import React from "react";
import { FullNavDiv, FullNavDivItem } from "../../StyledComponents";
import { useLocation } from "react-router-dom";
export default function UserSettingsNav() {
    return (
        <FullNavDiv>
            <UserSettingsNavItem name={"Edit Profile"} path={"/edit"} />
            <UserSettingsNavItem
                name={"Notifications"}
                path={"/notifications"}
            />
            <UserSettingsNavItem name={"Change Password"} path={"/password"} />
            <UserSettingsNavItem name={"Manage Account"} path={"/account"} />
        </FullNavDiv>
    );
}

function UserSettingsNavItem({ name, path }) {
    const pathname = useLocation().pathname.slice(9);

    return (
        <FullNavDivItem
            style={
                pathname === path
                    ? { borderLeft: "2px solid var(--accent)" }
                    : {}
            }
            to={`/settings${path}`}
        >
            {name}
        </FullNavDivItem>
    );
}
