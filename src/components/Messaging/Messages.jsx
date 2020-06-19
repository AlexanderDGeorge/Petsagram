import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { firestore } from "../../firebase";
import { useLocation } from "react-router-dom";
import { FullNavContent } from "../StyledComponents";
import NewMessage from "./NewMessage";
import { UserContext } from "../Application";
import Loader from "../Loader";

const SentMessageBubble = styled.div`
    min-height: 30px;
    max-width: 80%;
    padding: 10px;
    border-radius: 20px;
    align-self: flex-end;
    background-color: ${(props) => props.theme.blue};
    color: white;
`;

const ReceivedMessageBubble = styled.div`
    min-height: 30px;
    max-width: 80%;
    padding: 10px;
    border-radius: 20px;
    align-self: flex-start;
    background-color: ${(props) => props.theme.dark};
    color: ${(props) => props.theme.white};
`;

export default function Messages() {
    const pathname = useLocation().pathname.slice(11);
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = firestore
            .collection("chats")
            .doc(pathname)
            .onSnapshot((snapshot) => {
                setChat(snapshot.data());
            });
        return () => {
            unsubscribe();
        };
    }, [pathname]);

    if (chat) {
        return (
            <FullNavContent>
                {chat.messages.map((message, i) => {
                    if (message.user === currentUser.uid) {
                        return (
                            <SentMessageBubble key={i}>
                                {message.content}
                            </SentMessageBubble>
                        );
                    } else {
                        return (
                            <ReceivedMessageBubble key={i}>
                                {message.content}
                            </ReceivedMessageBubble>
                        );
                    }
                })}
                <NewMessage chat={{ id: pathname, chat }} />
            </FullNavContent>
        );
    } else return <Loader />;
}
