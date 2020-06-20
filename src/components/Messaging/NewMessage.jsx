import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { MdArrowUpward } from "react-icons/md";
import { UserContext } from "../Application";
import { firestore, fieldValue } from "../../firebase";

const MessageDiv = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    min-height: 40px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${(props) => props.theme.accent};

    > svg {
        width: 25px;
        height: auto;
        border: 1px solid ${(props) => props.theme.accent};
        border-radius: 50%;
    }
`;

const MessageInput = styled.input`
    width: 90%;
    min-height: 30px;
    padding: 10px;
    font-size: 1em;
    border-radius: 20px;
    color: black;
`;

const MessageSend = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.accent};
`;

export default function NewMessage({ chat }) {
    const [message, setMessage] = useState("");
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        function handleKey(e) {
            if (e.keyCode === 13) {
                handleSend();
            }
        }
        window.addEventListener("keypress", handleKey);
        return () => {
            window.removeEventListener("keypress", handleKey);
        };
    });

    async function handleSend() {
        if (message.length) {
            const chatRef = firestore.collection("chats").doc(chat.id);
            await chatRef.update({
                messages: fieldValue.arrayUnion({
                    user: currentUser.uid,
                    content: message,
                    createdAt: new Date(),
                }),
            });
            setMessage("");
        }
    }

    return (
        <MessageDiv>
            <MessageInput
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoFocus
            />
            <MessageSend
                onClick={handleSend}
                style={message ? { backgroundColor: "var(--mmain)" } : {}}
            >
                <MdArrowUpward />
            </MessageSend>
        </MessageDiv>
    );
}
