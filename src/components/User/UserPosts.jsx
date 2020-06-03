import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../Application";
import { getUserPost } from "../../firebase";

export default function UserPosts() {
  const { user } = useContext(UserContext);

  return (
    <section id="UserPosts">
      {user.posts.map((post, i) => (
        <UserPost post={post} key={i} />
      ))}
    </section>
  );
}

function UserPost({ post }) {
  const [userPost, setUserPost] = useState(null);

  useEffect(() => {
    async function getPost() {
      const userPost = await getUserPost(post);
      setUserPost(userPost);
    }
    getPost();
  }, [post]);

  console.log(userPost);

  function BlankSquare() {
    return <div className="Blank Square"></div>;
  }

  if (userPost) {
    return <img id="UserPost" src={userPost.url} alt="" />;
  } else {
    return <BlankSquare />;
  }
}

function UserAddPost() {
  return <div id="UserAddPost"></div>;
}
