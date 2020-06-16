import React, { useContext, useState, useEffect } from "react";
import { PostReactionDiv } from "../StyledComponents";
import Emoji from "../Emoji";
import { UserContext } from "../Application";
import { addLike, removeLike } from "../../firebase";

export default function PostLikes({ post }) {
    const { currentUser } = useContext(UserContext);
    const [liked, setLiked] = useState(post.likes.includes(currentUser.uid));
    const [likes, setLikes] = useState(post.likes.length);

    useEffect(() => {
        return () => {
            liked ? addLike(currentUser, post) : removeLike(currentUser, post);
        };
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
            <Emoji emoji={"❤️"} size={"0.8em"} />
            <p>{likes}</p>
        </PostReactionDiv>
    );
}
