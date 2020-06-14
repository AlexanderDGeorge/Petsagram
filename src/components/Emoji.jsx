import React from "react";
import styled from "styled-components";

const ReactionWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${(props) => props.theme.mid};
    border: 1px solid ${(props) => props.theme.accent};
`;

export default function Emoji({ emoji, size = 25 }) {
    return (
        <span role="img" aria-label="" style={{ fontSize: size }}>
            {emoji}
        </span>
    );
}

export function EmojiReaction({ reaction }) {
    return (
        <ReactionWrapper>
            <Emoji emoji={reaction.emoji} />
            <p>{reaction}</p>
        </ReactionWrapper>
    );
}
