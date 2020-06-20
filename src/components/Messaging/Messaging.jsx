import React, { useEffect } from "react";
import { HorizontalWrapper } from "../StyledComponents";
import MessagingNav from "./MessagingNav";
import { Switch, Route } from "react-router-dom";
import NewMessage from "./NewChat";
import Messages from "./Messages";

export default function Messaging() {
    useEffect(() => {
        document.title = "Messaging";
    }, []);
    return (
        <HorizontalWrapper style={{ padding: 0 }}>
            <MessagingNav />
            <Switch>
                <Route path="/messaging/new" component={NewMessage} />
                <Route path="/messaging/:id" component={Messages} />
            </Switch>
        </HorizontalWrapper>
    );
}
