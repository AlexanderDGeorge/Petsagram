import React from "react";
import { useLocation, useHistory, Switch, Route } from "react-router-dom";

export default function UserSettings() {
  return (
    <section id="UserSettings" className="content">
      <UserSettingsNav />
      <Switch>
        <Route path="/settings/edit" component={EditProfile} />
        <Route path="/settings/password" component={ChangePassword} />
      </Switch>
    </section>
  );
}

function EditProfile() {
  return <section id="EditProfile" className="USContent"></section>;
}

function ChangePassword() {
  return <section id="ChangePassword" className="USContent"></section>;
}

function UserSettingsNav() {
  return (
    <div id="USNav">
      <UserSettingsNavItem name={"Edit Profile"} path={"/edit"} />
      <UserSettingsNavItem name={"Change Password"} path={"/password"} />
    </div>
  );
}

function UserSettingsNavItem({ name, path }) {
  const history = useHistory();
  const location = useLocation().pathname.slice(9);
  return (
    <div
      className="USNavItem"
      style={location === path ? { borderLeft: "2px solid var(--dark)" } : {}}
      onClick={() => history.replace(`/settings${path}`)}
    >
      {name}
    </div>
  );
}
