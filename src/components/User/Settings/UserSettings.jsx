import React from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { signOut } from "../../../firebase";
import { Menu, MenuItem, Wrapper } from "../../StyledComponents";
import EditProfile from "./EditProfile";
import UserSettingsNav from "./UserSettingsNav";

export default function UserSettings() {
    return (
        <Wrapper>
            <UserSettingsNav />
            <Switch>
                <Route path="/settings/edit" component={EditProfile} />
                <Route path="/settings/password" component={ChangePassword} />
            </Switch>
        </Wrapper>
    );
}

export function UserMenu() {
    const history = useHistory();

    return (
        <Menu>
            <MenuItem onClick={() => history.push("/settings/edit")}>
                Edit Profile
            </MenuItem>
            <MenuItem onClick={() => history.push("/settings/password")}>
                Change Password
            </MenuItem>
            <MenuItem onClick={signOut}>Log Out</MenuItem>
        </Menu>
    );
}

function ChangePassword() {
    return <section id="ChangePassword" className="USContent"></section>;
}
