import React, { useEffect, useState } from "react";
import { getUserPost } from "../../firebase";
import { Link } from "react-router-dom";

export default function UserPosts({ user }) {
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
    const margin = index % 3 === 1 ? "0 2%" : "0";
    return (
      <Link
        to={`/post/${userPost.id}`}
        className="UserPost"
        style={{ backgroundImage: `url(${userPost.url})`, margin }}
      ></Link>
    );
  } else {
    return null;
  }
}
