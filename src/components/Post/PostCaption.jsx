import React from "react";
import styled from "styled-components";

const PostCaptionWrapper = styled.div`
    font-size: 0.8em;
    max-width: 50%;
`;

export default function PostCaption({ post }) {
    return <PostCaptionWrapper>{post.caption}</PostCaptionWrapper>;
}

// function PostDate({ post }) {
//     const date = post.createdAt.toDate();

//     function convertDate() {
//         const months = [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//         ];
//         const day = date.getDate();
//         const month = months[date.getMonth()];
//         const year = date.getFullYear();
//         return `${day} ${month} ${year}`;
//     }

//     return (
//         <div style={{ textAlign: "end" }}>
//             <div>{convertDate()}</div>
//         </div>
//     );
// }
