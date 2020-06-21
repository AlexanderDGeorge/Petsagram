import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import { PostReactionDiv, InputLite, ColorButton } from "../StyledComponents";
import Emoji from "../Emoji";
import Modal from "../Modal";
import { firestore, fieldValue } from "../../firebase";
import { UserContext } from "../Application";
import { UserLink } from "../User/UserExports";

const CommentMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 700px;
    max-width: 700px;
    padding: 2%;
    font-size: 1em;
    @media screen and (max-width: 500px) {
        width: 300px;
    }
    @media screen and (min-width: 501px) {
        width: 500px;
    }
`;

const CommentMenuItem = styled.div`
    height: 50px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.accent};
    display: flex;
    align-items: center;
    > a {
        margin-right: 5px;
    }
    > input {
        width: 60%;
    }
    > svg {
        margin-left: auto;
    }
`;

export default function PostComments({ post }) {
    const [open, setOpen] = useState(false);

    return (
        <PostReactionDiv
            onClick={() => setOpen(true)}
            style={{ backgroundColor: "transparent" }}
        >
            <Emoji emoji={"💬"} size={"0.8em"} />
            <p>{post.comments.length}</p>
            {open ? (
                <Modal setOpen={setOpen} content={<Comments post={post} />} />
            ) : null}
        </PostReactionDiv>
    );
}

function Comments({ post }) {
    const [comment, setComment] = useState("");
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        window.addEventListener("keypress", handleEnter);
        return () => {
            window.removeEventListener("keypress", handleEnter);
        };
    });

    function handleEnter(e) {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    }

    async function handleSubmit() {
        try {
            const postRef = firestore.collection("user-posts").doc(post.id);
            await postRef.update({
                comments: fieldValue.arrayUnion({
                    user: currentUser.uid,
                    content: comment,
                }),
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete(comment) {
        try {
            const postRef = firestore.collection("user-posts").doc(post.id);
            await postRef.update({
                comments: fieldValue.arrayRemove(comment),
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <CommentMenu>
            {post.comments.map((comment, i) => (
                <CommentMenuItem key={i}>
                    <UserLink uid={comment.user} />
                    {comment.content}
                    {comment.user === currentUser.uid ? (
                        <AiOutlineDelete
                            onClick={() => handleDelete(comment)}
                        />
                    ) : null}
                </CommentMenuItem>
            ))}
            <CommentMenuItem>
                <UserLink uid={currentUser.uid} />
                <InputLite
                    type="text"
                    placeholder="Write a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </CommentMenuItem>
            {comment.length > 0 ? (
                <ColorButton onClick={handleSubmit}>Add Comment</ColorButton>
            ) : null}
        </CommentMenu>
    );
}
