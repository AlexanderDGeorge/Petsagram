import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateUserDoc, uploadPhotoURL } from "../../../firebase";
import { UserContext } from "../../Application";
import { UserPhoto } from "../UserExports";
import {
    InputBox,
    ColorButton,
    UserSettingsWrapper,
    EditArea,
} from "../../StyledComponents";

export default function EditProfile() {
    const { currentUser } = useContext(UserContext);
    const [photoURL, setPhotoURL] = useState(currentUser.photoURL);
    const [name, setName] = useState(currentUser.name);
    const [username, setUsername] = useState(currentUser.username);
    const [bio, setBio] = useState(currentUser.bio);
    const [email, setEmail] = useState(currentUser.email);
    const history = useHistory();

    async function handleSave() {
        await updateUserDoc(
            currentUser.uid,
            photoURL,
            name,
            username,
            bio,
            email
        );
        history.push(`/user/${currentUser.username}`);
    }

    async function handleUpload(e) {
        if (e.target.files.length) {
            setPhotoURL(await uploadPhotoURL(e.target.files[0], currentUser));
        }
    }

    return (
        <UserSettingsWrapper>
            <EditArea>
                <UserPhoto photo={photoURL} size={"40px"} />
                <span>
                    <label htmlFor="file-upload">Change Profile Picture</label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleUpload}
                    />
                </span>
            </EditArea>
            <EditArea>
                <div>Name</div>
                <InputBox
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </EditArea>
            <EditArea>
                <div>Username</div>
                <InputBox
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </EditArea>
            <EditArea>
                <div>Bio</div>
                <InputBox
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </EditArea>
            <EditArea>
                <div>Email</div>
                <InputBox
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </EditArea>
            <ColorButton onClick={handleSave}>Save Changes</ColorButton>
        </UserSettingsWrapper>
    );
}
