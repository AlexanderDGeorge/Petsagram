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
    window.post = post;
    return (
        <PostInfoWrapper>
            <PostCaption post={post} />
            <Div>
                <PostLikes post={post} />
                <PostComments post={post} />
                {/* <PostReactions post={post} /> */}
            </Div>
        </PostInfoWrapper>
    );
}
