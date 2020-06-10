import React, { useContext, useState } from "react";
import { useLocation, useHistory, Switch, Route } from "react-router-dom";
import { UserContext } from "../Application";
import { updateUserDoc } from "../../firebase";

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
  const { currentUser } = useContext(UserContext);
  const [photoURL] = useState(currentUser.photoURL);
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const history = useHistory();

  async function handleSave() {
    await updateUserDoc(currentUser.uid, photoURL, name, username, bio);
    history.push(`/user/${currentUser.username}`);
  }

  return (
    <section id="EditProfile" className="USContent">
      <div className="editarea" style={{ height: 60 }}>
        <img
          className="label"
          src={currentUser.photoURL}
          alt=""
          style={{ borderRadius: "50%", height: "100%" }}
        />
        <div className="input" style={{ border: "none" }}>
          <label
            htmlFor="file-upload"
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Change Profile Picture
          </label>
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
      <button className="USSubmit" onClick={handleSave}>
        Save Changes
      </button>
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
