import React, { useState, useContext, useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { uploadImage } from "../../firebase";
import { UserContext } from "../Application";
import { VerticalWrapper, InputLite, ColorButton } from "../StyledComponents";
import Loader from "../Loader";

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
                <div
                    id="APimage"
                    style={
                        filename ? { backgroundImage: `url(${preview})` } : {}
                    }
                >
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
                </div>
                {preview ? (
                    <div id="APcaption">
                        <InputLite
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                        />
                        <ColorButton onClick={handlePost}>Post!</ColorButton>
                    </div>
                ) : null}
            </VerticalWrapper>
        );
    } else {
        return <Loader />;
    }
}
