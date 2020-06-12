import React, { useContext, useState } from "react";
import { UserPhoto } from "../UserExports";
import { UserContext } from "../../Application";
import { updateUserPassword, sendResetPassword } from "../../../firebase";
import {
    UserSettingsWrapper,
    EditArea,
    InputBox,
    ColorButton,
    PlainButton,
} from "../../StyledComponents";

export default function ChangePassword() {
    const { currentUser } = useContext(UserContext);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function canSave() {
        return (
            newPassword.length >= 6 &&
            confirmPassword.length >= 6 &&
            newPassword === confirmPassword
        );
    }

    async function handleSave() {
        const saved = await updateUserPassword(newPassword);
        console.log("password updated", saved);
    }

    return (
        <UserSettingsWrapper>
            <EditArea>
                <UserPhoto photo={currentUser.photoURL} size={"40px"} />
                <span>{currentUser.username}</span>
            </EditArea>
            <EditArea>
                <div>New Password</div>
                <InputBox
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </EditArea>
            <EditArea>
                <div>Confirm Password</div>
                <InputBox
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </EditArea>
            <EditArea>
                <div>Forgot Password?</div>
                <PlainButton
                    onClick={() => sendResetPassword(currentUser.email)}
                >
                    Send Reset Email
                </PlainButton>
            </EditArea>
            {canSave() ? (
                <ColorButton onClick={handleSave}>Save Changes</ColorButton>
            ) : null}
        </UserSettingsWrapper>
    );
}
