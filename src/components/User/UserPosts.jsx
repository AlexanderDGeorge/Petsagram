import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getUserPost } from "../../firebase";

const UserPostsWrapper = styled.section`
    border-top: 1px solid var(--accent);
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-top: 2%;
`;

export default function UserPosts({ user }) {
    return (
        <UserPostsWrapper>
            {user.posts.map((post, i) => (
                <UserPost post={post} index={i} key={i} />
            ))}
        </UserPostsWrapper>
    );
}

const UserPostWrapper = styled(Link)`
    width: 32%;
    height: 0;
    cursor: pointer;
    padding-bottom: 32%;
    background-size: cover;
    background-position: 50%;
    &:hover {
        box-shadow: 0 0 3px 1px;
    }
`;

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
            <UserPostWrapper
                to={`/post/${userPost.id}`}
                className="UserPost"
                style={{ backgroundImage: `url(${userPost.url})`, margin }}
            />
        );
    } else return null;
}
