import React, { useEffect } from "react";
import { HorizontalWrapper } from "../StyledComponents";
import MessagingNav from "./MessagingNav";
import { Switch, Route } from "react-router-dom";
import NewChat from "./NewChat";
import Messages from "./Messages";

export default function Messaging() {
    useEffect(() => {
        document.title = "Messaging";
    }, []);
    return (
        <HorizontalWrapper>
            <MessagingNav />
            <Switch>
                <Route path="/messaging/new" component={NewChat} />
                <Route path="/messaging/:id" component={Messages} />
            </Switch>
        </HorizontalWrapper>
    );
}
