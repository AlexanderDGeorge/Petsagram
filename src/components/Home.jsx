import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";
import { UserContext } from "./Application";
import Post from "./Post/Post";
import Loader from "./Loader";

const HomeSection = styled.section`
    height: 100%;
    width: 100%;
    max-width: 700px;
    padding: 2%;
    overflow-y: scroll;
    align-self: center;
    background-color: ${(props) => props.theme.light};
`;

export default function Home() {
    const { currentUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const queues = useRef(null);
    const limit = 3;

    useEffect(() => {
        document.title = "Petsagram";
        fetchPosts();
    }, []);

    useEffect(() => {
        async function handleScroll(e) {
            const position = e.target.scrollTop;
            const height = e.target.scrollHeight - e.target.clientHeight;
            if (
                position === height &&
                posts.length === limit * queues.current
            ) {
                queues.current++;
                setLoading(true);
                const postsRef = await firestore
                    .collection("user-posts")
                    .where("user", "in", [
                        currentUser.uid,
                        ...currentUser.following,
                    ])
                    .orderBy("createdAt", "desc")
                    .startAfter(posts[posts.length - 1].createdAt)
                    .limit(limit)
                    .get();
                const incomingPosts = [
                    ...posts,
                    ...postsRef.docs.map((post) => ({
                        id: post.id,
                        ...post.data(),
                    })),
                ];
                setPosts(incomingPosts);
            }
        }

        const postFeed = document.getElementById("PostFeed");
        postFeed.addEventListener("scroll", handleScroll);
        return () => {
            postFeed.removeEventListener("scroll", handleScroll);
        };
    }, [currentUser, posts, queues]);

    async function fetchPosts() {
        setLoading(true);
        queues.current++;
        const postsRef = await firestore
            .collection("user-posts")
            .where("user", "in", [currentUser.uid, ...currentUser.following])
            .orderBy("createdAt", "desc")
            .limit(limit)
            .get();
        const incomingPosts = postsRef.docs.map((post) => ({
            id: post.id,
            ...post.data(),
        }));
        setPosts(incomingPosts);
        setLoading(false);
    }

    return (
        <HomeSection id="PostFeed">
            {posts.map((post, i) => (
                <Post postId={post.id} key={i} />
            ))}
            {loading ? <Loader /> : null}
            <div
                style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "var(--accent)",
                }}
            >
                End of Feed
            </div>
        </HomeSection>
    );
}
