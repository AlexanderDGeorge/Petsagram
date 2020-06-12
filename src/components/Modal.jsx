import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.4);
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Modal({ setOpen, content }) {
    return (
        <ModalWrapper>
            <ModalContent content={content} setOpen={setOpen} />
        </ModalWrapper>
    );
}

const ModalContentWrapper = styled.div`
    min-height: 60px;
    min-width: 260px;
    border: 1px solid ${(props) => props.theme.mid};
    border-radius: 10px;
    background: ${(props) => props.theme.light};
    overflow: hidden;
`;

function ModalContent({ content, setOpen }) {
    const contentRef = useRef(null);

    useEffect(() => {
        window.addEventListener("mousedown", handleClick);
        function handleClick(e) {
            if (!contentRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        return () => {
            window.removeEventListener("mousedown", handleClick);
        };
    }, [contentRef, setOpen]);

    return (
        <ModalContentWrapper ref={contentRef}>{content}</ModalContentWrapper>
    );
}
