import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Application";
import { addLike, removeLike, getUserPost, getUserDoc } from "../../firebase";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const PostSection = styled.section`
    min-width: 300px;
    width: 100%;
    max-width: 700px;
    background-color: ${(props) => props.theme.white};
    margin: 2% 0;
    border: 1px solid ${(props) => props.theme.accent};
    font-size: 1.3em;
`;

const PostImg = styled.div`
    min-width: 300px;
    width: 100%;
    max-width: 700px;
    padding-bottom: 100%;
    background-size: cover;
    background-position: 50%;
    box-sizing: content-box;
    &:after {
        content: "";
    }
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
            <PostSection>
                <PostHeader user={user} post={post} />
                <PostImg
                    onDoubleClick={handleLike}
                    style={{
                        backgroundImage: `url(${post.url})`,
                    }}
                ></PostImg>
                <PostFooter post={post} />
            </PostSection>
        );
    } else return null;
}
