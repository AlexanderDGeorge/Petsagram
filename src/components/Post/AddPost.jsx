import React, { useState, useContext } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { uploadImage } from "../../firebase";
import { UserContext } from "../Application";

export default function AddPost() {
  const [filename, setFilename] = useState("");
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);

  window.image = image;

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
    await uploadImage(image, user, caption, setUser);
    history.push("/");
  }

  function height() {
    return window.innerWidth < 500 ? window.innerWidth : 500;
  }

  return (
    <section id="AddPost" className="content">
      <div id="APimage" style={{ height: height() }}>
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
        {filename ? <img src={preview} alt="" id="APpreview" /> : null}
      </div>
      <div id="APcaption">
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
        />
        {filename ? <button onClick={handlePost}>Post!</button> : null}
      </div>
    </section>
  );
}
