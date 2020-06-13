import React, { useState } from "react";
import Modal from "../Modal";

export default function PostLikes({ likes }) {
    const [open, setOpen] = useState(false);

    function Likes({ likes }) {
        return <div></div>;
    }

    return (
        <div className="PostLikes" onClick={() => setOpen(true)}>
            <p style={{ fontWeight: 700 }}>{`${likes.length} likes`}</p>
            {open ? (
                <Modal setOpen={setOpen} content={<Likes likes={likes} />} />
            ) : null}
        </div>
    );
}
