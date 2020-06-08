import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Application";
import { followUser, unfollowUser, getUserDoc } from "../../firebase";

export function UserBubble() {
  const { currentUser } = useContext(UserContext);

  return (
    <Link to={`/user/${currentUser.username}`} id="UserBubble">
      <img id="UserPhoto" src={currentUser.photoURL} alt="" />
    </Link>
  );
}

export function UserResult({ user }) {
  return (
    <div id="UserResult">
      <Link to={`/user/${user.username}`}>
        <img src={user.photoURL} alt="" />
        <p>{user.username}</p>
      </Link>
      <UserFollow user={user} />
    </div>
  );
}

export function UserFollow({ user }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  function isFollowing() {
    return currentUser.following.includes(user.uid);
  }

  async function handleClick() {
    if (isFollowing()) {
      await unfollowUser(currentUser, user);
      const userDoc = await getUserDoc(currentUser.uid);
      setCurrentUser(userDoc);
    } else {
      await followUser(currentUser, user);
      const userDoc = await getUserDoc(currentUser.uid);
      setCurrentUser(userDoc);
    }
  }

  if (currentUser !== user) {
    return (
      <button className="UserFollow" onClick={handleClick}>
        {isFollowing() ? "unfollow" : "follow"}
      </button>
    );
  } else {
    return null;
  }
}
