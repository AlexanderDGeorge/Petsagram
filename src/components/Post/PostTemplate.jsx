import React from "react";

export default function PostTemplate({ image, caption, comments }) {
  return (
    <section id="PostTemplate" className="content">
      <div id="PostImage">{image}</div>
      <div id="PostCaption">{caption}</div>
      <div id="PostComments">{comments}</div>
    </section>
  );
}
