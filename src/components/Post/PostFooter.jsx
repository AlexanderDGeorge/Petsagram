import React from "react";
import { PostInfoWrapper } from "../StyledComponents";
import PostCaption from "./PostCaption";
import PostReactions from "./PostReactions";

export default function PostFooter({ post }) {
    window.post = post;
    return (
        <PostInfoWrapper>
            <PostCaption post={post} />
            <PostReactions post={post} />
        </PostInfoWrapper>
    );
}
