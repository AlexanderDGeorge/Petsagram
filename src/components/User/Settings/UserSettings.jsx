import React, { useContext } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { signOut } from "../../../firebase";
import { Menu, MenuItem, HorizontalWrapper } from "../../StyledComponents";
import Profile from "./Profile";
import Password from "./Password";
import Notifications from "./Notifications";
import Account from "./Account";
import UserSettingsNav from "./UserSettingsNav";
import { DarkContext } from "../../Application";

export default function UserSettings() {
    return (
        <HorizontalWrapper>
            <UserSettingsNav />
            <Switch>
                <Route path="/settings/edit" component={Profile} />
                <Route path="/settings/password" component={Password} />
                <Route
                    path="/settings/notifications"
                    component={Notifications}
                />
                <Route path="/settings/account" component={Account} />
            </Switch>
        </HorizontalWrapper>
    );
}

export function UserMenu() {
    const history = useHistory();
    const { darkMode, setMode } = useContext(DarkContext);

    function handleSignOut() {
        history.replace("/");
        signOut();
    }

    return (
        <Menu>
            <MenuItem onClick={() => history.push("/settings/edit")}>
                Edit Profile
            </MenuItem>
            <MenuItem onClick={() => history.push("/settings/password")}>
                Change Password
            </MenuItem>
            <MenuItem onClick={setMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
        </Menu>
    );
}
