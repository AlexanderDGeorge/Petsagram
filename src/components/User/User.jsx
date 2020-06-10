import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Application";
import { Link, useHistory, useLocation } from "react-router-dom";
import { IoIosCog } from "react-icons/io";
import Modal from "../Modal";
import { signOut, getUserDoc, getExactUser } from "../../firebase";
import UserPosts from "./UserPosts";
import { UserResult, UserFollow } from "./UserExports";

export function User() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    (async function fetchUser() {
      const userDoc = await getExactUser(location.pathname.slice(6));
      setUser(userDoc[0]);
      document.title = userDoc[0].name;
    })();
  }, [location]);

  if (user) {
    return (
      <section id="User" className="content">
        <UserHeader user={user} />
        <UserPosts user={user} />
      </section>
    );
  } else {
    return null;
  }
}

function UserHeader({ user }) {
  const { currentUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);

  return (
    <header id="UserHeader">
      <img className="UHimg" src={user.photoURL} alt="" />
      <div className="UHname">
        <p style={{ fontSize: "1.75em", fontWeight: 700 }}>{user.username}</p>
        {currentUser.uid === user.uid ? (
          <IoIosCog
            style={{ height: "1.5em", width: "auto" }}
            onClick={() => {
              setOpen(true);
              setContent(<UserMenu setOpen={setOpen} />);
            }}
          />
        ) : null}
      </div>
      <div className="UHbuttons">
        {currentUser.uid === user.uid ? (
          <Link to="/settings/edit">Edit Profile</Link>
        ) : (
          <UserFollow user={user} />
        )}
      </div>
      <div className="UHbio">
        <div>{user.name}</div>
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
            setContent(<UserFollowers user={user} />);
          }}
        >
          <p style={{ fontWeight: 700 }}>{user.followers.length}&nbsp;</p>
          followers
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpen(true);
            setContent(<UserFollowing user={user} />);
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

function UserFollowing({ user }) {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    user.following.forEach((followee) => {
      getUserDoc(followee).then((res) => {
        setFollowing((following) => [...following, res]);
      });
    });
  }, [user]);

  return (
    <div id="UserFollowing">
      {following.map((followee, i) => {
        return <UserResult user={followee} key={i} />;
      })}
    </div>
  );
}

function UserFollowers({ user }) {
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
        return <UserResult user={follower} key={i} />;
      })}
    </div>
  );
}
