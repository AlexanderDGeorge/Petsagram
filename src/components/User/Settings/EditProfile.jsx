import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { updateUserDoc } from "../../../firebase";
import { UserContext } from "../../Application";
import { UserPhoto } from "../UserExports";
import { InputBox, ColorButton } from "../../StyledComponents";

const EditProfileWrapper = styled.section`
    height: 100%;
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2%;
    position: relative;
`;

const EditArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
    width: 100%;
    margin-bottom: 2%;

    > div:first-child {
        margin-right: 2%;
        text-align: end;
    }

    > input {
        width: 70%;
    }

    > span {
        width: 70%;
        > label {
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

export default function EditProfile() {
    const { currentUser } = useContext(UserContext);
    const [photoURL] = useState(currentUser.photoURL);
    const [name, setName] = useState(currentUser.name);
    const [username, setUsername] = useState(currentUser.username);
    const [bio, setBio] = useState(currentUser.bio);
    const history = useHistory();

    async function handleSave() {
        await updateUserDoc(currentUser.uid, photoURL, name, username, bio);
        history.push(`/user/${currentUser.username}`);
    }

    async function handleUpload(e) {}

    return (
        <EditProfileWrapper>
            <EditArea>
                <UserPhoto photo={currentUser.photoURL} size={"40px"} />
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
            <ColorButton onClick={handleSave}>Save Changes</ColorButton>
        </EditProfileWrapper>
    );
}
