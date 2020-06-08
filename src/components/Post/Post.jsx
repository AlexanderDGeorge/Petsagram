import React, { useState, useContext } from "react";
import Modal from "../Modal";
import { UserContext } from "../Application";

export default function Post({ post, user }) {
  console.log(post);
  console.log(user);
  return (
    <div className="Post">
      <header className="PostHeader">
        <img src={user.photoURL} alt="" />
        <p style={{ fontWeight: 700 }}>{user.username}</p>
      </header>
      <img className="PostImg" src={post.url} alt="" />
      <div className="PostInfo">
        <PostLikes likes={post.likes} />
        <PostCaption caption={post.caption} username={user.username} />
        <PostComments comments={post.comments} />
      </div>
    </div>
  );
}

function PostLikes({ likes }) {
  const [open, setOpen] = useState(false);

  function Likes() {}

  return (
    <div className="PostLikes" onClick={() => setOpen(true)}>
      {`${likes.length} likes`}
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

function PostComments({ comments }) {
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useContext(UserContext);

  return (
    <div className="PostComments">
      {comments.map((comment) => {
        return (
          <div className="PostComment">
            <p>{comment.username}</p>
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
