import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, useTransition, animated } from "react-spring";

const Message = styled(animated.div)`
    position: fixed;
    height: 100px;
    width: 300px;
    background: ${(props) => props.theme.dark};
    color: ${(props) => props.theme.white};
    bottom: 20px;
    right: 20px;
    padding: 20px;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        box-shadow: 0 0 5px 0;
    }
`;

export default function Notification({ message, onClick, setNotify }) {
    const [toggle, setToggle] = useState(false);
    const [box, setBox] = useSpring(() => ({
        opacity: 1,
    }));
    const transitions = useTransition(toggle, null, {
        from: {
            position: "absolute",
            bottom: -1,
            left: -1,
            height: 5,
            width: 0,
            background: "var(--mmain)",
        },
        enter: { width: 0 },
        leave: { width: 300 },
    });

    function handleHover() {
        setBox({ scale: 1.1, shadow: 15 });
        setToggle(true);
        setTimeout(() => {
            setBox({ opacity: 0 });
            setNotify(false);
        }, 1000);
    }

    return (
        <Message style={box} onClick={onClick} onMouseEnter={handleHover}>
            {message}
            {transitions.map(({ key, item, props }) => (
                <animated.div style={props} key={key} />
            ))}
        </Message>
    );
}
