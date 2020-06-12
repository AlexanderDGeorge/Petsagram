import React from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";

const UserSetNavWrapper = styled.div`
    height: 100%;
    width: 28%;
    border-right: 1px solid ${(props) => props.theme.accent};
`;

export default function UserSettingsNav() {
    return (
        <UserSetNavWrapper>
            <UserSettingsNavItem name={"Edit Profile"} path={"/edit"} />
            <UserSettingsNavItem name={"Change Password"} path={"/password"} />
            <UserSettingsNavItem
                name={"Notifications"}
                path={"/notifications"}
            />
            <UserSettingsNavItem name={"Manage Account"} path={"/account"} />
        </UserSetNavWrapper>
    );
}

const UserSetNavItem = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5%;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.light};
        border-left: 2px solid ${(props) => props.theme.mid};
    }
`;

function UserSettingsNavItem({ name, path }) {
    const history = useHistory();
    const location = useLocation().pathname.slice(9);
    return (
        <UserSetNavItem
            style={
                location === path ? { borderLeft: "2px solid var(--dark)" } : {}
            }
            onClick={() => history.replace(`/settings${path}`)}
        >
            {name}
        </UserSetNavItem>
    );
}
