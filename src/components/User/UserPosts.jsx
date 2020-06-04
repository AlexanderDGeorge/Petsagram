import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../Application";
import { getUserPost } from "../../firebase";

export default function UserPosts() {
  const { user } = useContext(UserContext);

  return (
    <section id="UserPosts">
      {user.posts.map((post, i) => (
        <UserPost post={post} index={i} key={i} />
      ))}
    </section>
  );
}

function UserPost({ post, index }) {
  const [userPost, setUserPost] = useState(null);

  useEffect(() => {
    async function getPost() {
      const userPost = await getUserPost(post);
      setUserPost(userPost);
    }
    getPost();
  }, [post]);

  if (userPost) {
    const height = document.getElementById("User").clientWidth * 0.32;
    const margin = index % 3 === 1 ? "0 2%" : "0";
    return (
      <img id="UserPost" src={userPost.url} alt="" style={{ height, margin }} />
    );
  } else {
    return null;
  }
}
