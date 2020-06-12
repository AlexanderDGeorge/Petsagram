import React, { useContext } from "react";
import { UserPhoto } from "../UserExports";
import { UserContext } from "../../Application";
import { UserSettingsWrapper, EditArea } from "../../StyledComponents";

export default function Notifications() {
    const { currentUser } = useContext(UserContext);

    return (
        <UserSettingsWrapper>
            <EditArea>
                <UserPhoto photo={currentUser.photoURL} size={"40px"} />
                <span>{currentUser.username}</span>
            </EditArea>
        </UserSettingsWrapper>
    );
}
