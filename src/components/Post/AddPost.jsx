import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";

export default function AddPost() {
  const [filename, setFilename] = useState("");
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");

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

  return (
    <section id="AddPost" className="content">
      <div id="APdiv">
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
    </section>
  );
}
