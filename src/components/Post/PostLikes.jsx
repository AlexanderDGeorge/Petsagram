import React, { useContext, useState } from "react";
import { PostReactionDiv } from "../StyledComponents";
import Emoji from "../Emoji";
import { UserContext } from "../Application";
import { addLike, removeLike } from "../../firebase";

export default function PostLikes({ post }) {
    const { currentUser } = useContext(UserContext);
    const [liked] = useState(post.likes.includes(currentUser.uid));
    const [likes] = useState(post.likes.length);

    function handleClick() {
        liked ? removeLike(currentUser, post) : addLike(currentUser, post);
    }

    return (
        <PostReactionDiv
            onClick={handleClick}
            style={liked ? {} : { backgroundColor: "transparent" }}
        >
            <Emoji emoji={"❤️"} size={"0.8em"} />
            <p>{likes}</p>
        </PostReactionDiv>
    );
}
