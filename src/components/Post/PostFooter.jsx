import React from "react";
import styled from "styled-components";
import { PostInfoWrapper } from "../StyledComponents";
import PostCaption from "./PostCaption";
import PostLikes from "./PostLikes";
import PostComments from "./PostComments";
import PostReactions from "./PostReactions";

const Div = styled.div`
    display: flex;
    align-items: center;
    overflow-x: scroll;
`;

export default function PostFooter({ post }) {
    return (
        <PostInfoWrapper>
            <PostCaption post={post} />
            <Div>
                {post.reactionsOn ? <PostLikes post={post} /> : null}
                {post.commentsOn ? <PostComments post={post} /> : null}
                {/* {post.reactionsOn ? <PostReactions post={post} /> : null} */}
            </Div>
        </PostInfoWrapper>
    );
}
