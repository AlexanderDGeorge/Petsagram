import React, { useContext, useEffect } from "react";
import { UserContext } from "../Application";
import { followUser, unfollowUser, getUserDoc } from "../../firebase";

export function UserResult({ result }) {
  const { user, setUser } = useContext(UserContext);

  return (
    <div id="UserResult">
      <div>
        <img src={result.photoURL} alt="" />
        {result.username}
      </div>
      <UserFollow user={user} setUser={setUser} result={result} />
    </div>
  );
}

export function UserFollow({ user, setUser, result }) {
  useEffect(() => {}, [user]);

  function isFollowing() {
    user.following.includes(result.uid);
  }

  async function handleClick() {
    if (isFollowing) {
      await followUser(user, result);
      const userDoc = await getUserDoc(user.uid);
      setUser(userDoc);
    } else {
      await unfollowUser(user, result);
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
