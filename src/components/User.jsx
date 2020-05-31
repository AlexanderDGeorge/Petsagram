import React, { useContext, useState } from "react";
import { UserContext } from "./Application";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { signOut } from "../firebase";

export function User() {
  return (
    <section id="User">
      <UserHeader />
      <UserContent />
    </section>
  );
}

export function UserBubble() {
  const { user } = useContext(UserContext);

  return (
    <Link to="/user" id="UserBubble">
      <img id="UserPhoto" src={user.photoURL} alt="" />
    </Link>
  );
}

function UserHeader() {
  const [open, setOpen] = useState(false);

  const { user } = useContext(UserContext);

  return (
    <header id="UserHeader">
      <img className="UHimg" src={user.photoURL} alt="" />
      <div className="UHdiv">
        <span className="UHspan">
          <p>name</p>
          <button>Edit Profile</button>
          <button onClick={() => setOpen(true)}>Settings</button>
        </span>
        <span className="UHspan">
          <p>posts</p>
          <p>followers</p>
          <p>following</p>
        </span>
        <span className="UHspan">bio</span>
      </div>
      {open ? (
        <Modal
          open={open}
          setOpen={setOpen}
          content={<UserMenu setOpen={setOpen} />}
        />
      ) : null}
    </header>
  );
}

function UserContent() {
  return <section id="UserContent"></section>;
}

function UserMenu({ setOpen }) {
  return (
    <div id="UserMenu">
      <button>Edit Profile</button>
      <button>Change Password</button>
      <button onClick={signOut}>Log Out</button>
      <button onClick={() => setOpen(false)}>Cancel</button>
    </div>
  );
}
