import React, { useEffect } from "react";
import { HorizontalWrapper } from "../StyledComponents";
import MessagingNav from "./MessagingNav";
import { Switch } from "react-router-dom";

export default function Messaging() {
    useEffect(() => {
        document.title = "Messaging";
    }, []);
    return (
        <HorizontalWrapper>
            <MessagingNav />
            <Switch></Switch>
        </HorizontalWrapper>
    );
}
