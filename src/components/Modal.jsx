import React, { useEffect, useRef } from "react";

export default function Modal({ open, setOpen, content }) {
  return (
    <div className="Modal">
      <ModalContent content={content} setOpen={setOpen} />
    </div>
  );
}

function ModalContent({ content, setOpen }) {
  const contentRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClick);
    function handleClick(e) {
      if (!contentRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [contentRef, setOpen]);

  return (
    <div ref={contentRef} className="ModalContent">
      {content}
    </div>
  );
}
