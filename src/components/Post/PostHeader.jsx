import React, { useState, useContext } from "react";
import Modal from "../Modal";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Application";
import { deletePost } from "../../firebase";
import { MdMoreHoriz } from "react-icons/md";
import { UserLink } from "../User/UserExports";

export default function PostHeader({ user, post }) {
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
