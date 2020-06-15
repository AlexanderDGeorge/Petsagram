import React, { useContext, useState, useEffect } from "react";
import { PostReactionDiv } from "../StyledComponents";
import Emoji from "../Emoji";
import { UserContext } from "../Application";

export default function PostReactions({ post }) {
    return (
        <div>
            {post.reactions.map((reaction) => (
                <PostReaction reaction={reaction} />
            ))}
            <AddReaction />
        </div>
    );
}

function PostReaction({ reaction }) {
    const { currentUser } = useContext(UserContext);
    const [liked, setLiked] = useState(reaction.includes(currentUser.uid));
    const [likes, setLikes] = useState(reaction.length);

    useEffect(() => {
        return () => {};
    });

    function handleClick() {
        liked ? setLikes(likes - 1) : setLikes(likes + 1);
        setLiked(!liked);
    }

    return (
        <PostReactionDiv
            onClick={handleClick}
            style={liked ? {} : { backgroundColor: "transparent" }}
        >
            <Emoji emoji={reaction.emoji} size={"0.8em"} />
            <p>{likes}</p>
        </PostReactionDiv>
    );
}

function AddReaction() {
    return (
        <PostReactionDiv style={{ backgroundColor: "transparent" }}>
            <Emoji emoji={"😀"} size={"0.8em"} />
            <p>+</p>
        </PostReactionDiv>
    );
}
