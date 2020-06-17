import React, { useEffect, useState, useContext } from "react";
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
    const [limit] = useState(3);
    const [data, setData] = useState([]);
    const [queues, setQueues] = useState(0);

    console.log(data);

    useEffect(() => {
        fetchPosts();
        document.title = "Petsagram";
    }, []);

    useEffect(() => {
        const postWindow = document.getElementById("PostFeed");
        postWindow.addEventListener("scroll", handleScroll);
        return () => {
            postWindow.removeEventListener("scroll", handleScroll);
        };
    }, [data, queues]);

    function handleScroll(e) {
        const position = e.target.scrollTop;
        const height = e.target.scrollHeight - e.target.clientHeight;
        if (position === height && data.length === limit * queues) {
            setQueues((queues) => queues + 1);
            fetchMorePosts();
        }
    }

    function fetchPosts() {
        const postsQuery = firestore
            .collection("user-posts")
            .where("user", "in", [currentUser.uid, ...currentUser.following])
            .orderBy("createdAt", "desc")
            .limit(limit);
        handleQuery(postsQuery);
        setQueues(queues + 1);
    }

    function fetchMorePosts() {
        const postsQuery = firestore
            .collection("user-posts")
            .where("user", "in", [currentUser.uid, ...currentUser.following])
            .orderBy("createdAt", "desc")
            .startAfter(data[data.length - 1].createdAt)
            .limit(limit);
        handleQuery(postsQuery);
    }

    function handleQuery(postsQuery) {
        postsQuery.onSnapshot((posts) => {
            posts.docChanges().forEach((change) => {
                if (change.type === "added") {
                    setData((data) => [
                        ...data,
                        { id: change.doc.id, ...change.doc.data() },
                    ]);
                }
                if (change.type === "modified") {
                    setData((data) =>
                        data.map((post) =>
                            post.id === change.doc.id
                                ? {
                                      id: change.doc.id,
                                      ...change.doc.data(),
                                  }
                                : post
                        )
                    );
                }
                if (change.type === "removed") {
                    setData((data) =>
                        data.filter((post) => post.id !== change.doc.id)
                    );
                }
            });
        });
    }

    return (
        <HomeSection id="PostFeed">
            {data.map((post, i) => (
                <Post post={post} key={i} />
            ))}
            <Loader />
        </HomeSection>
    );
}
