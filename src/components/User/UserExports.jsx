import React, { useContext } from "react";
import { UserContext } from "../Application";
import { followUser, unfollowUser, getUserDoc } from "../../firebase";
import {
    PlainLink,
    HorizontalListItem,
    ColorButton,
} from "../StyledComponents";

export function UserPhoto({ photo, size = "25px" }) {
    const style = {
        height: size,
        minHeight: size,
        width: size,
        minWidth: size,
        backgroundImage: `url(${photo})`,
        backgroundPosition: "50%",
        backgroundSize: "cover",
        borderRadius: "50%",
        gridArea: "UserPhoto",
    };

    return <div style={style}></div>;
}

export function UserName({ username }) {
    return <PlainLink to={`/user/${username}`}>{username}</PlainLink>;
}

export function UserLink({ user }) {
    return (
        <PlainLink to={`/user/${user.username}`}>
            <UserPhoto photo={user.photoURL} />
            <p style={{ marginLeft: 10 }}>{user.username}</p>
        </PlainLink>
    );
}

export function UserListItem({ user }) {
    return (
        <HorizontalListItem>
            <UserLink user={user} />
            <UserFollowButton user={user} />
        </HorizontalListItem>
    );
}

export function UserFollowButton({ user }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    function canFollow() {
        return currentUser.following.includes(user.uid);
    }

    async function handleClick() {
        if (canFollow()) {
            await unfollowUser(currentUser, user);
            const userDoc = await getUserDoc(currentUser.uid);
            setCurrentUser(userDoc);
        } else {
            await followUser(currentUser, user);
            const userDoc = await getUserDoc(currentUser.uid);
            setCurrentUser(userDoc);
        }
    }

    return (
        <ColorButton onClick={handleClick}>
            {canFollow() ? "unfollow" : "follow"}
        </ColorButton>
    );
}
