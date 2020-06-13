import React, { useContext, useState } from "react";
import { UserPhoto } from "../UserExports";
import { UserContext } from "../../Application";
import Modal from "../../Modal";
import {
    UserSettingsWrapper,
    EditArea,
    ColorButton,
    PlainButton,
    CenteredWrapper,
    InputBox,
    HorizontalListItem,
} from "../../StyledComponents";
import { auth, deleteUser } from "../../../firebase";
import { useHistory } from "react-router-dom";

export default function Account() {
    const { currentUser } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(currentUser.email);
    const history = useHistory();

    function handleDelete() {
        deleteUser();
        history.push("/");
    }

    return (
        <UserSettingsWrapper>
            <EditArea>
                <UserPhoto photo={currentUser.photoURL} size={"40px"} />
                <span>{currentUser.username}</span>
            </EditArea>
            <EditArea>
                <div>Email</div>
                <InputBox
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </EditArea>
            <EditArea>
                <div>Verify Email</div>
                <PlainButton
                    onClick={() => auth.currentUser.sendEmailVerification()}
                >
                    Send Email
                </PlainButton>
            </EditArea>
            <EditArea>
                <div>Delete Account</div>
                <ColorButton onClick={() => setOpen(true)}>Delete</ColorButton>
            </EditArea>
            {open ? (
                <Modal
                    setOpen={setOpen}
                    content={
                        <ConfirmDelete handleDelete={() => handleDelete()} />
                    }
                />
            ) : null}
        </UserSettingsWrapper>
    );
}

function ConfirmDelete({ handleDelete }) {
    return (
        <CenteredWrapper>
            <HorizontalListItem>
                Are you sure you want to delete your account?
            </HorizontalListItem>
            <ColorButton onClick={handleDelete}>Delete</ColorButton>
        </CenteredWrapper>
    );
}
