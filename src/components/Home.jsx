import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";
import { UserContext } from "./Application";
import Post from "./Post/Post";
import Loader from "./Loader";
import { useReducer } from "react";

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
    const [limit] = useState(3);
    const [loading, setLoading] = useState(false);
    const [queues, setQueues] = useState(0);
    const [posts, dispatch] = useReducer(reducer, []);
    const unsubscribe = useRef(null);

    useEffect(() => {
        document.title = "Petsagram";
        unsubscribe.current = fetchPosts();
        return () => {
            unsubscribe.current();
        };
    }, []);

    useEffect(() => {
        const postWindow = document.getElementById("PostFeed");
        postWindow.addEventListener("scroll", handleScroll);
        return () => {
            postWindow.removeEventListener("scroll", handleScroll);
        };
    }, [posts, queues]);

    function reducer(posts, action) {
        const newPost = action.doc;
        switch (action.type) {
            case "added":
                let addedPosts = [
                    ...posts,
                    { id: newPost.id, ...newPost.data() },
                ];
                return addedPosts;
            case "modified":
                let modifiedPosts = posts.map((post) =>
                    post.id === newPost.id
                        ? {
                              id: newPost.id,
                              ...newPost.data(),
                          }
                        : post
                );
                return modifiedPosts;
            case "removed":
                console.log(newPost);
                let removedPosts = posts.filter(
                    (post) => post.id !== newPost.id
                );
                return removedPosts;
            default:
                throw new Error();
        }
    }

    function handleScroll(e) {
        const position = e.target.scrollTop;
        const height = e.target.scrollHeight - e.target.clientHeight;
        if (position === height && posts.length === limit * queues) {
            setQueues((queues) => queues + 1);
            unsubscribe.current = fetchMorePosts();
        }
    }

    function fetchPosts() {
        setQueues(queues + 1);
        return firestore
            .collection("user-posts")
            .where("user", "in", [currentUser.uid, ...currentUser.following])
            .orderBy("createdAt", "desc")
            .limit(limit)
            .onSnapshot((snapshot) => {
                if (snapshot.size) {
                    setLoading(true);
                    handleQuery(snapshot);
                } else {
                    setLoading(false);
                }
            });
    }

    function fetchMorePosts() {
        return firestore
            .collection("user-posts")
            .where("user", "in", [currentUser.uid, ...currentUser.following])
            .orderBy("createdAt", "desc")
            .startAfter(posts[posts.length - 1].createdAt)
            .limit(limit)
            .onSnapshot((snapshot) => {
                if (snapshot.size) {
                    setLoading(true);
                    handleQuery(snapshot);
                } else {
                    setLoading(false);
                }
            });
    }

    function handleQuery(posts) {
        posts.docChanges().forEach((change) => {
            try {
                dispatch(change);
            } catch (error) {
                console.error(error);
            }
        });
    }

    return (
        <HomeSection id="PostFeed">
            {posts.map((post, i) => (
                <Post post={post} key={i} />
            ))}
            {loading ? <Loader /> : null}
        </HomeSection>
    );
}
