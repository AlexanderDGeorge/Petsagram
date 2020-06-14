import React, { useState, useContext } from "react";
import Modal from "../Modal";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Application";
import { deletePost } from "../../firebase";
import { MdMoreHoriz } from "react-icons/md";
import { UserLink } from "../User/UserExports";
import { Menu, MenuItem, PostInfoWrapper } from "../StyledComponents";

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
            <Menu>
                <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
            </Menu>
        );
    }

    return (
        <PostInfoWrapper>
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
        </PostInfoWrapper>
    );
}
