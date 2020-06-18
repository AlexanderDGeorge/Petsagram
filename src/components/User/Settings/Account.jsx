import React, { useContext, useState } from "react";
import { UserPhoto } from "../UserExports";
import { UserContext } from "../../Application";
import Modal from "../../Modal";
import {
    FullNavContent,
    EditArea,
    ColorButton,
    PlainButton,
    CenteredWrapper,
    InputBox,
    HorizontalListItem,
} from "../../StyledComponents";
import { auth, firestore } from "../../../firebase";
import { useHistory } from "react-router-dom";
import ReAuth from "../../Auth/ReAuth";
import Notification from "../../Notification";

export default function Account() {
    const { currentUser } = useContext(UserContext);
    const [notify, setNotify] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [email, setEmail] = useState(auth.currentUser.email);
    const history = useHistory();

    function handleDelete() {
        try {
            firestore.collection("users").doc(currentUser.uid).delete();
            auth.currentUser.delete();
            history.push("/");
        } catch (error) {
            setContent(<ReAuth setOpen={setOpen} />);
            setOpen(true);
            console.error(error.message);
        }
    }

    async function handleEmail() {
        try {
            await auth.currentUser.updateEmail(email);
            setMessage("Email updated!");
            setNotify(true);
        } catch (error) {
            setContent(<ReAuth setOpen={setOpen} />);
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
                <div>Email</div>
                <InputBox
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </EditArea>
            <EditArea>
                <div></div>
                <ColorButton onClick={handleEmail}>Save Changes</ColorButton>
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
                <PlainButton
                    onClick={() => {
                        setContent(
                            <ConfirmDelete
                                handleDelete={() => handleDelete()}
                            />
                        );
                        setOpen(true);
                    }}
                >
                    Delete
                </PlainButton>
            </EditArea>
            {open ? <Modal setOpen={setOpen} content={content} /> : null}
            {notify ? (
                <Notification setNotify={setNotify} message={message} />
            ) : null}
        </FullNavContent>
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
