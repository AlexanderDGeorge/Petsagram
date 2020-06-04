import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Application";
import { Link, useHistory } from "react-router-dom";
import { IoIosCog } from "react-icons/io";
import Modal from "../Modal";
import { signOut } from "../../firebase";
import UserPosts from "./UserPosts";

export function User() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = user.name;
  }, [user]);

  return (
    <section id="User" className="content">
      <UserHeader />
      <UserPosts />
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
      <div className="UHname">
        <p style={{ fontSize: "1.75em", fontWeight: 700 }}>{user.username}</p>
        <IoIosCog
          style={{ height: "1.5em", width: "auto" }}
          onClick={() => setOpen(true)}
        />
      </div>
      <div className="UHbuttons">
        <Link to="/settings/edit">Edit Profile</Link>
      </div>
      <div className="UHbio">
        {user.name}
        {user.bio}
      </div>
      <div className="UHfollow">
        <div>
          <p style={{ fontWeight: 700 }}>{user.posts.length}&nbsp;</p>
          posts
        </div>
        <div>
          <p style={{ fontWeight: 700 }}>{user.followers.length}&nbsp;</p>
          followers
        </div>
        <div>
          <p style={{ fontWeight: 700 }}>{user.following.length}&nbsp;</p>
          following
        </div>
      </div>
      {open ? (
        <Modal setOpen={setOpen} content={<UserMenu setOpen={setOpen} />} />
      ) : null}{" "}
    </header>
  );
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
