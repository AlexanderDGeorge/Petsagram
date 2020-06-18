import React, { useContext, useState } from "react";
import { UserPhoto } from "../UserExports";
import { UserContext } from "../../Application";
import { auth } from "../../../firebase";
import {
    FullNavContent,
    EditArea,
    InputBox,
    ColorButton,
} from "../../StyledComponents";
import Notification from "../../Notification";
import Modal from "../../Modal";
import ReAuth from "../../Auth/ReAuth";

export default function Password() {
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState(false);
    const [message, setMessage] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { currentUser } = useContext(UserContext);

    function canSave() {
        return (
            newPassword.length >= 6 &&
            confirmPassword.length >= 6 &&
            newPassword === confirmPassword
        );
    }

    async function handleSave() {
        try {
            await auth.currentUser.updatePassword(newPassword);
            setMessage("Password successfully updated");
            setNotify(true);
        } catch (error) {
            setOpen(true);
            console.error(error.message);
        }
    }

    return (
        <FullNavContent>
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
            {canSave() ? (
                <EditArea>
                    <div></div>
                    <ColorButton onClick={handleSave}>Save Changes</ColorButton>
                </EditArea>
            ) : null}
            {notify ? (
                <Notification setNotify={setNotify} message={message} />
            ) : null}
            {open ? (
                <Modal
                    setOpen={setOpen}
                    content={<ReAuth setOpen={setOpen} />}
                />
            ) : null}
        </FullNavContent>
    );
}
