import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Application";
import { addComment } from "../../firebase";
import { MdMoreHoriz } from "react-icons/md";

export function PostCaption({ caption, username }) {
    if (caption) {
        return (
            <div className="PostCaption">
                <p style={{ fontWeight: 700, marginRight: 2 }}>{username}</p>
                <p>{caption}</p>
            </div>
        );
    } else return null;
}

export default function PostComments({ comments, post }) {
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
                        <MdMoreHoriz />
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
