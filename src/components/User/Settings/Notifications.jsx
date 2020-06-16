import React, { useContext } from "react";
import { UserPhoto } from "../UserExports";
import { UserContext } from "../../Application";
import { FullNavContent, EditArea } from "../../StyledComponents";

export default function Notifications() {
    const { currentUser } = useContext(UserContext);

    return (
        <FullNavContent>
            <EditArea>
                <UserPhoto photo={currentUser.photoURL} size={"40px"} />
                <span>{currentUser.username}</span>
            </EditArea>
        </FullNavContent>
    );
}
