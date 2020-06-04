import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Application";
import { Link, useHistory } from "react-router-dom";
import { IoIosCog } from "react-icons/io";
import Modal from "../Modal";
import { signOut, getUserDoc } from "../../firebase";
import UserPosts from "./UserPosts";
import { UserResult } from "./UserExports";

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

function UserHeader() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);

  const { user } = useContext(UserContext);

  return (
    <header id="UserHeader">
      <img className="UHimg" src={user.photoURL} alt="" />
      <div className="UHname">
        <p style={{ fontSize: "1.75em", fontWeight: 700 }}>{user.username}</p>
        <IoIosCog
          style={{ height: "1.5em", width: "auto" }}
          onClick={() => {
            setOpen(true);
            setContent(<UserMenu setOpen={setOpen} />);
          }}
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
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpen(true);
            setContent(<UserFollowers />);
          }}
        >
          <p style={{ fontWeight: 700 }}>{user.followers.length}&nbsp;</p>
          followers
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpen(true);
            setContent(<UserFollowing />);
          }}
        >
          <p style={{ fontWeight: 700 }}>{user.following.length}&nbsp;</p>
          following
        </div>
      </div>
      {open ? <Modal setOpen={setOpen} content={content} /> : null}{" "}
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

function UserFollowing() {
  const { user } = useContext(UserContext);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    user.following.forEach((followee) => {
      getUserDoc(followee).then((res) => {
        setFollowing((following) => [...following, res]);
      });
    });
  }, [following, user]);

  return (
    <div id="UserFollowing">
      {user.following.map((followee, i) => {
        return <UserResult result={followee} key={i} />;
      })}
    </div>
  );
}

function UserFollowers() {
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    user.followers.forEach((follower) => {
      getUserDoc(follower).then((res) => {
        setFollowers((followers) => [...followers, res]);
      });
    });
  }, [user]);

  return (
    <div id="UserFollowing">
      {followers.map((follower, i) => {
        return <UserResult result={follower} key={i} />;
      })}
    </div>
  );
}
