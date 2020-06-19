import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MdAddAPhoto } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { uploadImage } from "../../firebase";
import { UserContext } from "../Application";
import { VerticalWrapper, InputLite, ColorButton } from "../StyledComponents";
import Loader from "../Loader";

const AddPostImage = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border: 1px solid ${(props) => props.theme.accent};
    background-position: 50%;
    background-size: cover;
    > label {
        position: absolute;
        padding: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1;
        &:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }
        > svg {
            position: absolute;
            height: 50px;
            width: auto;
        }
    }
`;

const AddPostCaption = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    background-color: ${(props) => props.theme.dark};
    > input {
        width: 75%;
        height: 100%;
        padding: 5px;
        font-size: 15px;
        color: ${(props) => props.theme.white};
    }
    > button {
        width: 25%;
        height: 100%;
        color: white;
    }
`;

export default function AddPost() {
    const [loading, setLoading] = useState(false);
    const [filename, setFilename] = useState("");
    const [image, setImage] = useState({});
    const [preview, setPreview] = useState("");
    const [caption, setCaption] = useState("");
    const history = useHistory();
    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        document.title = "New Post";
    }, []);

    function handleChange(e) {
        window.target = e.target;
        e.preventDefault();
        if (e.target.files.length) {
            setImage(e.target.files[0]);
            setPreview(window.URL.createObjectURL(e.target.files[0]));
            setFilename(e.target.value);
        }
    }

    async function handlePost(e) {
        e.preventDefault();
        setLoading(true);
        await uploadImage(image, currentUser, caption, setCurrentUser);
        history.push("/");
    }

    if (!loading) {
        return (
            <VerticalWrapper>
                <AddPostImage style={{ backgroundImage: `url(${preview})` }}>
                    <label htmlFor="file-upload">
                        <MdAddAPhoto />
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        value={filename}
                        onChange={handleChange}
                        style={{ display: "none" }}
                    />
                </AddPostImage>
                {preview ? (
                    <AddPostCaption>
                        <InputLite
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                        />
                        <ColorButton onClick={handlePost}>Post!</ColorButton>
                    </AddPostCaption>
                ) : null}
            </VerticalWrapper>
        );
    } else {
        return <Loader />;
    }
}
