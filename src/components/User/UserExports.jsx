import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Application";
import { followUser, unfollowUser, getUserDoc } from "../../firebase";

export function UserBubble() {
  const { user } = useContext(UserContext);

  return (
    <Link to="/user" id="UserBubble">
      <img id="UserPhoto" src={user.photoURL} alt="" />
    </Link>
  );
}

export function UserResult({ result }) {
  return (
    <div id="UserResult">
      <div>
        <img src={result.photoURL} alt="" />
        <p>{result.username}</p>
      </div>
      <UserFollow result={result} />
    </div>
  );
}

export function UserFollow({ result }) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {}, [user]);

  function isFollowing() {
    return user.following.includes(result.uid);
  }

  async function handleClick() {
    if (isFollowing()) {
      await unfollowUser(user, result);
      const userDoc = await getUserDoc(user.uid);
      setUser(userDoc);
    } else {
      await followUser(user, result);
      const userDoc = await getUserDoc(user.uid);
      setUser(userDoc);
    }
  }

  if (user !== result) {
    return (
      <button className="UserFollow" onClick={handleClick}>
        {isFollowing() ? "unfollow" : "follow"}
      </button>
    );
  } else {
    return null;
  }
}
