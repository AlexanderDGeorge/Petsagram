import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { PostReactionDiv, InputLite, ColorButton } from "../StyledComponents";
import Emoji from "../Emoji";
import Modal from "../Modal";
import { addComment } from "../../firebase";
import { UserContext } from "../Application";
import { UserName } from "../User/UserExports";

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

    console.log(post.comments);

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

    function handleSubmit() {
        addComment(currentUser, post, comment);
    }

    return (
        <CommentMenu>
            {post.comments.map((comment, i) => (
                <CommentMenuItem key={i}>
                    <UserName username={comment.username} />
                    {comment.content}
                </CommentMenuItem>
            ))}
            <CommentMenuItem>
                <UserName username={currentUser.username} />
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
