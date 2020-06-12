import React, { useContext } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { signOut } from "../../../firebase";
import { Menu, MenuItem, Wrapper } from "../../StyledComponents";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import UserSettingsNav from "./UserSettingsNav";
import { DarkContext } from "../../Application";

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
    const { darkMode, setDarkMode } = useContext(DarkContext);

    return (
        <Menu>
            <MenuItem onClick={() => history.push("/settings/edit")}>
                Edit Profile
            </MenuItem>
            <MenuItem onClick={() => history.push("/settings/password")}>
                Change Password
            </MenuItem>
            <MenuItem onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </MenuItem>
            <MenuItem onClick={signOut}>Log Out</MenuItem>
        </Menu>
    );
}
