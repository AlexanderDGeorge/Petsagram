import React, { useContext, useState } from "react";
import { useLocation, useHistory, Switch, Route } from "react-router-dom";
import { UserContext } from "../Application";

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
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);

  return (
    <section id="EditProfile" className="USContent">
      <div className="editarea">
        <img
          className="label"
          src={user.photoURL}
          alt=""
          style={{ borderRadius: "50%" }}
        />
        <div className="input">
          <label htmlFor="file-upload">Change Profile Picture</label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="editarea">
        <h3 className="label">Name</h3>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="editarea">
        <h3 className="label">Username</h3>
        <input
          className="input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="editarea">
        <h3 className="label">Bio</h3>
        <input
          className="input"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
    </section>
  );
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
