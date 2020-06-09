import React, { useState, useContext, useEffect } from "react";
import Modal from "../Modal";
import { UserContext } from "../Application";
import { addComment } from "../../firebase";

export default function Post({ post, user }) {
  console.log(post);
  console.log(user);
  return (
    <section className="Post">
      <header className="PostHeader">
        <img src={user.photoURL} alt="" />
        <p style={{ fontWeight: 700 }}>{user.username}</p>
      </header>
      <img className="PostImg" src={post.url} alt="" />
      <div className="PostInfo">
        <PostLikes likes={post.likes} />
        <PostCaption caption={post.caption} username={user.username} />
        <PostComments post={post} comments={post.comments} />
      </div>
    </section>
  );
}

function PostLikes({ likes }) {
  const [open, setOpen] = useState(false);

  function Likes() {
    // this function should show users who have liked a photo
  }

  return (
    <div className="PostLikes" onClick={() => setOpen(true)}>
      <p style={{ fontWeight: 700 }}>{`${likes.length} likes`}</p>
      {open ? <Modal setOpen={setOpen} content={<Likes />} /> : null}
    </div>
  );
}

function PostCaption({ caption, username }) {
  return (
    <div className="PostCaption">
      <p style={{ fontWeight: 700, marginRight: 2 }}>{username}</p>
      <p>{caption}</p>
    </div>
  );
}

function PostComments({ comments, post }) {
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("keypress", handleCommentSubmit);
    return () => {
      window.removeEventListener("keypress", handleCommentSubmit);
    };
  });

  async function handleCommentSubmit(e) {
    if (e.keyCode === 13) {
      await addComment(currentUser, post, newComment);
    }
  }

  return (
    <div className="PostComments">
      {comments.map((comment, i) => {
        return (
          <div className="PostComment" key={i}>
            <p style={{ fontWeight: 700 }}>{comment.username}</p>
            <p>{comment.content}</p>
          </div>
        );
      })}
      <div className="AddComment">
        <p style={{ fontWeight: 700, marginRight: 2 }}>
          {currentUser.username}
        </p>
        <input
          style={{ background: "transparent", fontSize: "1em" }}
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment"
        />
      </div>
    </div>
  );
}
