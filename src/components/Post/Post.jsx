import React, { useState, useContext, useEffect } from "react";
import Modal from "../Modal";
import { useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../Application";
import {
    addComment,
    addLike,
    removeLike,
    getUserPost,
    getUserDoc,
    deletePost,
} from "../../firebase";
import { MdMoreHoriz } from "react-icons/md";
import { UserLink } from "../User/UserExports";

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
    }, [pathname]);

    async function handleLike() {
        post.likes.includes(currentUser)
            ? await removeLike(currentUser, post)
            : await addLike(currentUser, post);
    }

    if (user && post) {
        return (
            <section className={pathname ? "Post content" : "Post"}>
                <PostHeader user={user} post={post} />
                <div
                    className="PostImg"
                    onDoubleClick={handleLike}
                    style={{ backgroundImage: `url(${post.url})` }}
                />
                <div className="PostInfo">
                    <PostLikes likes={post.likes} />
                    <PostCaption
                        caption={post.caption}
                        username={user.username}
                    />
                    <PostComments post={post} comments={post.comments} />
                </div>
            </section>
        );
    } else return null;
}

function PostHeader({ user, post }) {
    const { currentUser } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const history = useHistory();

    async function handleDelete() {
        await deletePost(post, user);
        history.replace(`/user/${user.username}`);
    }

    function PostOptions() {
        return (
            <div className="PostOptions">
                <button onClick={handleDelete}>Delete Post</button>
            </div>
        );
    }

    return (
        <header className="PostHeader">
            <UserLink user={user} />
            {currentUser.uid === user.uid ? (
                <MdMoreHoriz
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(true)}
                />
            ) : null}
            {open ? (
                <Modal setOpen={setOpen} content={<PostOptions />} />
            ) : null}
        </header>
    );
}

function PostLikes({ likes }) {
    const [open, setOpen] = useState(false);

    function Likes({ likes }) {
        return <div></div>;
    }

    return (
        <div className="PostLikes" onClick={() => setOpen(true)}>
            <p style={{ fontWeight: 700 }}>{`${likes.length} likes`}</p>
            {open ? (
                <Modal setOpen={setOpen} content={<Likes likes={likes} />} />
            ) : null}
        </div>
    );
}

function PostCaption({ caption, username }) {
    if (caption) {
        return (
            <div className="PostCaption">
                <p style={{ fontWeight: 700, marginRight: 2 }}>{username}</p>
                <p>{caption}</p>
            </div>
        );
    } else return null;
}

function PostComments({ comments, post }) {
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
