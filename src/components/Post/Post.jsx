import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Application";
import { addLike, removeLike, getUserPost, getUserDoc } from "../../firebase";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const PostWrapper = styled.section`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: 100%;
    max-width: 700px;
    height: max-content;
    background-color: ${(props) => props.theme.white};
    margin: 2%;
    border: 1px solid ${(props) => props.theme.accent};
    font-size: 1.3em;
`;

export default function Post(props) {
    const { currentUser } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(props.post);
    const pathname = useLocation().pathname.slice(6);

    useEffect(() => {
        if (!post) {
            (async function fetchData() {
                const postDoc = await getUserPost(pathname);
                setPost(postDoc);
                setUser(await getUserDoc(postDoc.user));
            })();
        } else {
            (async function fetchUser() {
                setUser(await getUserDoc(post.user));
            })();
        }
    }, [pathname, post]);

    async function handleLike() {
        post.likes.includes(currentUser)
            ? await removeLike(currentUser, post)
            : await addLike(currentUser, post);
    }

    if (user && post) {
        return (
            <PostWrapper>
                <PostHeader user={user} post={post} />
                <div
                    className="PostImg"
                    onDoubleClick={handleLike}
                    style={{
                        backgroundImage: `url(${post.url})`,
                    }}
                />

                <PostFooter post={post} />
            </PostWrapper>
        );
    } else return null;
}
