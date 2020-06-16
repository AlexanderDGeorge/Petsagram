import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateUserDoc, uploadPhotoURL } from "../../../firebase";
import { UserContext } from "../../Application";
import { UserPhoto } from "../UserExports";
import {
    InputBox,
    ColorButton,
    FullNavContent,
    EditArea,
} from "../../StyledComponents";

export default function Profile() {
    const { currentUser } = useContext(UserContext);
    const [photoURL, setPhotoURL] = useState(currentUser.photoURL);
    const [name, setName] = useState(currentUser.fullname);
    const [username, setUsername] = useState(currentUser.username);
    const [bio, setBio] = useState(currentUser.bio);
    const history = useHistory();

    async function handleSave() {
        await updateUserDoc(currentUser.uid, photoURL, name, username, bio);
        history.push(`/user/${currentUser.username}`);
    }

    async function handleUpload(e) {
        if (e.target.files.length) {
            setPhotoURL(await uploadPhotoURL(e.target.files[0], currentUser));
        }
    }

    return (
        <FullNavContent>
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
                <div></div>
                <ColorButton onClick={handleSave}>Save Changes</ColorButton>
            </EditArea>
        </FullNavContent>
    );
}
