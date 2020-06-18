import React from "react";
import { FullNavDiv, FullNavDivItem } from "../../StyledComponents";
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
    return <FullNavDivItem to={`/settings${path}`}>{name}</FullNavDivItem>;
}
