import React, { useEffect, useState } from "react";
import { getUserPost } from "../../firebase";
import Modal from "../Modal";
import Post from "../Post/Post";

export default function UserPosts({ user }) {
  return (
    <section id="UserPosts">
      {user.posts.map((post, i) => (
        <UserPost post={post} user={user} index={i} key={i} />
      ))}
    </section>
  );
}

function UserPost({ post, user, index }) {
  const [userPost, setUserPost] = useState(null);
  const [open, setOpen] = useState(false);

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
      <div className="UserPost" onClick={() => setOpen(true)}>
        <img src={userPost.url} alt="" style={{ height, margin }} />
        {open ? (
          <Modal
            setOpen={setOpen}
            content={<Post post={userPost} user={user} />}
          />
        ) : null}
      </div>
    );
  } else {
    return null;
  }
}
