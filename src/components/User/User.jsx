import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Application";
import { Link, useHistory } from "react-router-dom";
import { IoIosCog } from "react-icons/io";
import Modal from "../Modal";
import { signOut } from "../../firebase";

export function User() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = user.displayName;
  }, [user]);

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
          <p style={{ fontSize: 20, fontWeight: 700 }}>{user.username}</p>
          <Link to="/settings/edit">Edit Profile</Link>
          <IoIosCog onClick={() => setOpen(true)} />
        </span>
        <span className="UHspan">
          <p>posts</p>
          <p>followers</p>
          <p>following</p>
        </span>
        <span className="UHspan" style={{ fontWeight: 700 }}>
          {user.displayName}
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
  const history = useHistory();

  return (
    <div id="UserMenu">
      <button onClick={() => history.push("/settings/edit")}>
        Edit Profile
      </button>
      <button onClick={() => history.push("/settings/password")}>
        Change Password
      </button>
      <button onClick={signOut}>Log Out</button>
      <button onClick={() => setOpen(false)}>Cancel</button>
    </div>
  );
}
